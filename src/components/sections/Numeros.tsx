import Contador from "@/components/efeitos/Contador";
import { numeros } from "@/lib/conteudo";

/* Faixa de numeros, logo apos o contraste Sem/Com a F&M. Quatro em linha
   a partir de lg, 2x2 abaixo. Mesmo tratamento tipografico dos numeros
   da linha do tempo (display extrabold em agua-600, secao clara). Os
   valores numericos contam a partir de 0 ao entrar na tela. */

export default function Numeros() {
  return (
    <section
      aria-labelledby="numeros-titulo"
      className="section border-t-2 border-bege-200"
    >
      <div className="container-content">
        <h2 id="numeros-titulo" className="sr-only">
          {numeros.titulo}
        </h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-8">
          {numeros.itens.map((n) => (
            <div key={n.rotulo} className="revelar flex flex-col-reverse justify-end">
              <dt className="mt-2 text-petroleo-700">{n.rotulo}</dt>
              <dd className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-extrabold text-agua-600">
                <Contador valor={n.valor} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
