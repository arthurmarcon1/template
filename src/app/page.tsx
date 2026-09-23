import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsappFlutuante from "@/components/layout/WhatsappFlutuante";
import Hero from "@/components/sections/Hero";
import Problema from "@/components/sections/Problema";
import ComoFunciona from "@/components/sections/ComoFunciona";
import Servicos from "@/components/sections/Servicos";
import Diferenciais from "@/components/sections/Diferenciais";

/* Landing da F&M. As secoes entram em src/components/sections/, na
   ordem do docs/LANDING_FM.md. O main desconta a altura do header fixo. */

export default function Page() {
  return (
    <>
      <Header />
      {/* tabIndex -1: o skip-link do layout aponta para ca e o foco
          precisa pousar no main, nao so rolar ate ele. */}
      <main id="conteudo" tabIndex={-1} className="pt-(--header-h) outline-none">
        <Hero />
        <Problema />
        <ComoFunciona />
        <Servicos />
        <Diferenciais />
      </main>
      <Footer />
      <WhatsappFlutuante />
    </>
  );
}
