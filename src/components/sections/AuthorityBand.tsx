import { autoridade } from "@/lib/site";
import CountUp from "@/components/motion/CountUp";

/* FAIXA DE AUTORIDADE
   Familia de layout: faixa de numeros com reguas. Sem card, sem sombra,
   sem icone, conforme pedido. So tipo e regua.

   Os dois primeiros numeros vieram do briefing e sao reais, e sao os
   unicos que contam. Os dois ultimos estao marcados [X] e ficam
   estaticos: nao existe numero para contar ate o Uilian confirmar.
   Nenhum numero foi inventado (taste-skill Secao 4.9). */

export default function AuthorityBand() {
  return (
    <section aria-label="Números" style={{ paddingBlock: "var(--section-y)" }}>
      <div className="container">
        <hr className="rule" />
        <dl className="stat-row">
          {autoridade.map((item) => (
            <div key={item.rotulo} className="stat">
              <dt className="stat-label">{item.rotulo}</dt>
              <dd
                className="h-display stat-value"
                data-pendente={item.real ? undefined : "true"}
              >
                {"alvo" in item ? (
                  <CountUp
                    alvo={item.alvo}
                    decimais={item.decimais}
                    sufixo={item.sufixo}
                    valorFinal={item.valor}
                  />
                ) : (
                  item.valor
                )}
              </dd>
            </div>
          ))}
        </dl>
        <hr className="rule" />
      </div>
    </section>
  );
}
