/* PARALLAX DA GALERIA

   Server Component. Zero JavaScript.

   Motivo: dar profundidade a grade editorial sem mexer na composicao.
   As imagens deslizam devagar dentro de molduras que ficam paradas.

   Implementado com CSS scroll-driven animation (animation-timeline: view()).
   IntersectionObserver nao serviria aqui: ele dispara em cruzamentos de
   threshold, nao e continuo, entao nao consegue amarrar posicao a scroll.
   A timeline nativa faz exatamente isso e roda no compositor, fora da
   thread principal.

   O intervalo "cover 0% / cover 100%" e equivalente ponto a ponto ao
   start: "top bottom" / end: "bottom top" que o ScrollTrigger usava.

   Amplitude: -4% a +4%. Deslocamento maximo de 4% em qualquer direcao,
   8% de percurso total, dentro do teto pedido nas duas leituras.

   CLS zero: a moldura tem aspect-ratio fixo e overflow hidden, entao
   reserva o espaco na primeira pintura. O filho tem height 110% e
   top -5%, que cobre os dois extremos sem revelar borda vazia.

   Onde o navegador nao suporta animation-timeline, a regra inteira e
   ignorada e a moldura fica estatica com o conteudo centralizado. */

export default function ParallaxMedia({
  ratio,
  children,
}: {
  ratio: string;
  children: React.ReactNode;
}) {
  return (
    <div className="slot parallax-frame" style={{ aspectRatio: ratio }}>
      <div className="parallax-inner">{children}</div>
    </div>
  );
}
