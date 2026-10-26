import Image from "next/image";
import { faixaFoto } from "@/lib/conteudo";

/* Faixa de foto de ponta a ponta, com uma frase por cima. A foto e
   decorativa (alt vazio) e e de banco de imagem (Unsplash), nao de um
   torneio da F&M. Degrade petroleo-900 de baixo para cima garante o
   contraste do texto. Parallax leve ao rolar (.parallax em globals.css),
   desligado com prefers-reduced-motion. */

export default function FaixaFoto() {
  return (
    <section
      aria-label={faixaFoto.frase}
      className="surface-dark relative isolate flex min-h-[clamp(20rem,45vw,34rem)] items-end overflow-hidden"
    >
      <Image
        src={faixaFoto.foto}
        alt=""
        fill
        sizes="100vw"
        className="parallax -z-10 object-cover object-[50%_35%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-petroleo-900 via-petroleo-900/55 to-petroleo-900/10"
      />
      <div className="container-content pb-12 md:pb-16">
        <p className="revelar max-w-[18ch] font-display text-h1 leading-[0.95] font-extrabold uppercase">
          {faixaFoto.frase}
        </p>
      </div>
    </section>
  );
}
