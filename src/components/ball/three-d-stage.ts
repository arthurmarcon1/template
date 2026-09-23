/* <three-d-stage> — visualizador 3D (three.js) como web component.

   Origem: three-d-stage.js do pacote da bola, convertido para modulo.
   Mudancas em relacao ao original:
   - three vem do npm (three@0.184.0), nao do import map do unpkg;
   - removida a telemetria de exportacao (postMessage para a ferramenta
     onde o arquivo foi gerado, sem uso no site).
   O resto e o mesmo: renderer, luzes, chao de sombra, OrbitControls,
   enquadramento automatico e toolbar de exportacao OBJ + MTL / GLB.

   Este modulo importa three estaticamente. Quem usa deve carrega-lo por
   import() dinamico, para o three.js ficar num chunk separado e fora do
   bundle inicial.

   Atributos:
     name       — nome base dos arquivos exportados (padrao "model")
     background — cor CSS atras da cena
     autorotate — giro lento ate o usuario interagir
     hero       — modo elemento de pagina (ver "Modo hero" abaixo)

   Modo hero (<three-d-stage hero autorotate>):
     - sem toolbar nem nota, fundo transparente, altura vinda do CSS do
       container (nao 100vh);
     - OrbitControls sem zoom, pan nem rotacao, e canvas com
       pointer-events: none: a bola nunca captura scroll nem toque;
     - sem chao de sombra e sem shadow map;
     - autorotate lento girando a propria bola (a luz fica parada em
       relacao a camera) e leve inclinacao seguindo o mouse, com damping;
     - enquadramento: a bola ocupa ~85% do menor lado do canvas;
     - luz pensada para fundo #10313E, com rim light verde-agua por tras;
     - para de renderizar fora da tela;
     - snapshot() devolve um PNG transparente do quadro inicial.
   Sem o atributo, o comportamento e o do visualizador original.

   Uso:
     const { defineThreeDStage } = await import("./three-d-stage");
     defineThreeDStage();
     await stage.ready;
     stage.setObject(objeto);

   three e importado por nome (nao `* as THREE`) para o bundler descartar
   o que a bola nao usa. Pelo mesmo motivo `ready` nao devolve mais o
   namespace do three, como o original fazia: quem monta o objeto
   importa o que precisa. */

import {
  Box3,
  DirectionalLight,
  Group,
  HemisphereLight,
  Material,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  Scene,
  ShadowMaterial,
  Sphere,
  Timer,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const stylesheet = `
  :host {
    position: relative;
    display: block;
    width: 100%;
    height: 100vh;
    background: var(--stage-bg, #f0eee6);
    overflow: hidden;
  }
  canvas { display: block; outline: none; }
  :host([hero]) {
    height: 100%;
    background: transparent;
  }
  :host([hero]) canvas { pointer-events: none; }
  :host([hero]) .toolbar,
  :host([hero]) .note { display: none; }
  .toolbar {
    position: absolute;
    right: 16px;
    bottom: 16px;
    display: flex;
    gap: 8px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  .toolbar button {
    appearance: none;
    border: 1px solid rgba(20, 20, 19, 0.18);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.92);
    color: #1a1915;
    font-family: inherit;
    font-size: 12.5px;
    font-weight: 500;
    line-height: 1;
    padding: 9px 12px;
    cursor: default;
  }
  .toolbar button:hover { background: #fff; }
  .toolbar button:active { transform: translateY(1px); }
  .toolbar button[disabled] { opacity: 0.5; pointer-events: none; }
  .note {
    position: absolute;
    left: 16px;
    bottom: 16px;
    max-width: 60%;
    font: 400 12px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: rgba(26, 25, 21, 0.55);
    user-select: none;
  }
  .err {
    position: absolute;
    inset: 0;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 24px;
    font: 500 14px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #8a2f20;
    text-align: center;
    white-space: pre-line;
  }
`;

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}


/* Parametros do modo hero. */
const HERO = {
  ocupacao: 0.85, // fracao do menor lado do canvas ocupada pela bola
  giro: (Math.PI * 2) / 50, // rad/s: uma volta a cada 50s
  inclinacao: MathUtils.degToRad(7), // maximo seguindo o mouse
  amortecimento: 4, // maior = segue o mouse mais rapido
  pixelRatioMax: 1.5,
};

export class ThreeDStage extends HTMLElement {
  /** Resolve quando a cena esta viva. Monte o modelo depois de
   *  `await stage.ready` para nada correr contra o boot. */
  ready: Promise<void>;

  private _readyResolve!: () => void;
  private _readyReject!: (e: unknown) => void;
  private _err: HTMLDivElement;
  private _toolbar: HTMLDivElement;
  private _objBtn: HTMLButtonElement;
  private _glbBtn: HTMLButtonElement;
  private _booted = false;
  private _renderer?: WebGLRenderer;
  private _scene?: Scene;
  private _camera?: PerspectiveCamera;
  private _controls?: OrbitControls;
  private _key?: DirectionalLight;
  private _ground?: Mesh;
  private _ro?: ResizeObserver;
  private _loop?: () => void;
  private _object?: Object3D;
  private _hero = false;
  private _heroTilt?: Group; // inclinacao pelo mouse
  private _heroSpin?: Group; // autorotate
  private _heroRadius = 0;
  private _heroCenter = new Vector3();
  private _mouse = new Vector2();
  private _tiltNow = new Vector2();
  private _spinOn = false;
  private _visible = true;
  private _io?: IntersectionObserver;
  private _timer = new Timer();
  private _onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    this._mouse.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      (e.clientY / window.innerHeight) * 2 - 1,
    );
  };

  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = stylesheet;
    root.appendChild(style);
    this._err = document.createElement("div");
    this._err.className = "err";
    root.appendChild(this._err);
    const note = document.createElement("div");
    note.className = "note";
    note.textContent = "Drag to orbit · scroll to zoom · right-drag to pan";
    root.appendChild(note);
    this._toolbar = document.createElement("div");
    this._toolbar.className = "toolbar";
    this._objBtn = document.createElement("button");
    this._objBtn.type = "button";
    this._objBtn.textContent = "Download OBJ + MTL";
    this._objBtn.addEventListener("click", () => this._runExport("obj"));
    this._glbBtn = document.createElement("button");
    this._glbBtn.type = "button";
    this._glbBtn.textContent = "Download GLB";
    this._glbBtn.addEventListener("click", () => this._runExport("glb"));
    this._toolbar.appendChild(this._objBtn);
    this._toolbar.appendChild(this._glbBtn);
    root.appendChild(this._toolbar);
    this._setButtonsEnabled(false);
    this.ready = new Promise((resolve, reject) => {
      this._readyResolve = resolve;
      this._readyReject = reject;
    });
  }

  connectedCallback() {
    if (this._booted) {
      // Reanexado depois de remocao: retoma o que o disconnected parou.
      if (this._renderer && this._loop) {
        this._renderer.setAnimationLoop(this._loop);
        this._ro?.observe(this);
        this._io?.observe(this);
        if (this._hero) {
          window.addEventListener("pointermove", this._onPointer, {
            passive: true,
          });
        }
      }
      return;
    }
    this._booted = true;
    try {
      this._boot();
    } catch (err) {
      this._err.style.display = "flex";
      this._err.textContent =
        "three.js failed to start.\n\n" +
        String(err instanceof Error ? err.message : err);
      this._readyReject(err);
    }
  }

  private _boot() {
    const bg = this.getAttribute("background");
    if (bg) this.style.setProperty("--stage-bg", bg);
    this._hero = this.hasAttribute("hero");
    const hero = this._hero;
    // preserveDrawingBuffer mantem o ultimo quadro legivel depois da
    // composicao (toDataURL / drawImage): e o que permite capturar a cena.
    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, hero ? HERO.pixelRatioMax : 2),
    );
    // PCFSoftShadowMap foi descontinuado no three 0.184 (cai em PCF de
    // qualquer jeito); declarar PCF evita o aviso no console.
    renderer.shadowMap.enabled = !hero;
    renderer.shadowMap.type = PCFShadowMap;
    this._renderer = renderer;
    this.shadowRoot!.insertBefore(renderer.domElement, this._err);

    const scene = new Scene();
    this._scene = scene;

    const camera = new PerspectiveCamera(45, 1, 0.01, 500);
    camera.position.set(3, 2.2, 4);
    this._camera = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    this._controls = controls;

    const key = new DirectionalLight(0xffffff, 2.2);
    this._key = key;
    const ground = new Mesh(
      new PlaneGeometry(200, 200),
      new ShadowMaterial({ opacity: 0.18 }),
    );
    this._ground = ground;

    if (hero) {
      // Hero: nada de interacao com a cena. O canvas ainda tem
      // pointer-events: none no CSS, entao scroll e toque passam direto.
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = false;
      controls.autoRotate = false;
      this._spinOn = this.hasAttribute("autorotate");

      // Luz para fundo escuro #10313E. A bola e amarela e o fundo e
      // escuro: o ceu da hemisferica e neutro-quente e o chao puxa para o
      // petroleo, o que deixa a parte de baixo da bola no tom do fundo sem
      // apagar. A principal vem de cima e da frente, a de preenchimento
      // abre a sombra, e o rim light verde-agua por tras desenha a
      // silhueta contra o fundo.
      scene.add(new HemisphereLight(0xfff8ea, 0x1d4a55, 1.1));
      key.intensity = 2.4;
      scene.add(key);
      const fill = new DirectionalLight(0xf4f7ff, 0.8);
      this._heroFill = fill;
      scene.add(fill);
      const rim = new DirectionalLight(0x729e91, 5);
      this._heroRim = rim;
      scene.add(rim);
    } else {
      // Estudio neutro: ceu/chao suave, luz principal com sombra e um
      // preenchimento fraco por tras para a silhueta nunca ficar preta.
      scene.add(new HemisphereLight(0xffffff, 0xd8d2c4, 1.0));
      key.position.set(4, 7, 5);
      key.castShadow = true;
      key.shadow.mapSize.set(2048, 2048);
      key.shadow.bias = -0.0002;
      scene.add(key);
      const fill = new DirectionalLight(0xfff4e6, 0.5);
      fill.position.set(-5, 3, -4);
      scene.add(fill);

      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

      controls.autoRotate = this.hasAttribute("autorotate");
      controls.autoRotateSpeed = 1.2;
      controls.addEventListener("start", () => {
        controls.autoRotate = false;
      });
    }

    const fit = () => {
      const w = this.clientWidth || 1;
      const h = this.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (hero) this._frameHero();
    };
    fit();
    this._ro = new ResizeObserver(fit);
    this._loop = () => {
      if (hero) {
        if (!this._visible) return;
        this._timer.update();
        this._tickHero(Math.min(this._timer.getDelta(), 0.1));
      } else {
        controls.update();
      }
      renderer.render(scene, camera);
    };
    if (hero) {
      // Fora da tela nao ha o que desenhar: o loop vira no-op.
      this._io = new IntersectionObserver(([e]) => {
        this._visible = e.isIntersecting;
        this._timer.update(); // descarta o tempo parado
      });
    }
    if (this.isConnected) {
      this._ro.observe(this);
      this._io?.observe(this);
      if (hero) {
        window.addEventListener("pointermove", this._onPointer, {
          passive: true,
        });
      }
      renderer.setAnimationLoop(this._loop);
    }

    this._readyResolve();
  }

  disconnectedCallback() {
    // Para de renderizar e observar enquanto destacado. O renderer e
    // mantido: mover o elemento no documento nao reconstroi a cena.
    this._renderer?.setAnimationLoop(null);
    this._ro?.disconnect();
    this._io?.disconnect();
    window.removeEventListener("pointermove", this._onPointer);
  }

  /** Mostra (e assume) o objeto. Substitui o anterior, liga sombras em
   *  toda malha, apoia no chao e enquadra a camera nos limites dele. */
  setObject(object: Object3D) {
    const scene = this._scene;
    const camera = this._camera;
    const controls = this._controls;
    const key = this._key;
    const ground = this._ground;
    if (!scene || !camera || !controls || !key || !ground) {
      throw new Error("three-d-stage: not ready — await stage.ready first");
    }
    if (this._hero) {
      this._setHeroObject(object);
      return;
    }
    if (this._object) scene.remove(this._object);
    this._object = object;
    object.traverse((o) => {
      if ((o as Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    const box = new Box3().setFromObject(object);
    if (!box.isEmpty()) {
      ground.position.y = box.min.y;
      const sphere = box.getBoundingSphere(new Sphere());
      const dist =
        (sphere.radius / Math.tan((camera.fov * Math.PI) / 360)) * 1.35;
      const dir = new Vector3(1, 0.55, 1.25).normalize();
      camera.position.copy(sphere.center).add(dir.multiplyScalar(dist));
      camera.near = Math.max(dist / 100, 0.01);
      camera.far = dist * 100;
      camera.updateProjectionMatrix();
      controls.target.copy(sphere.center);
      controls.update();
      const span = sphere.radius * 3;
      key.shadow.camera.left = -span;
      key.shadow.camera.right = span;
      key.shadow.camera.top = span;
      key.shadow.camera.bottom = -span;
      key.shadow.camera.updateProjectionMatrix();
    }
    scene.add(object);
    this._setButtonsEnabled(true);
  }

  private _heroFill?: DirectionalLight;
  private _heroRim?: DirectionalLight;

  /** Hero: pendura o objeto em dois grupos (inclinacao > giro), ambos
   *  centrados no centro real da bola, e enquadra. */
  private _setHeroObject(object: Object3D) {
    const scene = this._scene!;
    if (this._heroTilt) scene.remove(this._heroTilt);
    this._object = object;
    object.updateMatrixWorld(true);

    // Esfera envolvente exata: centro pela Box3 precisa e raio pela maior
    // distancia de um vertice a esse centro. A esfera da Box3 comum de um
    // objeto girado, ou a uniao das esferas das partes, sai bem maior que
    // a bola e o enquadramento fica pequeno.
    object.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
    });
    const box = new Box3().setFromObject(object, true);
    const sphere = new Sphere(box.getCenter(new Vector3()), 0);
    const v = new Vector3();
    object.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      const pos = mesh.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
        sphere.radius = Math.max(sphere.radius, v.distanceTo(sphere.center));
      }
    });
    this._heroCenter.copy(sphere.center);
    this._heroRadius = sphere.radius;

    const tilt = new Group();
    const spin = new Group();
    tilt.position.copy(sphere.center);
    object.position.sub(sphere.center);
    spin.add(object);
    tilt.add(spin);
    scene.add(tilt);
    this._heroTilt = tilt;
    this._heroSpin = spin;
    this._frameHero();
  }

  /** Camera na mesma direcao do visualizador (a bola foi orientada para
   *  ela, logo de frente), a uma distancia em que o diametro projetado
   *  ocupa HERO.ocupacao do menor lado do canvas. */
  private _frameHero() {
    const camera = this._camera;
    const r = this._heroRadius;
    if (!camera || !r) return;
    const tanV = Math.tan(MathUtils.degToRad(camera.fov / 2));
    // no retrato o lado limitante e a largura
    const tanMin = tanV * Math.min(1, camera.aspect);
    // raio projetado = r / sqrt(d^2 - r^2) / tan  =>  resolve para d
    const k = r / (HERO.ocupacao * tanMin);
    const dist = Math.sqrt(r * r + k * k);
    const dir = new Vector3(1, 0.55, 1.25).normalize();
    camera.position.copy(this._heroCenter).addScaledVector(dir, dist);
    camera.near = dist / 100;
    camera.far = dist * 10;
    camera.lookAt(this._heroCenter);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(); // right/up abaixo leem a matriz nova

    // luzes presas a camera: principal acima e a esquerda, preenchimento
    // embaixo a direita (onde a principal nao chega), rim por tras e a
    // direita, contornando a silhueta no lado mais escuro
    const right = new Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
    const up = new Vector3().setFromMatrixColumn(camera.matrixWorld, 1);
    const at = (x: number, y: number, z: number) =>
      this._heroCenter
        .clone()
        .addScaledVector(right, x * dist)
        .addScaledVector(up, y * dist)
        .addScaledVector(dir, z * dist);
    this._key?.position.copy(at(-0.6, 0.9, 1));
    this._heroFill?.position.copy(at(0.9, -0.5, 0.7));
    this._heroRim?.position.copy(at(0.9, -0.35, -0.8));
    this._key?.target.position.copy(this._heroCenter);
    this._heroFill?.target.position.copy(this._heroCenter);
    this._heroRim?.target.position.copy(this._heroCenter);
    this._key?.target.updateMatrixWorld();
    this._heroFill?.target.updateMatrixWorld();
    this._heroRim?.target.updateMatrixWorld();
  }

  private _tickHero(dt: number) {
    const camera = this._camera;
    const tilt = this._heroTilt;
    const spin = this._heroSpin;
    if (!camera || !tilt || !spin) return;
    if (this._spinOn) spin.rotation.y += HERO.giro * dt;

    // inclina poucos graus na direcao do mouse, com amortecimento
    // exponencial (independe da taxa de quadros)
    const a = 1 - Math.exp(-HERO.amortecimento * dt);
    this._tiltNow.lerp(this._mouse, a);
    const right = new Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
    const up = new Vector3().setFromMatrixColumn(camera.matrixWorld, 1);
    tilt.quaternion
      .setFromAxisAngle(up, this._tiltNow.x * HERO.inclinacao)
      .multiply(
        new Quaternion().setFromAxisAngle(
          right,
          this._tiltNow.y * HERO.inclinacao,
        ),
      );
  }

  /** PNG com fundo transparente do quadro inicial do hero (sem giro nem
   *  inclinacao), no tamanho pedido. Usado para gerar ball-static. */
  snapshot(size = 1200): string {
    const renderer = this._renderer;
    const camera = this._camera;
    const scene = this._scene;
    if (!renderer || !camera || !scene) throw new Error("three-d-stage: not ready");
    renderer.setAnimationLoop(null);
    const pr = renderer.getPixelRatio();
    renderer.setPixelRatio(1);
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    if (this._hero) {
      this._frameHero();
      this._heroSpin?.rotation.set(0, 0, 0);
      this._heroTilt?.quaternion.identity();
    }
    renderer.setClearColor(0x000000, 0);
    renderer.render(scene, camera);
    const url = renderer.domElement.toDataURL("image/png");
    renderer.setPixelRatio(pr);
    this._ro?.disconnect();
    this._ro?.observe(this); // o ResizeObserver reajusta ao tamanho real
    if (this._loop) renderer.setAnimationLoop(this._loop);
    return url;
  }

  private get _basename() {
    return (this.getAttribute("name") || "model").replace(/[^\w.-]+/g, "_");
  }

  private _setButtonsEnabled(on: boolean) {
    this._objBtn.disabled = !on;
    this._glbBtn.disabled = !on;
  }

  /** Toda malha e material precisa de nome unico para as linhas
   *  o/usemtl: preenche nomes estaveis e devolve a lista de materiais. */
  private _nameParts() {
    const mats: Material[] = [];
    const seen = new Set<string>();
    let meshI = 0;
    let matI = 0;
    this._object?.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      if (!mesh.name) mesh.name = "part_" + meshI;
      meshI += 1;
      const list = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      for (const m of list) {
        if (!m || mats.includes(m)) continue;
        if (!m.name) {
          m.name = "mat_" + matI;
          matI += 1;
        }
        while (seen.has(m.name)) {
          m.name = m.name + "_" + matI;
          matI += 1;
        }
        seen.add(m.name);
        mats.push(m);
      }
    });
    return mats;
  }

  private async _runExport(format: "obj" | "glb") {
    if (!this._object) return;
    await (format === "obj" ? this._exportObj() : this._exportGlb());
  }

  private async _exportObj() {
    if (!this._object) return;
    const { OBJExporter } = await import(
      "three/addons/exporters/OBJExporter.js"
    );
    const mats = this._nameParts();
    const base = this._basename;
    const obj =
      "mtllib " + base + ".mtl\n" + new OBJExporter().parse(this._object);
    let mtl = "# Exported by three-d-stage\n";
    for (const m of mats) {
      const std = m as MeshStandardMaterial;
      const c = std.color || { r: 0.8, g: 0.8, b: 0.8 };
      const rough = typeof std.roughness === "number" ? std.roughness : 0.5;
      const opacity = typeof m.opacity === "number" ? m.opacity : 1;
      mtl += "newmtl " + m.name + "\n";
      mtl +=
        "Kd " + c.r.toFixed(4) + " " + c.g.toFixed(4) + " " + c.b.toFixed(4) + "\n";
      mtl += "Ks 0.2000 0.2000 0.2000\n";
      mtl += "Ns " + Math.round((1 - rough) * 200) + "\n";
      mtl += "d " + opacity.toFixed(4) + "\n\n";
    }
    download(new Blob([obj], { type: "text/plain" }), base + ".obj");
    download(new Blob([mtl], { type: "text/plain" }), base + ".mtl");
  }

  private async _exportGlb() {
    if (!this._object) return;
    const { GLTFExporter } = await import(
      "three/addons/exporters/GLTFExporter.js"
    );
    this._nameParts();
    const base = this._basename;
    const buf = await new GLTFExporter().parseAsync(this._object, {
      binary: true,
    });
    download(
      new Blob([buf as ArrayBuffer], { type: "model/gltf-binary" }),
      base + ".glb",
    );
  }
}

/** Registra o elemento uma unica vez (HMR e remontagens chamam de novo). */
export function defineThreeDStage() {
  if (!customElements.get("three-d-stage")) {
    customElements.define("three-d-stage", ThreeDStage);
  }
}
