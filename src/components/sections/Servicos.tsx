import { servicos } from "@/lib/conteudo";

/* O que entregamos. Fundo petroleo-900, lista em duas colunas com o
   hexagono como marcador, sem cards. Texto corrido em neutro-400 (5.54:1);
   agua-400 so no marcador, que e decorativo. Uma coluna no mobile. */

export default function Servicos() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-titulo"
      className="section surface-dark"
    >
      <div className="container-content">
        <h2 id="servicos-titulo" className="revelar text-h2">
          {servicos.titulo}
        </h2>

        <ul className="mt-12 grid gap-x-16 gap-y-10 md:mt-16 md:grid-cols-2">
          {servicos.itens.map((item) => (
            <li key={item.titulo} className="group revelar flex gap-5">
              <span aria-hidden className="hex mt-2 size-5 bg-agua-400 transition-transform duration-700 ease-out group-hover:rotate-[360deg]" />
              <div>
                <h3 className="text-h3">{item.titulo}</h3>
                <p className="mt-2 max-w-[40ch] text-neutro-400">{item.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
