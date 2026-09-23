/* Converte public/bola/ball-static.png (1200x1200, fundo transparente)
   nas versoes WebP usadas pelo hero enquanto o three.js nao carrega.

   Para regenerar depois de mudar a bola:
     1. npm run dev e abrir http://localhost:3000/bola?modo=hero
     2. clicar em "Exportar ball-static.png" (renderiza o quadro inicial
        do modo hero em 1200x1200, sem giro nem inclinacao)
     3. salvar o arquivo em public/bola/ball-static.png
     4. node scripts/ball-static.mjs */

import sharp from "sharp";

const ORIGEM = "public/bola/ball-static.png";
const saidas = [
  { arquivo: "public/bola/ball-static.webp", lado: 1200 },
  { arquivo: "public/bola/ball-static-600.webp", lado: 600 },
];

for (const { arquivo, lado } of saidas) {
  const info = await sharp(ORIGEM)
    .resize(lado, lado)
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(arquivo);
  console.log(`ok: ${arquivo} (${Math.round(info.size / 1024)} KB)`);
}
