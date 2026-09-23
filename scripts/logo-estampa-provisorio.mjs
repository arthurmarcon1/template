/* Gera public/bola/logo-estampa.provisorio.png a partir de logo.png.

   PROVISORIO: TODO trocar pela logo-estampa.png oficial (so o traco em
   #294B54, fundo transparente) quando o cliente enviar a versao
   vetorial. Rodar: node scripts/logo-estampa-provisorio.mjs

   Como funciona: amplia a logo para 1024x1024 e usa a luminancia como
   mascara. O traco azul-petroleo e escuro; o disco creme e os detalhes
   bege sao claros. Tudo acima de L_CLARO vira transparente, o traco vira opaco, e a borda anti-aliased entre os dois
   vira alpha parcial. A cor final e sempre #294B54 chapado. */

import sharp from "sharp";

const ORIGEM = "public/bola/logo.png";
const DESTINO = "public/bola/logo-estampa.provisorio.png";
const LADO = 1024;
const TINTA = [0x29, 0x4b, 0x54];

const lum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const L_TINTA = lum(TINTA); // ~68
// Limiar de "claro": abaixo do bege (~213) para descartar tambem as
// cordas da raquete e sombras suaves do desenho.
const L_CLARO = 165;
// A borda do disco tem um anel escuro de anti-aliasing: tudo fora deste
// raio (fracao do lado) e descartado. O desenho fica bem dentro dele.
const RAIO_UTIL = 0.45;

const { data, info } = await sharp(ORIGEM)
  .resize(LADO, LADO, { kernel: "lanczos3" })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const saida = Buffer.alloc(LADO * LADO * 4);
for (let i = 0; i < LADO * LADO; i++) {
  const o = i * info.channels;
  const x = (i % LADO) / LADO - 0.5;
  const y = Math.floor(i / LADO) / LADO - 0.5;
  if (Math.hypot(x, y) > RAIO_UTIL) continue; // Buffer.alloc ja e zero

  const L = lum([data[o], data[o + 1], data[o + 2]]);
  // 0 no claro, 1 no petroleo (ou mais escuro)
  let t = (L_CLARO - L) / (L_CLARO - L_TINTA);
  t = Math.min(1, Math.max(0, t));
  // smoothstep limpa o halo claro sem endurecer a borda
  t = t * t * (3 - 2 * t);
  saida[i * 4] = TINTA[0];
  saida[i * 4 + 1] = TINTA[1];
  saida[i * 4 + 2] = TINTA[2];
  saida[i * 4 + 3] = Math.round(t * data[o + 3]);
}

await sharp(saida, { raw: { width: LADO, height: LADO, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(DESTINO);

console.log(`ok: ${DESTINO}`);
