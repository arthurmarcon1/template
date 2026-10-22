import { Check } from "@phosphor-icons/react/dist/ssr";
import { config } from "@/data/config";
import { planos } from "@/lib/conteudo";

/* Planos: remoto e presencial, lado a lado a partir de md, empilhados no
   mobile. Os dois com o mesmo peso visual (nenhum "recomendado"). Borda
   bege-200, raio de 8px, sem sombra nem gradiente. O preco so aparece
   com config.exibirPrecos ligado (src/data/config.ts). */

function Preco({ valor }: { valor: string }) {
  return (
    <p className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] leading-none font-extrabold text-petroleo-900">
      {config.exibirPrecos ? valor : planos.precoOculto}
    </p>
  );
}

export default function Planos() {
  return (
    <section id="planos" aria-labelledby="planos-titulo" className="section">
      <div className="container-content">
        <h2 id="planos-titulo" className="revelar max-w-[20ch] text-h2 text-petroleo-700">
          {planos.titulo}
        </h2>

        <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:gap-8">
          {planos.itens.map((p) => (
            <li
              key={p.nome}
              className="revelar flex flex-col rounded-md border-2 border-bege-200 p-6 transition-colors duration-200 hover:border-agua-600 md:p-8"
            >
              <p className="eyebrow self-start rounded-sm bg-bege-200 px-2.5 py-1 text-petroleo-900">
                {p.selo}
              </p>
              <h3 className="mt-5 text-h3 text-petroleo-900">{p.nome}</h3>
              <Preco valor={p.preco} />
              <p className="mt-5 max-w-[46ch]">{p.resumo}</p>

              <div className="mt-8 flex-1">
                <p className="font-semibold text-petroleo-900">
                  {p.incluiTitulo}:
                </p>
                <ul className="mt-3 space-y-2">
                  {p.inclui.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        size={20}
                        weight="bold"
                        aria-hidden
                        className="mt-0.5 shrink-0 text-agua-600"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-8 border-t-2 border-bege-200 pt-5 text-small text-petroleo-700">
                <span className="font-semibold text-petroleo-900">
                  O clube fornece:
                </span>{" "}
                {p.clube}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-small text-petroleo-500">{planos.nota}</p>
      </div>
    </section>
  );
}
