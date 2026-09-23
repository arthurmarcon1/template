import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* Icone provisorio: recorte simplificado so com "F&M" em Barlow
   Condensed, creme sobre petroleo-900. [CONFIRMAR: logo vetorial]
   Quando o SVG oficial chegar, trocar pelo desenho do monograma. */

const fonte = readFile(
  join(process.cwd(), "src/app/_fontes/BarlowCondensed-ExtraBold.ttf"),
);

export async function icone(lado: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#10313E",
          color: "#F1EFE8",
          fontFamily: "Barlow Condensed",
          fontSize: Math.round(lado * 0.62),
          letterSpacing: -lado * 0.01,
          paddingBottom: Math.round(lado * 0.04),
        }}
      >
        F&M
      </div>
    ),
    {
      width: lado,
      height: lado,
      fonts: [{ name: "Barlow Condensed", data: await fonte, weight: 800 }],
    },
  );
}
