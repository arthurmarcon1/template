import { depoimentos } from "@/data/depoimentos";
import { depoimentosSecao } from "@/lib/conteudo";

/* Depoimentos de clubes, de src/data/depoimentos.ts. Card sem texto nao
   renderiza; sem nenhum, a secao inteira some. Ate tres: com tres, tres
   colunas; com menos, as colunas encolhem e o grupo fica centralizado. */

const colunas: Record<number, string> = {
  1: "md:grid-cols-1 md:max-w-[36rem]",
  2: "md:grid-cols-2 md:max-w-[56rem]",
  3: "md:grid-cols-3",
};

export default function Depoimentos() {
  const lista = depoimentos.filter((d) => d.texto.trim() !== "").slice(0, 3);
  if (lista.length === 0) return null;

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-titulo"
      className="section border-b-2 border-bege-200"
    >
      <div className="container-content">
        <h2 id="depoimentos-titulo" className="text-h2 text-petroleo-700">
          {depoimentosSecao.titulo}
        </h2>
        <ul className={`mx-auto mt-12 grid gap-6 md:mt-16 lg:gap-8 ${colunas[lista.length]}`}>
          {lista.map((d) => (
            <li
              key={d.nome}
              className="rounded-md border-2 border-bege-200 p-6 md:p-8"
            >
              <figure className="flex h-full flex-col">
                <blockquote className="text-lead text-petroleo-900">
                  <p>“{d.texto}”</p>
                </blockquote>
                <figcaption className="mt-auto pt-6 text-small text-petroleo-500">
                  <span className="font-semibold text-petroleo-900">
                    {d.nome}
                  </span>
                  <br />
                  {[d.cargo, d.clube].filter(Boolean).join(", ")}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
