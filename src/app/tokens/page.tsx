import type { Metadata } from "next";
import { notFound } from "next/navigation";

/* Pagina de validacao dos tokens de design. So existe em
   desenvolvimento: em producao responde 404. */

export const metadata: Metadata = { title: "Tokens" };

const cores = [
  { token: "petroleo-900", hex: "#10313E", uso: "Fundo principal escuro", escura: true },
  { token: "petroleo-700", hex: "#294B54", uso: "Logo, títulos no claro, bordas", escura: true },
  { token: "petroleo-500", hex: "#507275", uso: "Cards, bordas e detalhes. Não é fundo de seção", escura: true },
  { token: "agua-400", hex: "#729E91", uso: "Destaques no escuro: títulos, eyebrow, detalhes", escura: true },
  { token: "agua-600", hex: "#4F6E65", uso: "Texto verde-água sobre fundo claro", escura: true },
  { token: "neutro-400", hex: "#9CA7A4", uso: "Texto secundário no escuro", escura: false },
  { token: "creme-50", hex: "#F1EFE8", uso: "Fundo claro, texto no escuro", escura: false },
  { token: "bege-200", hex: "#E2D7B7", uso: "Divisores, selos, hexágono", escura: false },
  { token: "bola-400", hex: "#D6E23F", uso: "Acento raro: bola e CTA principal", escura: false },
] as const;

/* Pares texto/fundo com a razao WCAG calculada. AA exige 4.5 para
   texto normal e 3 para texto grande (24px, ou 18.5px em negrito). */
const contrastes = [
  { texto: "creme-50", fundo: "petroleo-900", razao: 11.92 },
  { texto: "bola-400", fundo: "petroleo-900", razao: 9.67 },
  { texto: "bege-200", fundo: "petroleo-900", razao: 9.56 },
  { texto: "neutro-400", fundo: "petroleo-900", razao: 5.54 },
  { texto: "agua-400", fundo: "petroleo-900", razao: 4.58 },
  { texto: "creme-50", fundo: "petroleo-500", razao: 4.56 },
  { texto: "neutro-400", fundo: "petroleo-500", razao: 2.12 },
  { texto: "agua-400", fundo: "petroleo-500", razao: 1.75 },
  { texto: "petroleo-900", fundo: "creme-50", razao: 11.92 },
  { texto: "petroleo-700", fundo: "creme-50", razao: 8.19 },
  { texto: "agua-600", fundo: "creme-50", razao: 4.87 },
  { texto: "petroleo-500", fundo: "creme-50", razao: 4.56 },
  { texto: "agua-400", fundo: "creme-50", razao: 2.6 },
  { texto: "petroleo-900", fundo: "bola-400", razao: 9.67 },
] as const;

/* Regras de uso decididas na Tarefa 2. Espelham a secao "Regras de
   contraste" de docs/LANDING_FM.md: mudou la, muda aqui. */
const regras = [
  {
    titulo: "Verde-água no claro é agua-600",
    texto:
      "agua-400 nunca é texto sobre fundo claro (2,60:1). Sobre creme-50, use agua-600 (4,87:1). Sobre bege-200, agua-600 só em texto grande (3,9:1).",
  },
  {
    titulo: "agua-400 no escuro só em destaque",
    texto:
      "Sobre petroleo-900 (4,58:1), agua-400 vale para títulos, eyebrow e destaques. Texto corrido no escuro é creme-50 ou neutro-400.",
  },
  {
    titulo: "petroleo-500 não é fundo de seção",
    texto:
      "Só cards, bordas e detalhes. Se um card nele tiver texto, o texto é creme-50 (4,56:1); agua-400 e neutro-400 falham.",
  },
  {
    titulo: "Números do Como funciona",
    texto:
      "agua-600 se a seção for clara, agua-400 se for escura.",
  },
] as const;

const hex = Object.fromEntries(cores.map((c) => [c.token, c.hex]));

function veredito(r: number) {
  if (r >= 7) return "AAA";
  if (r >= 4.5) return "AA";
  if (r >= 3) return "Só texto grande";
  return "Falha";
}

const titulos = [
  { classe: "text-display", nome: "Display", px: "48 a 96px", tag: "h1" },
  { classe: "text-h1", nome: "H1", px: "40 a 72px", tag: "h1" },
  { classe: "text-h2", nome: "H2", px: "32 a 52px", tag: "h2" },
  { classe: "text-h3", nome: "H3", px: "24 a 32px", tag: "h3" },
] as const;

const espacos = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32];

function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow mb-6 text-petroleo-500">{children}</p>
  );
}

export default function TokensPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main id="conteudo">
      <header className="surface-dark">
        <div className="container-content py-12">
          <p className="eyebrow text-agua-400">Design tokens · só em dev</p>
          <h1 className="mt-3 text-h1">F&amp;M Eventos Esportivos</h1>
          <p className="mt-4 max-w-text text-lead text-neutro-400">
            Cores, tipografia, botões e espaçamento para validar antes de
            montar as seções. Fonte: <code>design/tokens.css</code>.
          </p>
        </div>
      </header>

      {/* Cores */}
      <section className="section">
        <div className="container-content">
          <Rotulo>01 · Cores</Rotulo>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {cores.map((c) => (
              <li key={c.token}>
                <div
                  className="aspect-[4/3] rounded-md border border-petroleo-700/15"
                  style={{ background: c.hex }}
                />
                <p className="mt-3 font-display text-h3 uppercase">{c.token}</p>
                <p className="text-small text-petroleo-500">
                  <code>{c.hex}</code>
                </p>
                <p className="mt-1 text-small">{c.uso}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contraste */}
      <section className="section border-t border-bege-200">
        <div className="container-content">
          <Rotulo>02 · Contraste WCAG</Rotulo>
          <p className="mb-8 max-w-text">
            AA pede 4.5 para texto normal e 3 para texto grande. Pares que
            falham não entram como texto.
          </p>
          <ol className="mb-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {regras.map((r, i) => (
              <li key={r.titulo} className="border-l-2 border-bege-200 pl-5">
                <p className="font-display text-h3 uppercase text-petroleo-700">
                  <span className="text-agua-600">{i + 1}.</span> {r.titulo}
                </p>
                <p className="mt-2 text-small">{r.texto}</p>
              </li>
            ))}
          </ol>
          <ul className="grid gap-3 md:grid-cols-2">
            {contrastes.map((p) => (
              <li
                key={p.texto + p.fundo}
                className="flex items-center justify-between gap-4 rounded-sm px-5 py-4"
                style={{ background: hex[p.fundo], color: hex[p.texto] }}
              >
                <span className="font-semibold">
                  {p.texto} sobre {p.fundo}
                </span>
                <span className="font-display text-h3 uppercase">
                  {p.razao.toFixed(2)} · {veredito(p.razao)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tipografia no claro */}
      <section className="section border-t border-bege-200">
        <div className="container-content">
          <Rotulo>03 · Tipografia no claro</Rotulo>
          <div className="space-y-8">
            {titulos.map((t) => (
              <div key={t.classe}>
                <p className="text-small text-petroleo-500">
                  {t.nome} · Barlow Condensed 800 · {t.px} ·{" "}
                  <code>{t.classe}</code>
                </p>
                <t.tag className={`${t.classe} mt-1 text-petroleo-700`}>
                  Torneio bom dá movimento.
                </t.tag>
              </div>
            ))}
            <div>
              <p className="text-small text-petroleo-500">
                Lead · Barlow 400 · <code>text-lead</code>
              </p>
              <p className="mt-1 max-w-text text-lead">
                A F&amp;M organiza o torneio inteiro, das inscrições à
                premiação. Seu clube só abre as quadras.
              </p>
            </div>
            <div>
              <p className="text-small text-petroleo-500">
                Corpo · Barlow 400, 500 e 600 · <code>text-body</code>
              </p>
              <p className="mt-1 max-w-text">
                Recebemos, confirmamos e organizamos todos os inscritos.{" "}
                <span className="font-medium">Chaves e horários online.</span>{" "}
                <span className="font-semibold">Cronograma cumprido.</span>
              </p>
            </div>
            <div>
              <p className="text-small text-petroleo-500">
                Destaque verde-água no claro · <code>text-agua-600</code>
              </p>
              <p className="mt-1 text-h2 font-display uppercase text-agua-600">
                Zero estresse.
              </p>
            </div>
            <div>
              <p className="text-small text-petroleo-500">
                Assinatura · <code>eyebrow</code>
              </p>
              <p className="eyebrow mt-1 text-petroleo-700">
                Organização · Competição · Experiência
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tipografia e botoes no escuro */}
      <section className="section surface-dark">
        <div className="container-content">
          <p className="eyebrow mb-6 text-neutro-400">
            04 · Tipografia e botões no escuro
          </p>
          <p className="eyebrow text-agua-400">Padel &amp; Beach Tennis</p>
          <h2 className="mt-3 text-display">
            Seu clube, grandes torneios.
            <br />
            <span className="text-agua-400">Zero estresse.</span>
          </h2>
          <p className="mt-6 max-w-text text-lead">
            A F&amp;M organiza o torneio inteiro, das inscrições à premiação.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a className="btn btn-primary" href="#">
              Quero um torneio no meu clube
            </a>
            <a className="btn btn-secondary" href="#">
              Secundário
            </a>
            <a className="btn btn-text" href="#">
              Ver como funciona
            </a>
          </div>
          <p className="mt-8 max-w-text">
            Texto corrido com{" "}
            <a href="#">link sobre fundo escuro</a> e{" "}
            <span className="text-neutro-400">texto secundário</span>.
          </p>
          <p className="eyebrow mt-10 text-neutro-400">
            Organização · Competição · Experiência
          </p>
        </div>
      </section>

      {/* Botoes e links no claro */}
      <section className="section">
        <div className="container-content">
          <Rotulo>05 · Botões, links e foco no claro</Rotulo>
          <div className="flex flex-wrap items-center gap-4">
            <a className="btn btn-primary" href="#">
              Quero um torneio no meu clube
            </a>
            <a className="btn btn-secondary" href="#">
              Falar no WhatsApp
            </a>
            <a className="btn btn-text" href="#">
              Ver como funciona
            </a>
          </div>
          <p className="mt-8 max-w-text">
            Texto corrido com <a href="#">link sobre fundo claro</a>. Use Tab
            para ver o anel de foco: petróleo no claro, creme no escuro.
          </p>
        </div>
      </section>

      {/* Espacamento e layout */}
      <section className="section border-t border-bege-200">
        <div className="container-content">
          <Rotulo>06 · Espaçamento (base 4px)</Rotulo>
          <ul className="space-y-2">
            {espacos.map((n) => (
              <li key={n} className="flex items-center gap-4">
                <code className="w-24 text-small">
                  {n} · {n * 4}px
                </code>
                <span
                  className="block h-3 rounded-sm bg-petroleo-700"
                  style={{ width: n * 4 }}
                />
              </li>
            ))}
          </ul>

          <p className="eyebrow mb-4 mt-12 text-petroleo-500">Layout</p>
          <dl className="grid max-w-text grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-small">
            <dt className="font-semibold">Conteúdo</dt>
            <dd>1200px máx. (max-w-content), margem lateral 16 a 32px</dd>
            <dt className="font-semibold">Leitura</dt>
            <dd>640px máx. (max-w-text)</dd>
            <dt className="font-semibold">Seção</dt>
            <dd>64 a 120px de respiro vertical</dd>
            <dt className="font-semibold">Breakpoints</dt>
            <dd>sm 576 · md 768 · lg 1024 · xl 1280</dd>
            <dt className="font-semibold">Raios</dt>
            <dd>4px (rounded-sm) e 8px (rounded-md), nada acima</dd>
          </dl>
        </div>
      </section>
    </main>
  );
}
