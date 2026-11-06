"use client";

import { useEffect, useRef } from "react";

/* Video mudo que toca em loop so enquanto esta na tela e pausa fora
   dela, para nao gastar dados nem bateria. preload none: nada baixa ate
   o video aparecer, ate la fica a capa (poster). Com
   prefers-reduced-motion nao toca sozinho e os controles aparecem, para
   o visitante poder dar play. controls: para video com som. */

export default function VideoAutoplay({
  src,
  poster,
  rotulo,
  controls = false,
  className = "",
}: {
  src: string;
  poster: string;
  rotulo: string;
  controls?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = true;
      return;
    }

    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={rotulo}
      muted
      loop
      playsInline
      controls={controls}
      preload="none"
      className={className}
    />
  );
}
