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

   A imagem (public/hero/caderno-resinart.png) sangra pela borda direita
   do viewport e se dissolve na esquerda por mascara linear, para nao
   terminar em corte reto perto do texto. Fica atras do texto, com a
   vela de contraste entre as duas camadas, e nao recebe eventos de
   ponteiro.

   Trava da Secao 4.7 mantida: 4 elementos de texto, headline em 2
   linhas, subtexto de 20 palavras, CTA visivel sem rolagem. */

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bleed">
        {/* Imagem com conteudo, nao decoracao: a capa traz o nome da
            mentoria. Por isso tem alt de verdade e nao e aria-hidden.

            object-position: center e NAO center right. Medi a imagem
            coluna a coluna: o caderno ocupa de 0% a 76% da largura e a
            faixa de 80% a 100% e mesa escura (luminancia 0.006).
            Cortar pela direita descartaria justamente o logotipo, que
            vive entre 16% e 40%.

            loading eager + fetchPriority high no lugar de priority, que
            o Next 16 deprecou (node_modules/next/dist/docs, image.md). */}
        <Image
          src="/hero/caderno-resinart.png"
          alt="Caderno da mentoria ResinArt sobre uma mesa de madeira, com caneta dourada ao lado. A capa traz o nome ResinArt e uma imagem de arcada dentária."
          fill
          loading="eager"
          fetchPriority="high"
          /* sizes em pixels absolutos, e nao em vw, de proposito.

             Com object-fit: cover num container mais alto que a
             proporcao da imagem, o navegador escala pela ALTURA. A
             largura renderizada nao tem relacao com a largura da caixa:
             em 1440x900 a caixa tem 605px mas a imagem e desenhada com
             1599px. Declarar "46vw" fazia o Next servir 768px e o
             navegador ampliar 2.08x, e era essa a falta de resolucao,
             nao o arquivo de origem. */
          sizes="(max-width: 767px) 1280px, 1600px"
          style={{ objectFit: "cover", objectPosition: "center" }}
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
