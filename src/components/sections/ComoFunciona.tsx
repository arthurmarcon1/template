import { comoFunciona } from "@/lib/conteudo";

/* Como funciona. Linha do tempo: vertical no mobile (linha a esquerda),
   horizontal a partir de lg (linha no topo, quatro colunas). O marco de
   cada passo e o hexagono da logo. Numeros em agua-600 porque a secao e
   clara (regra de contraste do LANDING_FM.md). */

export default function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-titulo"
      className="section border-t-2 border-bege-200"
    >
      <div className="container-content">
        <h2 id="como-funciona-titulo" className="text-h2 text-petroleo-700">
          {comoFunciona.titulo}
        </h2>

        <ol className="mt-12 grid gap-10 border-l-2 border-bege-200 md:mt-16 lg:grid-cols-4 lg:gap-8 lg:border-t-2 lg:border-l-0">
          {comoFunciona.passos.map((passo, i) => (
            <li key={passo.titulo} className="relative pl-8 lg:pt-10 lg:pl-0">
              <span
                aria-hidden
                className="hex absolute top-3 -left-[0.5625rem] size-4 bg-agua-600 lg:-top-[0.5625rem] lg:left-0"
              />
              <p
                aria-hidden
                className="font-display text-[clamp(3.5rem,7vw,5rem)] leading-none font-extrabold text-agua-600"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-h3 text-petroleo-900">
                <span className="sr-only">Passo {i + 1}: </span>
                {passo.titulo}
              </h3>
              <p className="mt-3 max-w-[32ch]">{passo.texto}</p>
              <p className="mt-3 max-w-[32ch] text-small text-petroleo-500">
                {passo.detalhe}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
