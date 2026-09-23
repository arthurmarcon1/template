import Foto from "@/components/Foto";
import { modalidades } from "@/lib/conteudo";

/* Modalidades: duas colunas com foto, frase e categorias. A segunda
   coluna desce um pouco a partir de md para quebrar a simetria. Uma
   coluna no mobile. */

export default function Modalidades() {
  return (
    <section
      aria-labelledby="modalidades-titulo"
      className="section border-t-2 border-bege-200"
    >
      <div className="container-content">
        <h2 id="modalidades-titulo" className="text-h2 text-petroleo-700">
          {modalidades.titulo}
        </h2>

        <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-2 md:gap-10 lg:gap-16">
          {modalidades.itens.map((m, i) => (
            <article key={m.nome} className={i === 1 ? "md:mt-20" : ""}>
              <Foto
                src={m.foto.src}
                alt={m.foto.alt}
                proporcao="4/3"
                sizes="(min-width: 48rem) 45vw, 100vw"
                className="text-petroleo-700"
              />
              <h3 className="mt-6 text-h2 text-petroleo-900">{m.nome}</h3>
              <p className="mt-3 max-w-[40ch] text-lead">{m.frase}</p>
              <p className="mt-4 text-small text-petroleo-500">
                <span className="font-semibold text-petroleo-700">
                  Categorias:
                </span>{" "}
                {m.categorias}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
