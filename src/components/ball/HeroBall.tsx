"use client";

import { useEffect, useRef, useState } from "react";

/* Bola do hero.

   1. Renderiza ball-static.webp no lugar e no tamanho finais. E o mesmo
      quadro que o modo hero desenha no instante zero (Tarefa 7), entao a
      troca pelo 3D nao tem salto de layout nem de imagem.
   2. Depois que a pagina carrega, na primeira interacao do visitante
      (mouse, toque, rolagem, roda ou teclado), importa o three.js (chunk
      separado, fora do bundle inicial), monta <three-d-stage hero
      autorotate> por cima da imagem e faz a troca com um fade quando a
      bola ja esta desenhada. Esperar a interacao tira o parse do
      three.js (~770 KB) da janela de carregamento: num Android
      intermediario isso sao segundos de thread principal ocupada bem na
      hora em que a pagina precisa responder. Como a imagem e o mesmo
      quadro do 3D, ate la ninguem ve diferenca.
   3. Nao carrega o three.js com prefers-reduced-motion, com economia de
      dados ligada ou sem WebGL: fica so a imagem.

   `tamanhos` e o atributo sizes da imagem, casado com o CSS do container. */

export default function HeroBall({
  tamanhos,
  prioridade = false,
}: {
  tamanhos: string;
  prioridade?: boolean;
}) {
  const caixa = useRef<HTMLDivElement>(null);
  const [vivo, setVivo] = useState(false);

  useEffect(() => {
    const alvo = caixa.current;
    if (!alvo) return;

    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conexao = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
    if (reduzir.matches || conexao?.saveData) return;

    let cancelado = false;
    let stage: HTMLElement | null = null;

    const iniciar = async () => {
      // Criar um contexto WebGL so para testar custa caro (em alguns
      // aparelhos, centenas de ms). Por isso o teste fica aqui, depois da
      // interacao, e nao no efeito que roda na hidratacao.
      if (!temWebGL()) return;
      const [{ defineThreeDStage }, { mountBall }] = await Promise.all([
        import("./three-d-stage"),
        import("./build-ball"),
      ]);
      if (cancelado) return;
      defineThreeDStage();
      const el = document.createElement("three-d-stage") as import(
        "./three-d-stage"
      ).ThreeDStage;
      el.setAttribute("hero", "");
      el.setAttribute("autorotate", "");
      el.setAttribute("aria-hidden", "true");
      el.className = "hero-ball-stage";
      stage = el;
      alvo.appendChild(el);
      await mountBall(el);
      // espera um quadro desenhado antes de cruzar com a imagem
      requestAnimationFrame(() => {
        requestAnimationFrame(() => !cancelado && setVivo(true));
      });
    };

    // primeira interacao depois do load. Listeners passivos e de uso
    // unico: disparam uma vez e saem (nao e um handler de scroll por
    // quadro).
    const gatilhos = [
      "pointermove",
      "pointerdown",
      "touchstart",
      "wheel",
      "scroll",
      "keydown",
    ] as const;
    let disparado = false;
    const disparar = () => {
      if (disparado) return;
      disparado = true;
      gatilhos.forEach((g) => window.removeEventListener(g, disparar));
      void iniciar().catch(() => {});
    };
    const armar = () =>
      gatilhos.forEach((g) =>
        window.addEventListener(g, disparar, { passive: true, once: true }),
      );
    if (document.readyState === "complete") armar();
    else window.addEventListener("load", armar, { once: true });

    return () => {
      cancelado = true;
      window.removeEventListener("load", armar);
      gatilhos.forEach((g) => window.removeEventListener(g, disparar));
      stage?.remove();
    };
  }, []);

  return (
    <div ref={caixa} className="hero-ball" data-vivo={vivo ? "" : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element -- WebP ja
          otimizado em 600 e 1200 (scripts/ball-static.mjs); next/image
          so recomprimiria. */}
      <img
        src="/bola/ball-static.webp"
        srcSet="/bola/ball-static-600.webp 600w, /bola/ball-static.webp 1200w"
        sizes={tamanhos}
        width={1200}
        height={1200}
        alt=""
        decoding="async"
        fetchPriority={prioridade ? "high" : "auto"}
        loading={prioridade ? "eager" : "lazy"}
        className="hero-ball-img"
      />
    </div>
  );
}

function temWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
