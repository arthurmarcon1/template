import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero } from "@/lib/conteudo";

/* Imagem de compartilhamento 1200x630, gerada no build: fundo
   petroleo-900, a bola (ball-static) e a frase do hero em Barlow
   Condensed. Muda sozinha se a bola ou a frase mudarem. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "F&M Eventos Esportivos: Seu clube, grandes torneios. Zero estresse.";

const raiz = process.cwd();
const fonte = await readFile(
  join(raiz, "src/app/_fontes/BarlowCondensed-ExtraBold.ttf"),
);
const bola = await readFile(join(raiz, "public/bola/ball-static.png"));
const bolaSrc = `data:image/png;base64,${bola.toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#10313E",
          padding: "0 0 0 80px",
          fontFamily: "Barlow Condensed",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: "#729E91",
              textTransform: "uppercase",
            }}
          >
            F&M Eventos Esportivos
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 24,
              fontSize: 84,
              lineHeight: 0.95,
              color: "#F1EFE8",
              textTransform: "uppercase",
            }}
          >
            <span>{hero.titulo}</span>
            <span style={{ color: "#729E91" }}>{hero.destaque}</span>
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 24,
              letterSpacing: 5,
              color: "#9CA7A4",
              textTransform: "uppercase",
            }}
          >
            Padel & Beach Tennis
          </div>
        </div>
        <img src={bolaSrc} width={500} height={500} alt="" />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Barlow Condensed", data: fonte, weight: 800 }],
    },
  );
}
