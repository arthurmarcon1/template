import Image from "next/image";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { ctaFinal } from "@/lib/conteudo";
import { whatsappUrl } from "@/lib/site";

/* CTA final sobre a foto da bola F&M na quadra verde (decorativa). A
   bola fica a direita e o texto na metade esquerda, sobre um degrade
   petroleo-900 que garante o contraste. A foto nao pode ser espelhada
   (a marca na bola inverteria). No mobile, veu uniforme e texto por
   cima. */

export default function CtaFinal() {
  return (
    <section
      aria-labelledby="cta-titulo"
      className="section surface-dark relative isolate overflow-hidden md:flex md:min-h-[34rem] md:items-center"
    >
      <Image
        src={ctaFinal.foto}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[70%_50%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-petroleo-900/75 md:bg-transparent md:bg-linear-to-l md:from-petroleo-900/10 md:via-petroleo-900/65 md:to-petroleo-900/95"
      />
      <div className="container-content grid md:grid-cols-2">
        <div>
          <h2 id="cta-titulo" className="revelar max-w-[16ch] text-h1">
            {ctaFinal.titulo}
          </h2>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-8"
          >
            <WhatsappLogo size={20} weight="bold" aria-hidden />
            {ctaFinal.botao}
          </a>
        </div>
      </div>
    </section>
  );
}
