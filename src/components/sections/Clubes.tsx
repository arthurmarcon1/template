import Image from "next/image";
import { clubes, type Clube } from "@/data/clubes";
import { clubesAtendidos } from "@/lib/conteudo";

/* Faixa de clubes atendidos: dois letreiros correndo em sentidos
   opostos, de ponta a ponta da tela. O de cima em texto cheio, o de
   baixo vazado (so contorno), comecando no meio da lista. Cada trilho
   repete a lista duas vezes e anda -50%, entao o loop nao tem emenda.
   Para sob o mouse. Com prefers-reduced-motion vira uma lista parada
   (.marquee em globals.css).

   Os letreiros sao decorativos (aria-hidden); a lista real, uma vez so,
   fica no sr-only. Quando um clube ganhar logo em src/data/clubes.ts,
   o nome vira imagem. */

function Trilho({
  lista,
  reverso = false,
  vazado = false,
}: {
  lista: Clube[];
  reverso?: boolean;
  vazado?: boolean;
}) {
  return (
    <div className={`marquee ${vazado ? "marquee-extra" : ""}`}>
      <ul className={`marquee-trilho ${reverso ? "marquee-reverso" : ""}`}>
        {[...lista, ...lista].map((c, i) => (
          <li
            key={i}
            data-dup={i >= lista.length || undefined}
            className={`flex shrink-0 items-center gap-8 pr-8 font-display text-[clamp(1.75rem,4vw,3rem)] leading-tight font-extrabold uppercase md:gap-12 md:pr-12 ${vazado ? "texto-vazado" : "text-petroleo-700"}`}
          >
            {c.logo ? (
              <Image
                src={c.logo}
                alt=""
                width={200}
                height={80}
                className="h-14 w-auto"
              />
            ) : (
              c.nome
            )}
            <span aria-hidden className="hex size-3 bg-agua-600" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Clubes() {
  const meio = Math.ceil(clubes.length / 2);
  const deslocada = [...clubes.slice(meio), ...clubes.slice(0, meio)];

  return (
    <section
      aria-labelledby="clubes-titulo"
      className="section overflow-hidden border-b-2 border-bege-200"
    >
      <div className="container-content">
        <h2 id="clubes-titulo" className="eyebrow revelar text-agua-600">
          {clubesAtendidos.titulo}
        </h2>
      </div>

      <ul className="sr-only">
        {clubes.map((c) => (
          <li key={c.nome}>{c.nome}</li>
        ))}
      </ul>

      <div aria-hidden className="mt-8 space-y-2 md:mt-10 md:space-y-4">
        <Trilho lista={clubes} />
        <Trilho lista={deslocada} reverso vazado />
      </div>
    </section>
  );
}
