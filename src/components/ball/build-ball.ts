/* Montagem da bola de tenis/padel com a logo da F&M.

   Origem: o <script type="module"> do ball.html do pacote da bola,
   convertido em funcao. Geometria, materiais e orientacao sao os mesmos.

   Como o stage, este modulo importa three estaticamente: so deve ser
   alcancado por import() dinamico. */

import * as THREE from "three";
import type { ThreeDStage } from "./three-d-stage";

const R = 0.0335; // raio real da bola (m)

/* TODO: trocar pela logo-estampa.png oficial (so o traco em #294B54,
   fundo transparente) quando o cliente enviar. Esta versao provisoria e
   gerada a partir de logo.png por scripts/logo-estampa-provisorio.mjs. */
const LOGO_URL = "/bola/logo-estampa.provisorio.png";

const FELT_ROUGHNESS = 0.98;

// curva de costura classica: latitude oscila duas vezes por volta de azimute
function seamPoints(radius: number, n: number) {
  const pts: THREE.Vector3[] = [];
  const A = 0.82; // amplitude da onda (rad)
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const lat = A * Math.sin(2 * t);
    const az = t - 0.22 * Math.sin(4 * t); // arredonda as curvas nos extremos
    const c = Math.cos(lat);
    pts.push(
      new THREE.Vector3(
        radius * c * Math.cos(az),
        radius * Math.sin(lat),
        radius * c * Math.sin(az),
      ),
    );
  }
  return pts;
}

// faixa rente a superficie: varre a curva lateralmente sobre a esfera,
// sem tubo saliente (nada de "elastico" cruzando a silhueta)
function seamRibbon(radius: number, halfWidth: number, segs: number, rows = 6) {
  const curve = new THREE.CatmullRomCurve3(
    seamPoints(1, 480),
    true,
    "centripetal",
  );
  const verts: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i <= segs; i++) {
    const u = (i % segs) / segs;
    const p = curve.getPoint(u).normalize();
    const t = curve.getTangent(u).normalize();
    const b = new THREE.Vector3().crossVectors(t, p).normalize();
    for (let j = 0; j <= rows; j++) {
      const w = -halfWidth + (2 * halfWidth * j) / rows;
      const v = p
        .clone()
        .addScaledVector(b, w)
        .normalize()
        .multiplyScalar(radius);
      verts.push(v.x, v.y, v.z);
    }
    if (i < segs) {
      const k = i * (rows + 1);
      const k2 = (i + 1) * (rows + 1);
      for (let j = 0; j < rows; j++) {
        idx.push(k + j, k + j + 1, k2 + j, k + j + 1, k2 + j + 1, k2 + j);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

export async function buildBall() {
  // feltro aveludado: o sheen acende as bordas de raspao como pelo de
  // tecido. Se o brilho na silhueta ficar forte, baixe sheen (0.6 a 0.8)
  // ou suba sheenRoughness (0.9 a 1); se o halo puxar para o branco,
  // aproxime sheenColor da cor base (ex. 0xe4ec7a).
  const felt = new THREE.MeshPhysicalMaterial({
    name: "felt",
    color: 0xd6e23f,
    roughness: FELT_ROUGHNESS,
    metalness: 0.0,
    sheen: 1,
    sheenRoughness: 0.8,
    sheenColor: 0xf2f7a0,
  });
  const seamCloth = new THREE.MeshStandardMaterial({
    name: "seam",
    color: 0xf6f4ee,
    roughness: 0.85,
    metalness: 0.0,
  });
  const seamGroove = new THREE.MeshStandardMaterial({
    name: "groove",
    color: 0x8f8a76,
    roughness: 1.0,
    metalness: 0.0,
  });

  const ball = new THREE.Group();
  ball.name = "tennis_ball";

  const core = new THREE.Mesh(new THREE.SphereGeometry(R, 128, 96), felt);
  core.name = "felt_body";
  ball.add(core);

  const seam = new THREE.Mesh(seamRibbon(R * 1.002, 0.075, 900), seamCloth);
  seam.name = "seam_band";
  seamCloth.side = THREE.DoubleSide;
  ball.add(seam);

  const groove = new THREE.Mesh(seamRibbon(R * 1.004, 0.0065, 900), seamGroove);
  groove.name = "seam_groove";
  seamGroove.side = THREE.DoubleSide;
  ball.add(groove);

  // logo como estampa: tinta impressa no feltro, nao adesivo. Mesma
  // rugosidade do feltro (nada de brilho de plastico), leve transparencia
  // para a textura do pano "aparecer" por baixo, e sem escrever no depth
  // buffer para nao recortar a costura nem piscar sobre o feltro.
  const logoTex = await new THREE.TextureLoader().loadAsync(LOGO_URL);
  logoTex.colorSpace = THREE.SRGBColorSpace;
  logoTex.anisotropy = 8;

  const logoMat = new THREE.MeshStandardMaterial({
    name: "logo",
    map: logoTex,
    transparent: true,
    alphaTest: 0.05,
    opacity: 0.9,
    roughness: FELT_ROUGHNESS,
    metalness: 0.0,
    depthWrite: false,
    side: THREE.FrontSide,
  });

  // raio rente: 1.005 fica logo acima do sulco da costura (1.004), sem
  // flutuar como o 1.014 original e sem piscar contra o feltro.
  const span = 1.3; // abertura angular do decalque (rad)
  const patch = new THREE.SphereGeometry(
    R * 1.005,
    72,
    72,
    -span / 2,
    span,
    Math.PI / 2 - span / 2,
    span,
  );
  const logo = new THREE.Mesh(patch, logoMat);
  logo.name = "logo_decal";
  logo.castShadow = false;
  ball.add(logo);

  ball.position.y = R;
  ball.updateMatrixWorld(true);

  // vira a bola: o centro do painel de feltro (o "polo" do desenho da
  // costura) fica de frente para a camera padrao, e um giro extra ajusta
  // as costuras
  const camDir = new THREE.Vector3(1, 0.55, 1.25).normalize();
  const faceCam = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    camDir,
  );
  ball.quaternion.copy(
    new THREE.Quaternion().setFromAxisAngle(camDir, -0.75).multiply(faceCam),
  );
  ball.updateMatrixWorld(true);

  // orienta o decalque: normal no polo local, "para cima" alinhado ao
  // topo da tela
  const localDir = new THREE.Vector3(0, 1, 0);
  const pos = patch.attributes.position;
  const baseNormal = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    baseNormal.add(new THREE.Vector3().fromBufferAttribute(pos, i));
  }
  baseNormal.normalize();
  const q1 = new THREE.Quaternion().setFromUnitVectors(baseNormal, localDir);
  const topRow = new THREE.Vector3()
    .fromBufferAttribute(pos, 32)
    .normalize()
    .applyQuaternion(q1);
  const curUp = topRow.projectOnPlane(localDir).normalize();
  const wantUp = new THREE.Vector3(0, 1, 0)
    .applyQuaternion(ball.quaternion.clone().invert())
    .projectOnPlane(localDir)
    .normalize();
  let ang = Math.acos(THREE.MathUtils.clamp(curUp.dot(wantUp), -1, 1));
  if (new THREE.Vector3().crossVectors(curUp, wantUp).dot(localDir) < 0) {
    ang = -ang;
  }
  logo.quaternion.copy(
    new THREE.Quaternion().setFromAxisAngle(localDir, ang).multiply(q1),
  );

  return ball;
}

/** Monta a bola e entrega ao stage, como o ball.html fazia. */
export async function mountBall(stage: ThreeDStage) {
  await stage.ready;
  const ball = await buildBall();
  stage.setObject(ball);
  // sem sombra projetada: a bola flutua limpa sobre o fundo da landing page
  ball.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) o.castShadow = false;
  });
  return ball;
}
