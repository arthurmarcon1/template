import Image from "next/image";

/* MEDIA SLOT

   Um so componente para os dois estados da pagina:

   - sem src: desenha o placeholder marcado, com a proporcao real ja
     aplicada. E o estado atual, porque ainda nao existe foto real.
   - com src: renderiza next/image com width e height explicitos, que
     e o que o Next usa para calcular a proporcao intrinseca e evitar
     layout shift enquanto o arquivo carrega.

   O next.config.ts serve AVIF e WebP automaticamente a partir de
   qualquer original, entao nao e preciso converter na mao.

   alt e obrigatorio por tipo quando ha src. Nao existe caminho no
   componente que renderize uma imagem sem texto alternativo. */

type Base = {
  ratio: string;
  rotulo: string;
};

type ComImagem = Base & {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type SemImagem = Base & {
  src?: undefined;
};

export default function MediaSlot(props: ComImagem | SemImagem) {
  if (props.src) {
    return (
      <Image
        className="media-img"
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        sizes="(max-width: 767px) 100vw, 50vw"
      />
    );
  }

  return (
    <span className="slot-label">
      {props.rotulo}
      <br />
      {props.ratio.replace(" / ", ":")}
    </span>
  );
}
