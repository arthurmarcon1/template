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

   Uso:
     const { defineThreeDStage } = await import("./three-d-stage");
     defineThreeDStage();
     const { THREE } = await stage.ready;
     stage.setObject(objeto); */

import * as THREE from "three";
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

type StageReady = { THREE: typeof THREE };

export class ThreeDStage extends HTMLElement {
  /** Resolve com { THREE } quando a cena esta viva. Monte o modelo depois
   *  de `await stage.ready` para nada correr contra o boot. */
  ready: Promise<StageReady>;

  private _readyResolve!: (v: StageReady) => void;
  private _readyReject!: (e: unknown) => void;
  private _err: HTMLDivElement;
  private _toolbar: HTMLDivElement;
  private _objBtn: HTMLButtonElement;
  private _glbBtn: HTMLButtonElement;
  private _booted = false;
  private _renderer?: THREE.WebGLRenderer;
  private _scene?: THREE.Scene;
  private _camera?: THREE.PerspectiveCamera;
  private _controls?: OrbitControls;
  private _key?: THREE.DirectionalLight;
  private _ground?: THREE.Mesh;
  private _ro?: ResizeObserver;
  private _loop?: () => void;
  private _object?: THREE.Object3D;

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
    // preserveDrawingBuffer mantem o ultimo quadro legivel depois da
    // composicao (toDataURL / drawImage): e o que permite capturar a cena.
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._renderer = renderer;
    this.shadowRoot!.insertBefore(renderer.domElement, this._err);

    const scene = new THREE.Scene();
    this._scene = scene;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 500);
    camera.position.set(3, 2.2, 4);
    this._camera = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    this._controls = controls;

    // Estudio neutro: ceu/chao suave, luz principal com sombra e um
    // preenchimento fraco por tras para a silhueta nunca ficar preta.
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d2c4, 1.0));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 7, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.bias = -0.0002;
    this._key = key;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xfff4e6, 0.5);
    fill.position.set(-5, 3, -4);
    scene.add(fill);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.ShadowMaterial({ opacity: 0.18 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this._ground = ground;
    scene.add(ground);

    controls.autoRotate = this.hasAttribute("autorotate");
    controls.autoRotateSpeed = 1.2;
    controls.addEventListener("start", () => {
      controls.autoRotate = false;
    });

    const fit = () => {
      const w = this.clientWidth || 1;
      const h = this.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    fit();
    this._ro = new ResizeObserver(fit);
    this._loop = () => {
      controls.update();
      renderer.render(scene, camera);
    };
    if (this.isConnected) {
      this._ro.observe(this);
      renderer.setAnimationLoop(this._loop);
    }

    this._readyResolve({ THREE });
  }

  disconnectedCallback() {
    // Para de renderizar e observar enquanto destacado. O renderer e
    // mantido: mover o elemento no documento nao reconstroi a cena.
    this._renderer?.setAnimationLoop(null);
    this._ro?.disconnect();
  }

  /** Mostra (e assume) o objeto. Substitui o anterior, liga sombras em
   *  toda malha, apoia no chao e enquadra a camera nos limites dele. */
  setObject(object: THREE.Object3D) {
    const scene = this._scene;
    const camera = this._camera;
    const controls = this._controls;
    const key = this._key;
    const ground = this._ground;
    if (!scene || !camera || !controls || !key || !ground) {
      throw new Error("three-d-stage: not ready — await stage.ready first");
    }
    if (this._object) scene.remove(this._object);
    this._object = object;
    object.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    const box = new THREE.Box3().setFromObject(object);
    if (!box.isEmpty()) {
      ground.position.y = box.min.y;
      const sphere = box.getBoundingSphere(new THREE.Sphere());
      const dist =
        (sphere.radius / Math.tan((camera.fov * Math.PI) / 360)) * 1.35;
      const dir = new THREE.Vector3(1, 0.55, 1.25).normalize();
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
    const mats: THREE.Material[] = [];
    const seen = new Set<string>();
    let meshI = 0;
    let matI = 0;
    this._object?.traverse((o) => {
      const mesh = o as THREE.Mesh;
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
      const std = m as THREE.MeshStandardMaterial;
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
