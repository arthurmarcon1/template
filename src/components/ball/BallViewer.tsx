"use client";

import { useEffect, useRef, useState } from "react";

/* Visualizador da bola com orbit livre e toolbar de exportacao.
   Substitui o ball.html do pacote original. O three.js entra por
   import() dinamico, entao fica num chunk separado. */

export default function BallViewer() {
  const [pronto, setPronto] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let vivo = true;
    import("./three-d-stage").then(({ defineThreeDStage }) => {
      defineThreeDStage();
      if (vivo) setPronto(true);
    });
    return () => {
      vivo = false;
    };
  }, []);

  useEffect(() => {
    if (!pronto || !ref.current) return;
    const stage = ref.current as import("./three-d-stage").ThreeDStage;
    import("./build-ball").then(({ mountBall }) => mountBall(stage));
  }, [pronto]);

  if (!pronto) return null;
  return <three-d-stage ref={ref} name="bola-tenis-padel" autorotate />;
}
