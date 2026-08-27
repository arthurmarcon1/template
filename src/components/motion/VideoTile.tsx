"use client";

import { useEffect, useRef, useState } from "react";

/* TILE DE VIDEO NA GALERIA

   O video e retrato 480x608 (proporcao 0.789), que e praticamente o 4:5
   dos slots da galeria. Entra como um ladrilho em movimento entre os
   estaticos, sem quebrar a composicao.

   Autoplay exige muted. O arquivo TEM trilha de audio, entao ela fica
   silenciada: se o audio importar, o certo e um controle de som
   explicito, nao autoplay com som.

   WCAG 2.2.2: conteudo em movimento que dura mais de 5 segundos e
   repete precisa de um mecanismo de pausa. O video tem 6s e roda em
   loop, entao o botao de pausa e requisito, nao enfeite.

   prefers-reduced-motion: nao da play sozinho. Fica no primeiro quadro,
   parado, e o visitante decide. */

export default function VideoTile({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    v.play()
      .then(() => setTocando(true))
      .catch(() => setTocando(false));
  }, []);

  function alternar() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setTocando(true)).catch(() => {});
    } else {
      v.pause();
      setTocando(false);
    }
  }

  return (
    <div className="video-tile">
      <video
        ref={ref}
        className="video-tile-el"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        width={480}
        height={608}
        aria-label={label}
      />
      <button
        type="button"
        className="video-tile-btn"
        onClick={alternar}
        aria-pressed={tocando}
      >
        {tocando ? "Pausar" : "Reproduzir"}
      </button>
    </div>
  );
}
