import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { ctaFinal } from "@/lib/conteudo";
import { whatsappUrl } from "@/lib/site";

/* CTA final em petroleo-900 com a bola estatica menor. So a imagem: o
   three.js fica restrito ao hero. Mobile: bola acima, centralizada. */

export default function CtaFinal() {
  return (
    <section
      aria-labelledby="cta-titulo"
      className="section surface-dark overflow-hidden"
    >
      <div className="container-content grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
        {/* eslint-disable-next-line @next/next/no-img-element -- mesmo
            WebP pronto do hero (scripts/ball-static.mjs) */}
        <img
          src="/bola/ball-static-600.webp"
          width={600}
          height={600}
          alt=""
          loading="lazy"
          decoding="async"
          className="mx-auto w-40 md:w-56 lg:w-64"
        />
        <div>
          <h2 id="cta-titulo" className="max-w-[16ch] text-h1">
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
