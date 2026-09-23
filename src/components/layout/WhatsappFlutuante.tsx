"use client";

import { useEffect, useRef } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { whatsappUrl } from "@/lib/site";

/* Botao flutuante de WhatsApp, so abaixo de md (no md+ o header ja
   mostra o botao). Quadrado com raio de 8px, o maximo da marca.
   Fundo petroleo-900 com borda bege-200: aparece tanto sobre as secoes
   claras quanto sobre as escuras.

   Gancho da hero: se existir um elemento [data-hero] na pagina, o CSS
   esconde o botao desde o primeiro render (sem piscar) e este
   IntersectionObserver so o libera, via data-hero-saiu, quando a hero
   sai da tela. Sem [data-hero], o botao fica visivel sempre. */

export default function WhatsappFlutuante() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const botao = ref.current;
    const hero = document.querySelector("[data-hero]");
    if (!botao || !hero) return;

    const io = new IntersectionObserver(([entrada]) => {
      botao.toggleAttribute("data-hero-saiu", !entrada.isIntersecting);
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="whatsapp-flutuante md:hidden"
    >
      <WhatsappLogo size={28} weight="bold" aria-hidden />
    </a>
  );
}
