"use client";

import { useEffect, useRef } from "react";

/* CONTAGEM DOS NUMEROS

   Motivo: os dois numeros reais da pagina sao a prova social mais forte
   que o Uilian tem. A contagem faz o olho parar neles. Roda uma vez so.
   Numero que fica em loop vira enfeite.

   IntersectionObserver dispara, requestAnimationFrame conta.
   O rAF escreve direto no textContent do no. Nao toca estado de React,
   que e o padrao exigido pela Secao 5.D: rAF que mexe em estado
   re-renderiza a arvore a cada frame.

   CLS ZERO, mesmo tratamento de antes:
   um contador ingenuo vai de "0" para "18,2 mil" e a caixa muda de
   largura no meio da animacao. Aqui o valor final fica no DOM como
   elemento de dimensionamento, invisivel mas ocupando espaco, e o
   numero que anima e posicionado sobre ele em absoluto. Nunca participa
   do layout.

   Sob prefers-reduced-motion o valor final e renderizado direto,
   sem observer e sem contagem. */

const DURACAO = 1600;

export default function CountUp({
  alvo,
  decimais = 0,
  sufixo = "",
  valorFinal,
}: {
  alvo: number;
  decimais?: number;
  sufixo?: string;
  valorFinal: string;
}) {
  const box = useRef<HTMLSpanElement>(null);
  const out = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const alvoEl = box.current;
    const saida = out.current;
    if (!alvoEl || !saida) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let inicio = 0;

    const passo = (agora: number) => {
      if (!inicio) inicio = agora;
      const t = Math.min((agora - inicio) / DURACAO, 1);
      /* Mesma curva do easeOut que o GSAP usava (power2.out). */
      const eased = 1 - Math.pow(1 - t, 3);
      saida.textContent = formata(alvo * eased, decimais) + sufixo;

      if (t < 1) {
        raf = requestAnimationFrame(passo);
      } else {
        saida.textContent = valorFinal;
      }
    };

    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        io.disconnect();
        saida.textContent = formata(0, decimais) + sufixo;
        raf = requestAnimationFrame(passo);
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0 },
    );

    io.observe(alvoEl);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [alvo, decimais, sufixo, valorFinal]);

  return (
    <span ref={box} className="countup">
      {/* Reserva a largura final. Invisivel, mas ocupa espaco. */}
      <span aria-hidden="true" className="countup-size">
        {valorFinal}
      </span>
      {/* Valor animado, fora do fluxo e escondido de leitor de tela:
          durante a contagem ele muda dezenas de vezes por segundo. */}
      <span ref={out} aria-hidden="true" className="countup-live">
        {valorFinal}
      </span>
      {/* O que o leitor de tela anuncia: sempre o valor final, uma vez. */}
      <span className="sr-only">{valorFinal}</span>
    </span>
  );
}

function formata(v: number, decimais: number): string {
  return v.toLocaleString("pt-BR", {
    minimumFractionDigits: decimais,
    maximumFractionDigits: decimais,
  });
}
