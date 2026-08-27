"use client";

import { useEffect, useRef } from "react";

/* ENTRADA DOS PILARES

   Motivo: o metodo e uma sequencia. Entrar alternando o lado marca que
   cada pilar e uma etapa distinta, e nao mais um item de lista.

   Um unico IntersectionObserver observa todos os pilares e adiciona a
   classe que dispara a transicao em CSS. Sem biblioteca, sem listener
   de scroll, sem estado de React por item.

   O deslocamento inicial vive no CSS e ja esta na primeira pintura,
   entao a animacao nao mede nem move nada no layout: so transform. */

export default function PillarsMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = scope.current;
    if (!raiz) return;

    const itens = Array.from(
      raiz.querySelectorAll<HTMLElement>("[data-pilar]"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Arma o deslocamento so agora. Ate aqui os pilares estavam visiveis,
       que e o estado correto caso o JavaScript nunca rode. */
    raiz.classList.add("is-armed");

    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    itens.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return <div ref={scope}>{children}</div>;
}
