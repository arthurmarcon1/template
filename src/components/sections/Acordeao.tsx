"use client";

import { useId, useState } from "react";
import { Plus } from "@phosphor-icons/react";

/* Acordeao acessivel: cada pergunta e um <button> com aria-expanded e
   aria-controls, dentro de um heading (padrao WAI-ARIA Accordion). Varios
   itens podem ficar abertos ao mesmo tempo. O painel usa o atributo
   hidden, entao sai da arvore de acessibilidade quando fechado. */

export default function Acordeao({
  itens,
}: {
  itens: readonly { pergunta: string; resposta: string }[];
}) {
  const base = useId();
  const [abertos, setAbertos] = useState<Set<number>>(new Set());

  const alternar = (i: number) =>
    setAbertos((atual) => {
      const novo = new Set(atual);
      if (novo.has(i)) novo.delete(i);
      else novo.add(i);
      return novo;
    });

  return (
    <div className="border-b-2 border-bege-200">
      {itens.map((item, i) => {
        const aberto = abertos.has(i);
        const idBotao = `${base}-b${i}`;
        const idPainel = `${base}-p${i}`;
        return (
          <div key={item.pergunta} className="border-t-2 border-bege-200">
            <h3>
              <button
                type="button"
                id={idBotao}
                aria-expanded={aberto}
                aria-controls={idPainel}
                onClick={() => alternar(i)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-body text-lead font-semibold normal-case tracking-normal text-petroleo-900"
              >
                {item.pergunta}
                <Plus
                  size={22}
                  weight="bold"
                  aria-hidden
                  className={`shrink-0 text-petroleo-700 transition-transform duration-200 ${aberto ? "rotate-45" : ""}`}
                />
              </button>
            </h3>
            <div
              id={idPainel}
              role="region"
              aria-labelledby={idBotao}
              hidden={!aberto}
              className="pb-6 text-petroleo-700"
            >
              <p className="max-w-[60ch]">{item.resposta}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
