"use client";

import { useEffect, useRef } from "react";

/* Numero que conta de 0 ate o valor quando entra na tela. O HTML ja sai
   com o valor final (sem JS, leitor de tela e buscadores leem o numero
   certo). So anima se o numero ainda estiver abaixo da dobra no
   carregamento; valores sem numero ("Santa Maria") ficam como estao. */

const FORMATO = /^(\D*)([\d.]+)(\D*)$/;

export default function Contador({ valor }: { valor: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const partes = valor.match(FORMATO);
    if (!el || !partes) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const [, antes, numero, depois] = partes;
    const alvo = Number(numero.replace(/\./g, ""));
    const escrever = (n: number) => {
      el.textContent = `${antes}${n.toLocaleString("pt-BR")}${depois}`;
    };
    escrever(0);

    let frame = 0;
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        io.disconnect();
        const inicio = performance.now();
        const duracao = 1400;
        const passo = (agora: number) => {
          const t = Math.min(1, (agora - inicio) / duracao);
          escrever(Math.round(alvo * (1 - (1 - t) ** 3)));
          if (t < 1) frame = requestAnimationFrame(passo);
        };
        frame = requestAnimationFrame(passo);
      },
      { threshold: 0.6 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      escrever(alvo);
    };
  }, [valor]);

  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">
        {valor}
      </span>
      <span className="sr-only">{valor}</span>
    </>
  );
}
