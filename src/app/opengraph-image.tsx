import { ImageResponse } from "next/og";

/* Imagem de compartilhamento, gerada no build.
   Usa os tokens de cor da marca. A tipografia aqui NAO e Bodoni: o
   renderizador do next/og precisa do arquivo da fonte embarcado, e nao
   vale carregar um woff so para isso agora. Quando houver identidade
   fechada, trocar por um PNG estatico exportado do design. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "ResinArt, mentoria em resina composta com Uilian Machado";

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
          background: "#F8F9F9",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#666E6E",
            }}
          >
            Uilian Machado / Dentista e professor / RS
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 82,
            lineHeight: 1.05,
            color: "#101314",
            maxWidth: 900,
          }}
        >
          Resina composta para os casos que você encaminha.
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 120, height: 6, background: "#C9741B" }} />
          <div style={{ fontSize: 30, color: "#101314" }}>ResinArt</div>
        </div>
      </div>
    ),
    size,
  );
}
