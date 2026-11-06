import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import VideoAutoplay from "@/components/efeitos/VideoAutoplay";
import Foto from "@/components/Foto";
import { equipe, torneios } from "@/lib/conteudo";
import { site } from "@/lib/site";

/* Torneios realizados e equipe. Fundo escuro para alternar
   com as secoes claras vizinhas.

   Destaque: o Circuito Santa-Mariense, foto e texto lado a lado a partir
   de md, empilhados no mobile. A foto tem 723px de largura, entao fica
   limitada a metade do container para nao ampliar.

   Elite Padel Club: os dois videos com som, inclinados e desalinhados,
   com o texto entre eles (acima deles no mobile).

   Elite Cup: um bloco por video longo, com tres takes mudos. A partir
   de lg, o titulo fica preso a esquerda enquanto os takes passam.

   Galeria: 8 fotos numa grade de 4 colunas a partir de md, com a
   primeira em destaque 2x2 e a ultima em 2 colunas, sem celula vazia
   (detalhe na grade abaixo). Mobile: 2 colunas.

   Equipe: retrato 4:5 com recorte retangular sobrio (raio de 8px, sem
   circulo nem borda colorida). */

export default function Torneios() {
  return (
    <section
      id="torneios"
      aria-labelledby="torneios-titulo"
      className="section surface-dark"
    >
      <div className="container-content">
        <h2 id="torneios-titulo" className="revelar text-h2">
          {torneios.titulo}
        </h2>

        <article className="revelar mt-12 grid items-center gap-6 md:mt-16 md:grid-cols-2 md:gap-12">
          <Foto
            src={torneios.destaque.foto.src}
            alt={torneios.destaque.foto.alt}
            proporcao="723/489"
            sizes="(min-width: 48rem) 37rem, 100vw"
            className="text-creme-50"
          />
          <div>
            <h3 className="text-h3">{torneios.destaque.titulo}</h3>
            <p className="mt-3 max-w-[44ch] text-lead text-neutro-400">
              {torneios.destaque.texto}
            </p>
          </div>
        </article>

        <article className="mt-16 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-petroleo-700 pt-14 md:mt-24 md:grid-cols-[1fr_1.1fr_1fr] md:gap-x-10 md:pt-20">
          <div className="revelar col-span-2 md:col-span-1 md:col-start-2 md:row-start-1 md:self-center">
            <h3 className="text-h2">{torneios.eliteClub.titulo}</h3>
            <p className="mt-3 max-w-[32ch] text-lead text-neutro-400">
              {torneios.eliteClub.texto}
            </p>
          </div>
          {torneios.eliteClub.videos.map((v, i) => (
            <div
              key={v.src}
              className={`revelar transition-[rotate] duration-300 hover:rotate-0 ${
                i === 0
                  ? "-rotate-3 md:col-start-1 md:row-start-1"
                  : "mt-10 rotate-2 md:col-start-3 md:row-start-1 md:mt-28"
              }`}
            >
              <VideoAutoplay
                src={v.src}
                poster={v.poster}
                rotulo={v.rotulo}
                controls
                className="aspect-[394/645] w-full rounded-md bg-petroleo-700 object-cover"
              />
            </div>
          ))}
        </article>

        {torneios.eliteCup.map((bloco) => (
          <article
            key={bloco.titulo}
            className="mt-14 grid gap-6 border-t border-petroleo-700 pt-12 md:mt-20 md:pt-16 lg:grid-cols-[1fr_2.5fr] lg:gap-10"
          >
            <h3 className="revelar text-h2 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
              {bloco.titulo}
            </h3>
            <ul className="grid grid-cols-3 gap-2 md:gap-4">
              {bloco.takes.map((t, i) => (
                <li key={t.id} className={`revelar ${i === 1 ? "mt-6 md:mt-12" : ""}`}>
                  <VideoAutoplay
                    src={`/videos/${t.id}.mp4`}
                    poster={`/videos/${t.id}.webp`}
                    rotulo={t.rotulo}
                    className="aspect-[9/16] w-full rounded-md bg-petroleo-700 object-cover"
                  />
                </li>
              ))}
            </ul>
          </article>
        ))}

        {/* 4 colunas: a foto 1 ocupa 2x2; as fotos 2 a 5 preenchem as duas
            colunas ao lado dela; as fotos 6 a 8 fecham a ultima linha,
            com a 8 ocupando 2 colunas. Total: 4 + 4 + 4 celulas, sem
            vazio. No mobile, 2 colunas com a primeira em largura cheia. */}
        <ul className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-4">
          {torneios.galeria.map((f, i) => {
            const destaque = i === 0;
            const largo = i === 7;
            return (
              <li
                key={f.src}
                className={`revelar ${
                  destaque
                    ? "col-span-2 md:row-span-2"
                    : largo
                      ? "col-span-2"
                      : ""
                }`}
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
          <h3 className="revelar text-h2">{equipe.titulo}</h3>
          <ul className="mt-10 grid max-w-[42rem] gap-10 sm:grid-cols-2 sm:gap-8">
            {equipe.pessoas.map((p) => (
              <li key={p.instagram.handle} className="revelar">
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

      </div>
    </section>
  );
}
