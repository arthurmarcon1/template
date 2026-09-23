import { diferenciais } from "@/lib/conteudo";

/* Diferenciais: os tres pilares da assinatura. Linhas empilhadas (nao
   cards), palavra grande a esquerda e texto a direita a partir de md;
   empilhado no mobile. A faixa de numeros so renderiza com o flag ligado
   e os tres valores preenchidos em conteudo.ts. */

export default function Diferenciais() {
  const { numeros } = diferenciais;
  const mostrarNumeros =
    numeros.exibir && numeros.itens.every((n) => n.valor.trim() !== "");

  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-titulo"
      className="section"
    >
      <div className="container-content">
        <h2 id="diferenciais-titulo" className="text-h2 text-petroleo-700">
          {diferenciais.titulo}
        </h2>

        <div className="mt-10 md:mt-14">
          {diferenciais.pilares.map((p) => (
            <div
              key={p.titulo}
              className="grid gap-3 border-t-2 border-bege-200 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-12 md:py-10"
            >
              <h3 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.9] font-extrabold text-petroleo-700 uppercase">
                {p.titulo}
              </h3>
              <p className="max-w-[44ch] text-lead">{p.texto}</p>
            </div>
          ))}
        </div>

        {mostrarNumeros && (
          <dl className="mt-4 grid gap-8 border-t-2 border-bege-200 pt-10 sm:grid-cols-3">
            {numeros.itens.map((n) => (
              <div key={n.rotulo}>
                <dt className="sr-only">{n.rotulo}</dt>
                <dd>
                  <span className="block font-display text-[clamp(3rem,6vw,4.5rem)] leading-none font-extrabold text-agua-600">
                    {n.valor}
                  </span>
                  <span className="mt-2 block text-petroleo-700" aria-hidden>
                    {n.rotulo}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
