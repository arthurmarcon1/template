import { site, CTA_PRIMARIO } from "@/lib/site";

/* NAVEGACAO

   Barra fixa, fundo meio transparente puxado para o preto.
   Logotipo, grupo de links e CTA ficam cada um dentro de uma pilula
   escura, flutuando sobre a barra.

   A pilula nao e so estetica: sem ela, os links passam por cima do
   objeto ambar que sangra da hero e o contraste despenca. Com o fundo
   proprio, cada item tem contraste garantido independente do que
   estiver rolando por baixo. Numeros na resposta.

   O CTA usa o MESMO rotulo do heroi e do bloco final (Secao 4.5:
   um rotulo por intencao).

   Abaixo de 900px o grupo de links some e sobram logotipo e CTA. */

const links = [
  { href: "#metodo", label: "O método" },
  { href: "#casos", label: "Casos" },
  { href: "#uilian", label: "Quem é" },
  { href: "#faq", label: "Perguntas" },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#hero" className="nav-pill nav-logo">
          {site.produto}
        </a>

        <nav aria-label="Seções" className="nav-links">
          <ul className="nav-pill">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          className="btn btn-primary nav-cta"
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          {CTA_PRIMARIO}
        </a>
      </div>
    </header>
  );
}
