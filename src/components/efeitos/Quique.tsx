"use client";

import { useEffect } from "react";

/* Marca de quique: cada clique deixa um anel que abre e some, como a
   marca da bola na quadra. So com mouse (pointer fino) e sem
   prefers-reduced-motion. O anel e decorativo e nao recebe eventos. */

export default function Quique() {
  useEffect(() => {
    const fino = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onDown = (e: PointerEvent) => {
      if (!fino.matches || reduzir.matches || e.button !== 0) return;
      const anel = document.createElement("span");
      anel.className = "quique";
      anel.style.left = `${e.clientX}px`;
      anel.style.top = `${e.clientY}px`;
      anel.addEventListener("animationend", () => anel.remove());
      document.body.appendChild(anel);
    };

    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return null;
}
