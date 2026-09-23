/* Gera public/favicon.ico a partir do icone de src/app/icon.tsx (para
   navegadores e robos que pedem /favicon.ico direto).
   Com o dev rodando: node scripts/favicon-ico.mjs [url-base]
   O ICO embute o PNG de 32x32 (formato aceito desde o Windows Vista). */

import { writeFile } from "node:fs/promises";

const base = process.argv[2] ?? "http://localhost:3000";
const png = Buffer.from(await (await fetch(`${base}/icon`)).arrayBuffer());

const cabecalho = Buffer.alloc(6);
cabecalho.writeUInt16LE(0, 0); // reservado
cabecalho.writeUInt16LE(1, 2); // tipo: icone
cabecalho.writeUInt16LE(1, 4); // uma imagem

const entrada = Buffer.alloc(16);
entrada.writeUInt8(32, 0); // largura
entrada.writeUInt8(32, 1); // altura
entrada.writeUInt8(0, 2); // paleta
entrada.writeUInt8(0, 3); // reservado
entrada.writeUInt16LE(1, 4); // planos
entrada.writeUInt16LE(32, 6); // bits por pixel
entrada.writeUInt32LE(png.length, 8);
entrada.writeUInt32LE(6 + 16, 12); // offset do PNG

await writeFile("public/favicon.ico", Buffer.concat([cabecalho, entrada, png]));
console.log(`ok: public/favicon.ico (${png.length + 22} bytes)`);
