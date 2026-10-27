import Image from "next/image";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { ctaFinal } from "@/lib/conteudo";
import { whatsappUrl } from "@/lib/site";

/* CTA final com a foto da bola F&M na quadra verde (decorativa). A foto
   tem so 1024px de largura, entao nao cobre a secao inteira (ficaria
   ampliada e borrada): fica ancorada a direita, na altura da secao, e
   se dissolve no petroleo-900 pela esquerda (mask-image). Texto na
   metade esquerda. A foto nao pode ser espelhada (a marca na bola
   inverteria). No mobile, veu escuro por cima para o texto. */

export default function CtaFinal() {
  return (
    <section
      aria-labelledby="cta-titulo"
      className="section surface-dark relative isolate overflow-hidden md:flex md:min-h-[34rem] md:items-center"
    >
      <Image
        src={ctaFinal.foto}
        alt=""
        width={1024}
        height={560}
        sizes="(min-width: 48rem) 64rem, 100vw"
        className="absolute inset-y-0 right-0 -z-10 h-full w-auto max-w-none mask-[linear-gradient(to_right,transparent,#000_40%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-petroleo-900/70 md:hidden"
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
