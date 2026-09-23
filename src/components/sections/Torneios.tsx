import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import Foto from "@/components/Foto";
import { depoimentos, equipe, torneios } from "@/lib/conteudo";
import { site } from "@/lib/site";

/* Torneios realizados, equipe e depoimentos. Fundo escuro para alternar
   com as secoes claras vizinhas.

   Galeria: 8 fotos numa grade de 4 colunas a partir de md, com a
   primeira em destaque 2x2 e a ultima em 2 colunas, sem celula vazia
   (detalhe na grade abaixo). Mobile: 2 colunas.

   Equipe: retrato 4:5 com recorte retangular sobrio (raio de 8px, sem
   circulo nem borda colorida).

   Depoimentos: so renderiza com conteudo real em conteudo.ts. */

export default function Torneios() {
  return (
    <section
      id="torneios"
      aria-labelledby="torneios-titulo"
      className="section surface-dark"
    >
      <div className="container-content">
        <h2 id="torneios-titulo" className="text-h2">
          {torneios.titulo}
        </h2>

        {/* 4 colunas: a foto 1 ocupa 2x2; as fotos 2 a 5 preenchem as duas
            colunas ao lado dela; as fotos 6 a 8 fecham a ultima linha,
            com a 8 ocupando 2 colunas. Total: 4 + 4 + 4 celulas, sem
            vazio. No mobile, 2 colunas com a primeira em largura cheia. */}
        <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-4">
          {torneios.galeria.map((f, i) => {
            const destaque = i === 0;
            const largo = i === 7;
            return (
              <li
                key={f.src}
                className={
                  destaque
                    ? "col-span-2 md:row-span-2"
                    : largo
                      ? "col-span-2"
                      : ""
                }
              >
                <figure className="h-full">
                  <Foto
                    src={f.src}
                    alt={f.alt}
                    proporcao={largo ? "2/1" : "1/1"}
                    sizes={
                      destaque || largo
                        ? "(min-width: 48rem) 50vw, 100vw"
                        : "(min-width: 48rem) 25vw, 50vw"
                    }
                    className="text-creme-50"
                  />
                  <figcaption className="mt-2 text-small text-neutro-400">
                    {f.legenda}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 font-semibold"
        >
          <InstagramLogo size={22} aria-hidden />
          {torneios.instagram}
        </a>

        <div className="mt-20 border-t border-petroleo-700 pt-16 md:mt-28">
          <h3 className="text-h2">{equipe.titulo}</h3>
          <ul className="mt-10 grid max-w-2xl gap-10 sm:grid-cols-2 sm:gap-8">
            {equipe.pessoas.map((p) => (
              <li key={p.instagram.handle}>
                <Foto
                  src={p.foto.src}
                  alt={p.foto.alt}
                  proporcao="4/5"
                  sizes="(min-width: 42rem) 20rem, (min-width: 36rem) 45vw, 100vw"
                  className="text-creme-50"
                />
                <p className="mt-5 font-display text-h3 font-bold uppercase">
                  {p.nome}
                </p>
                <p className="mt-2 text-neutro-400">{p.linha}</p>
                <a
                  href={p.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2"
                >
                  <InstagramLogo size={20} aria-hidden />
                  {p.instagram.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {depoimentos.length > 0 && (
          <div className="mt-20 border-t border-petroleo-700 pt-16 md:mt-28">
            <h3 className="text-h2">O que dizem os clubes</h3>
            <ul className="mt-10 grid gap-10 md:grid-cols-3">
              {depoimentos.slice(0, 3).map((d) => (
                <li key={d.nome}>
                  <figure>
                    <blockquote className="text-lead">
                      <p>“{d.texto}”</p>
                    </blockquote>
                    <figcaption className="mt-4 text-small text-neutro-400">
                      <span className="font-semibold text-creme-50">
                        {d.nome}
                      </span>
                      <br />
                      {d.clube}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
