"use client";

import { useEffect, useRef, useState } from "react";
import { List, WhatsappLogo, X } from "@phosphor-icons/react";
import { secoes, whatsappUrl } from "@/lib/site";

/* Menu simples abaixo de lg: um botao que abre um painel sob o header.
   Padrao disclosure (button + aria-expanded), sem armadilha de foco.
   Fecha com Esc (devolvendo o foco ao botao), ao escolher um link e
   quando a tela passa para lg, onde o menu inline assume. */

export default function MobileMenu() {
  const [aberto, setAberto] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botao.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 64rem)");
    const onMq = () => mq.matches && setAberto(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [aberto]);

  return (
    <div className="lg:hidden">
      <button
        ref={botao}
        type="button"
        className="btn btn-text gap-2 no-underline"
        aria-expanded={aberto}
        aria-controls="menu-mobile"
        onClick={() => setAberto((v) => !v)}
      >
        {aberto ? (
          <X size={22} weight="bold" aria-hidden />
        ) : (
          <List size={22} weight="bold" aria-hidden />
        )}
        Menu
      </button>

      <div
        id="menu-mobile"
        hidden={!aberto}
        className="surface-dark absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-b border-petroleo-700"
      >
        <nav aria-label="Principal" className="container-content py-6">
          <ul>
            {secoes.map((s) => (
              <li key={s.id} className="border-b border-petroleo-700">
                <a
                  href={`#${s.id}`}
                  className="block py-4 font-display text-h3 font-bold uppercase no-underline"
                  onClick={() => setAberto(false)}
                >
                  {s.rotulo}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary mt-6 w-full"
          >
            <WhatsappLogo size={20} weight="bold" aria-hidden />
            Falar no WhatsApp
          </a>
        </nav>
      </div>
    </div>
  );
}
