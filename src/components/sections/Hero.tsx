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

   O objeto visual sangra: ultrapassa a borda direita do viewport, passa
   do topo e do rodape da secao, e se dissolve por mascara radial. Fica
   atras do texto e nao recebe eventos de ponteiro.

   Trava da Secao 4.7 mantida: 4 elementos de texto, headline em 2
   linhas, subtexto de 20 palavras, CTA visivel sem rolagem. */

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bleed" aria-hidden="true">
        <HeroObject />
      </div>

      {/* Vela entre a animacao e o texto.

          Nao e enfeite: o ponto mais quente da estratificacao chega a
          #D4B275, e ali o subtexto muted daria 1.71:1. Uma vela suave
          nao resolve, e chega a piorar: entre 20% e 40% a cor
          intermediaria encosta na luminancia do texto e o contraste cai
          para 1.13:1. Por isso a vela e opaca sobre toda a coluna de
          texto e so desaparece depois que o texto acaba.

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

/* ---------------------------------------------------------------------------
   ESTRATIFICACAO

   Sete incrementos translucidos se acumulando, que e o material que ele
   ensina virando o proprio movimento da animacao.

   Formas: paths organicos gerados com raio irregular e suavizados em
   bezier. Nenhuma e circulo perfeito e nenhuma esta alinhada com a
   anterior: cada uma tem deslocamento proprio de ate 4% do raio.

   Desempenho:
   - So opacity e transform sao animados. O blur e ESTATICO, definido no
     filtro SVG. Animar filtro forca recomposicao a cada frame.
   - Sao 7 filtros pre-definidos, um por camada, com stdDeviation
     decrescente: a de baixo mais difusa, a de cima mais nitida. E esse
     degrade que da a leitura de profundidade.
   - Sem three.js e sem canvas. Zero JavaScript.

   O fundo continua sendo o gradiente radial que ja existia.
   --------------------------------------------------------------------------- */

const camadas = [
  { d: "M395.0,339.7C394.5,360.2 383.4,384.3 370.0,399.9C356.6,415.5 334.5,429.9 314.8,433.4C295.0,436.8 269.0,430.8 251.6,420.5C234.2,410.2 217.6,390.7 210.2,371.7C202.8,352.8 200.1,325.0 207.2,306.6C214.3,288.2 235.2,270.7 253.0,261.3C270.8,252.0 294.0,248.1 313.9,250.7C333.9,253.4 359.3,262.3 372.8,277.1C386.3,291.9 395.4,319.2 395.0,339.7Z", blur: 14, o: 0.16 },
  { d: "M434.6,340.7C434.3,366.6 412.2,396.6 393.8,417.8C375.4,439.1 350.6,462.1 324.4,468.2C298.1,474.2 261.0,467.8 236.4,454.1C211.8,440.5 186.0,412.5 176.8,386.3C167.5,360.0 171.2,323.3 181.1,296.7C191.0,270.1 212.5,238.6 236.1,226.7C259.6,214.8 295.7,219.4 322.3,225.3C348.8,231.2 376.7,243.0 395.4,262.2C414.1,281.5 434.9,314.8 434.6,340.7Z", blur: 12, o: 0.15 },
  { d: "M449.8,334.2C448.7,366.2 432.5,402.5 412.1,427.5C391.8,452.6 358.9,477.8 327.5,484.6C296.0,491.5 253.6,484.3 223.4,468.6C193.1,452.9 157.8,422.1 145.9,390.6C134.0,359.2 139.8,312.9 152.0,280.0C164.3,247.1 190.4,208.4 219.5,193.2C248.6,177.9 293.5,181.4 326.6,188.6C359.7,195.7 397.7,211.6 418.2,235.8C438.7,260.1 450.8,302.3 449.8,334.2Z", blur: 10.5, o: 0.14 },
  { d: "M500.1,338.2C500.8,380.7 484.4,436.9 456.9,467.5C429.4,498.1 375.8,517.3 335.1,521.8C294.4,526.2 248.4,513.6 212.7,494.0C177.1,474.4 137.2,441.5 121.2,404.2C105.2,367.0 101.1,306.7 116.8,270.5C132.4,234.2 178.9,205.8 215.2,186.6C251.6,167.5 295.3,151.3 334.9,155.5C374.5,159.8 425.1,181.9 452.7,212.3C480.2,242.7 499.4,295.6 500.1,338.2Z", blur: 8.5, o: 0.13 },
  { d: "M521.7,343.5C520.9,387.4 482.0,438.4 450.5,473.4C419.0,508.4 377.3,542.8 332.7,553.6C288.2,564.3 226.0,559.9 183.3,538.1C140.7,516.4 93.7,468.6 76.8,423.2C59.9,377.8 64.0,311.2 81.9,265.7C99.7,220.1 141.8,173.0 183.9,149.8C225.9,126.6 288.8,116.4 334.0,126.4C379.2,136.4 423.9,173.5 455.2,209.7C486.5,245.9 522.5,299.5 521.7,343.5Z", blur: 6.5, o: 0.12 },
  { d: "M561.2,341.0C558.5,393.4 511.0,448.3 474.3,491.5C437.5,534.7 391.5,588.9 340.7,600.2C289.8,611.4 218.2,586.9 169.3,558.8C120.4,530.6 67.2,482.4 47.2,431.2C27.3,380.0 28.7,302.4 49.4,251.6C70.0,200.8 123.2,150.5 171.1,126.4C218.9,102.2 283.1,98.3 336.3,106.7C389.5,115.2 452.9,138.0 490.4,177.1C527.9,216.1 563.9,288.6 561.2,341.0Z", blur: 5, o: 0.1 },
  { d: "M584.4,342.8C587.0,401.2 549.5,476.2 509.4,524.4C469.3,572.6 401.8,624.6 344.0,631.9C286.2,639.3 213.7,601.2 162.8,568.4C111.9,535.7 62.4,489.7 38.5,435.5C14.6,381.3 1.9,301.9 19.4,243.2C36.9,184.6 90.0,110.9 143.3,83.6C196.7,56.2 281.1,64.0 339.5,79.1C397.9,94.3 452.9,130.5 493.7,174.4C534.5,218.4 581.8,284.5 584.4,342.8Z", blur: 3.5, o: 0.09 }
];

function HeroObject() {
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* Gradientes de fundo, inalterados */}
        <radialGradient id="tk-core" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#C08B4A" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#C08B4A" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#C08B4A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tk-shell" cx="50%" cy="45%" r="62%">
          <stop offset="0%" stopColor="#F5F3EF" stopOpacity="0.14" />
          <stop offset="70%" stopColor="#F5F3EF" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#F5F3EF" stopOpacity="0" />
        </radialGradient>

        {/* Preenchimento das camadas: ambar quente ao centro, transparente
            na borda. Um gradiente so, reaproveitado pelas sete. */}
        <radialGradient id="tk-inc" cx="50%" cy="46%" r="58%">
          <stop offset="0%" stopColor="#C89A5B" stopOpacity="1" />
          <stop offset="58%" stopColor="#C89A5B" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C89A5B" stopOpacity="0" />
        </radialGradient>

        {camadas.map((c, i) => (
          <filter
            key={i}
            id={`tk-b${i + 1}`}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation={c.blur} />
          </filter>
        ))}
      </defs>

      {/* Fundo */}
      <circle cx="300" cy="340" r="300" fill="url(#tk-shell)" />
      <circle cx="300" cy="330" r="210" fill="url(#tk-core)" />

      {/* Grupo estratificado. A rotacao lenta vive aqui, com origem no
          centro do viewBox. mix-blend-mode: screen faz as sobreposicoes
          clarearem como material translucido de verdade. */}
      <g className="strat">
        {camadas.map((c, i) => (
          <g
            key={i}
            className="strat-layer"
            style={
              {
                "--o": c.o,
                animationName: `tk-strat-${i + 1}`,
              } as React.CSSProperties
            }
          >
            <path d={c.d} fill="url(#tk-inc)" filter={`url(#tk-b${i + 1})`} />
            {/* Fio de luz contornando parcialmente a camada mais recente.
                Some quando a proxima entra. */}
            <path
              className="strat-edge"
              d={c.d}
              fill="none"
              stroke="#E8C79A"
              strokeWidth="1"
              strokeDasharray="150 90"
              strokeLinecap="round"
              style={
                { animationName: `tk-edge-${i + 1}` } as React.CSSProperties
              }
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
