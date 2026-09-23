"use client";

import { useEffect, useRef, useState } from "react";

/* Bola do hero.

   1. Renderiza ball-static.webp no lugar e no tamanho finais. E o mesmo
      quadro que o modo hero desenha no instante zero (Tarefa 7), entao a
      troca pelo 3D nao tem salto de layout nem de imagem.
   2. Depois que a pagina termina de carregar e o navegador fica ocioso,
      importa o three.js (chunk separado, fora do bundle inicial), monta
      <three-d-stage hero autorotate> por cima da imagem e faz a troca
      com um fade quando a bola ja esta desenhada.
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
    if (reduzir.matches || conexao?.saveData || !temWebGL()) return;

    let cancelado = false;
    let stage: HTMLElement | null = null;

    const iniciar = async () => {
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

    // so depois do conteudo principal: load + ocioso
    let idle = 0;
    const agendar = () => {
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
      idle = ric(() => void iniciar().catch(() => {})) as number;
    };
    if (document.readyState === "complete") agendar();
    else window.addEventListener("load", agendar, { once: true });

    return () => {
      cancelado = true;
      window.removeEventListener("load", agendar);
      window.cancelIdleCallback?.(idle);
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
