import HeroBall from "@/components/ball/HeroBall";
import { hero } from "@/lib/conteudo";
import { site, whatsappUrl } from "@/lib/site";

/* Hero: texto a esquerda, bola a direita. No mobile a bola vem antes do
   texto e menor. data-hero liga o gancho do WhatsApp flutuante (ele so
   aparece quando esta secao sai da tela). */

export default function Hero() {
  return (
    <section
      data-hero
      aria-labelledby="hero-titulo"
      className="surface-dark overflow-hidden"
    >
      <div className="container-content grid min-h-[calc(100dvh-var(--header-h))] items-center gap-8 py-10 md:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div className="order-2 lg:order-1">
          <p className="eyebrow text-agua-400">{hero.eyebrow}</p>
          <h1 id="hero-titulo" className="mt-4 text-h1">
            {hero.titulo}
            <span className="block text-agua-400">{hero.destaque}</span>
          </h1>
          <p className="mt-6 max-w-text text-lead text-creme-50">
            {hero.subtitulo}
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {hero.ctaPrincipal}
            </a>
            <a href="#como-funciona" className="btn btn-text">
              {hero.ctaSecundario}
            </a>
          </div>
          <p className="eyebrow mt-12 text-neutro-400 lg:mt-16">
            {site.assinatura.join(" · ")}
          </p>
        </div>

        <div className="order-1 mx-auto w-[min(64vw,18rem)] sm:w-[min(50vw,22rem)] lg:order-2 lg:w-full lg:max-w-[34rem]">
          <HeroBall
            prioridade
            tamanhos="(min-width: 64rem) 34rem, (min-width: 36rem) 22rem, 64vw"
          />
        </div>
      </div>
    </section>
  );
}
