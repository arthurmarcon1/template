"use client";

import { useEffect, useRef, useState } from "react";

/* Visualizador da bola. Substitui o ball.html do pacote original.
   /bola            orbit livre e toolbar de exportacao OBJ/GLB
   /bola?modo=hero  modo hero sobre #10313E, para ajustar luz e
                    enquadramento e gerar o ball-static (Tarefa 7)
   O three.js entra por import() dinamico, num chunk separado. */

export default function BallViewer() {
  const [pronto, setPronto] = useState(false);
  const [hero, setHero] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let vivo = true;
    const modoHero =
      new URLSearchParams(window.location.search).get("modo") === "hero";
    import("./three-d-stage").then(({ defineThreeDStage }) => {
      defineThreeDStage();
      if (vivo) {
        setHero(modoHero);
        setPronto(true);
      }
    });
    return () => {
      vivo = false;
    };
  }, []);

  useEffect(() => {
    if (!pronto || !ref.current) return;
    const stage = ref.current as import("./three-d-stage").ThreeDStage;
    import("./build-ball").then(async ({ mountBall }) => {
      await mountBall(stage);
      stage.dataset.pronto = "";
    });
  }, [pronto]);

  function exportar() {
    const stage = ref.current as import("./three-d-stage").ThreeDStage | null;
    if (!stage) return;
    const a = document.createElement("a");
    a.href = stage.snapshot(1200);
    a.download = "ball-static.png";
    a.click();
  }

  if (!pronto) return null;

  if (hero) {
    return (
      <div className="grid min-h-dvh place-items-center bg-petroleo-900">
        <div className="size-[min(90vw,90vh)]">
          <three-d-stage ref={ref} hero autorotate />
        </div>
        {/* Regenera a imagem estatica do hero. Depois de baixar, mover
            para public/bola/ e rodar: node scripts/ball-static.mjs */}
        <button
          type="button"
          className="btn btn-secondary fixed right-4 bottom-4 border-creme-50 text-creme-50"
          onClick={exportar}
        >
          Exportar ball-static.png
        </button>
      </div>
    );
  }

  return <three-d-stage ref={ref} name="bola-tenis-padel" autorotate />;
}
