import Image from "next/image";
import { site, CTA_PRIMARIO, CTA_SECUNDARIO } from "@/lib/site";

/* HERO

   Duas vozes na mesma frase:
     linha 1  grotesque bold  na cor de texto
     linha 2  italico light   em Bodoni, na cor muted

   Registro de conflito: a Secao 4.1 chama enfase de familia mista de
   amador e manda usar italico ou bold da MESMA familia. Aqui a mistura
   e o pedido explicito. Para voltar ao caminho da skill, trocar
   --font-display por --font-text na regra .hero-line-2 do globals.css.

   O objeto de estratificacao saiu. No lugar dele entra a foto, que
   sangra pela borda direita e dissolve na esquerda por mascara linear,
   para virar composicao em vez de retangulo colado ao lado do texto.

   A entrada continua em CSS puro, sem JavaScript.

   Trava da Secao 4.7 mantida: 4 elementos de texto, headline em 2
   linhas, subtexto de 20 palavras, CTA visivel sem rolagem. */

/* PLACEHOLDER: o arquivo precisa existir neste caminho.
   Enquanto nao existir, o next/image devolve 404, a moldura mostra o
   estado vazio e o build NAO quebra. */
const FOTO = "/uilian/hero-resinart.jpg";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-media" aria-hidden="true">
        {/* Brilho ambar sutil atras da borda esquerda da foto. Mantem o
            acento da paleta na primeira dobra e suaviza a dissolvencia. */}
        <div className="hero-glow" />
        <div className="hero-photo">
          {/* fill em vez de width/height: o arquivo ainda nao existe e eu
              nao conheco as dimensoes reais. Com fill o container reserva
              o espaco, entao nao ha layout shift seja qual for o tamanho. */}
          <Image
            src={FOTO}
            alt=""
            fill
            priority
            sizes="(max-width: 767px) 100vw, 52vw"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
        </div>
      </div>

      {/* Vela entre a foto e o texto.

          Com foto isto pesa ainda mais que com o objeto ambar: a imagem
          tem areas quase brancas (bancada, pele), e texto por cima
          reprovaria AA com folga. A vela e opaca sobre toda a coluna de
          texto e so some depois que o texto acaba, entao o texto sempre
          assenta no fundo limpo. */}
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
