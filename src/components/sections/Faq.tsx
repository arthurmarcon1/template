import { faq } from "@/lib/conteudo";
import Acordeao from "./Acordeao";

/* FAQ. O acordeao e a unica parte com JavaScript (Acordeao.tsx). */

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="section">
      <div className="container-content grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <h2 id="faq-titulo" className="text-h2 text-petroleo-700">
          {faq.titulo}
        </h2>
        <Acordeao itens={faq.itens} />
      </div>
    </section>
  );
}
