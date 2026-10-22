"use client";

import { useEffect, useRef } from "react";

/* Bola que desce pela margem direita conforme a pagina rola, girando
   como se rolasse num trilho. Funciona tambem como barra de progresso.
   O JS so publica o progresso (--p, de 0 a 1); posicao, giro e
   preenchimento do trilho sao calculados no CSS (.bola-scroll em
   globals.css). Quando a rolagem para, a bola da um quique
   (data-quique). So aparece a partir de xl, onde ha margem livre, e
   fica fora com prefers-reduced-motion. */

export default function BolaScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let parada: ReturnType<typeof setTimeout> | undefined;

    const atualizar = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(atualizar);
      el.removeAttribute("data-quique");
      clearTimeout(parada);
      parada = setTimeout(() => el.setAttribute("data-quique", ""), 140);
    };

    atualizar();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(parada);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="bola-scroll">
      <span className="bola-scroll-trilho" />
      {/* eslint-disable-next-line @next/next/no-img-element -- mesmo
          WebP pronto do hero e do CTA final */}
      <img
        src="/bola/ball-static-600.webp"
        width={600}
        height={600}
        alt=""
        loading="lazy"
        decoding="async"
        className="bola-scroll-bola"
      />
    </div>
  );
}
