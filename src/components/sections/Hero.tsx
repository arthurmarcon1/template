import Image from "next/image";
import { site, CTA_PRIMARIO, CTA_SECUNDARIO } from "@/lib/site";

/* HERO

   Duas vozes na mesma frase:
     linha 1  grotesque bold  na cor de texto
     linha 2  italico light   em Bodoni, na cor muted

   Registro de conflito: a Secao 4.1 chama enfase de familia mista de
   amador e manda usar italico ou bold da MESMA familia. Aqui a mistura
   e o pedido explicito e e o que produz o contraste editorial. Para
   voltar ao caminho da skill, trocar --font-display por --font-text na
   regra .hero-line-2 do globals.css.

   A foto (capa do material, public/hero/capa-resinart.png) sangra:
   ultrapassa a borda direita do viewport, passa do topo e do rodape da
   secao, e se dissolve por mascara linear no rodape. Fica atras do
   texto e nao recebe eventos de ponteiro.

   Trava da Secao 4.7 mantida: 4 elementos de texto, headline em 2
   linhas, subtexto de 20 palavras, CTA visivel sem rolagem. */

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bleed" aria-hidden="true">
        <Image
          src="/hero/capa-resinart.png"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 55vw, 34vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Vela entre a foto e o texto.

          Nao e enfeite: a foto tem tons quentes que, atras do subtexto
          muted, derrubariam o contraste para perto de 1:1 em partes.
          Uma vela suave nao resolve. Por isso a vela e opaca sobre toda
          a coluna de texto e so desaparece depois que o texto acaba.

          Com ela, o texto sempre assenta no fundo limpo: titulo 17.9:1,
          subtexto 5.8:1. Garantido por construcao, nao por sorte. */}
      <div className="hero-scrim" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow" data-hero="eyebrow">
            {site.nome} / {site.papel} / {site.estado}
          </p>

          <h1 className="hero-title">
            <span className="hero-line hero-line-1">
              <span data-hero-line>Resina composta</span>
            </span>
            <span className="hero-line hero-line-2">
              <span data-hero-line>para os casos que você encaminha.</span>
            </span>
          </h1>

          <p className="hero-sub" data-hero="sub">
            Você já fez curso. O caso senta na cadeira e a mão não responde
            igual. A {site.produto} fecha essa distância.
          </p>

          <div className="hero-actions" data-hero="cta">
            <a
              className="btn btn-primary"
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CTA_PRIMARIO}
            </a>
            <a className="btn btn-secondary" href="#metodo">
              {CTA_SECUNDARIO}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
