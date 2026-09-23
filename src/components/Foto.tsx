import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

/* Foto com proporcao fixa.

   Se o arquivo existir em public/ (ex. /fotos/padel.webp), renderiza
   next/image preenchendo a moldura (WebP/AVIF e tamanhos certos, lazy
   por padrao). Se ainda nao existir, desenha um placeholder visivel com
   o caminho esperado, no mesmo tamanho: nada salta quando a foto chegar.
   A checagem roda no build (Server Component), entao basta colocar o
   arquivo na pasta e gerar de novo.

   alt e obrigatorio: vale para a foto real e para o placeholder. */

export default function Foto({
  src,
  alt,
  proporcao,
  sizes,
  className = "",
  prioridade = false,
}: {
  src: string;
  alt: string;
  proporcao: `${number}/${number}`;
  sizes: string;
  className?: string;
  prioridade?: boolean;
}) {
  const existe = existsSync(join(process.cwd(), "public", src));

  return (
    <div
      className={`relative overflow-hidden rounded-md ${className}`}
      style={{ aspectRatio: proporcao }}
    >
      {existe ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={prioridade}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="foto-vazia absolute inset-0 grid place-items-center p-4 text-center"
        >
          <span className="text-small">
            [CONFIRMAR: foto]
            <br />
            <code>{src}</code>
          </span>
        </div>
      )}
    </div>
  );
}
