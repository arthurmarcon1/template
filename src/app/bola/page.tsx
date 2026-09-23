import type { Metadata } from "next";
import BallViewer from "@/components/ball/BallViewer";

/* Visualizador de trabalho da bola 3D (orbit livre e exportacao
   OBJ/GLB). Serve para ajustar a bola e gerar a imagem estatica.
   Nao faz parte da landing. */

export const metadata: Metadata = {
  title: "Bola 3D",
  robots: { index: false, follow: false },
};

export default function BolaPage() {
  return (
    <main id="conteudo">
      <BallViewer />
    </main>
  );
}
