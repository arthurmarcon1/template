import { problema } from "@/lib/conteudo";

/* Problema e proposta. Contraste sobrio em duas colunas, sem icone de
   X/check: o lado "sem" fica em tom apagado, o lado "com" em tom cheio,
   separados por uma divisoria bege-200. No mobile as colunas empilham e
   a divisoria vira horizontal. */

export default function Problema() {
  return (
    <section aria-labelledby="problema-titulo" className="section">
      <div className="container-content">
        <h2 id="problema-titulo" className="text-h2 text-petroleo-700">
          {problema.titulo.map((frase) => (
            <span key={frase} className="block">
              {frase}
            </span>
          ))}
        </h2>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[1fr_auto_1fr] md:gap-12">
          <div>
            <h3 className="text-h3 text-petroleo-500">{problema.sem.titulo}</h3>
            <ul className="mt-6 space-y-3 text-lead text-petroleo-500">
              {problema.sem.itens.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div aria-hidden className="h-0.5 w-full bg-bege-200 md:h-auto md:w-0.5" />

          <div>
            <h3 className="text-h3 text-petroleo-900">{problema.com.titulo}</h3>
            <ul className="mt-6 space-y-3 text-lead font-semibold text-petroleo-900">
              {problema.com.itens.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t-2 border-bege-200 pt-8 font-display text-h3 font-bold uppercase text-agua-600 md:mt-20">
          {problema.fechamento}
        </p>
      </div>
    </section>
  );
}
