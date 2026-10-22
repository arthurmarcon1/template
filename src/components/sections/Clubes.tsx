import Image from "next/image";
import { clubes } from "@/data/clubes";
import { clubesAtendidos } from "@/lib/conteudo";

/* Faixa de clubes atendidos. Hoje so nomes em texto, separados pelo
   hexagono da logo. Quando um clube ganhar logo em src/data/clubes.ts,
   o nome vira imagem (o nome continua como alt). */

export default function Clubes() {
  return (
    <section
      aria-labelledby="clubes-titulo"
      className="section border-b-2 border-bege-200"
    >
      <div className="container-content">
        <h2 id="clubes-titulo" className="eyebrow text-agua-600">
          {clubesAtendidos.titulo}
        </h2>
        <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:gap-x-8">
          {clubes.map((c) => (
            <li
              key={c.nome}
              className="flex items-center gap-6 font-display [&:last-child>span]:hidden text-h3 font-bold text-petroleo-700 uppercase md:gap-8"
            >
              {c.logo ? (
                <Image
                  src={c.logo}
                  alt={c.nome}
                  width={160}
                  height={64}
                  className="h-12 w-auto"
                />
              ) : (
                c.nome
              )}
              <span aria-hidden className="hex size-2.5 bg-bege-200" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
