import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/* Imagem de compartilhamento, gerada no build. Provisoria: quando a
   identidade visual fechar, trocar pelas cores da marca ou por um PNG
   estatico exportado do design. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.nome}, torneios de padel e beach tennis`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#111111",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 4 }}>
          PADEL / BEACH TENNIS
        </div>
        <div style={{ display: "flex", fontSize: 82, lineHeight: 1.05 }}>
          {site.nome}
        </div>
      </div>
    ),
    size,
  );
}
