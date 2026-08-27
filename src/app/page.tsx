import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import AuthorityBand from "@/components/sections/AuthorityBand";
import Problem from "@/components/sections/Problem";
import Method from "@/components/sections/Method";
import CaseGallery from "@/components/sections/CaseGallery";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import SiteFooter from "@/components/sections/SiteFooter";

/* Landing ResinArt. Todas as secoes sao Server Components.
   Nenhum 'use client' na pagina: o movimento e CSS puro, o accordion
   e <details> nativo. Nada aqui depende de JavaScript para renderizar.

   Ordem das familias de layout, para conferir a trava de repeticao
   da Secao 4.7 (minimo 4 familias distintas, nenhuma repetida):
   1 split assimetrico / 2 faixa de numeros / 3 escada assimetrica
   4 linhas numeradas / 5 grid editorial / 6 split imagem e texto
   7 linha de citacoes / 8 accordion / 9 bloco full-bleed / 10 rodape
   Dez secoes, dez familias. */

export default function Page() {
  return (
    <>
      <Nav />

      <main>
        <Hero />
        <AuthorityBand />
        <Problem />
        <Method />
        <CaseGallery />
        <About />
        <Testimonials />
        <Faq />
      </main>

      {/* Troca de tema unica da pagina. CTA final e rodape formam um
          bloco escuro continuo ate o fim. Ver Secao 4.11. */}
      <div className="theme-ink">
        <FinalCta />
        <SiteFooter />
      </div>
    </>
  );
}
