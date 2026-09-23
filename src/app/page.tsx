import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsappFlutuante from "@/components/layout/WhatsappFlutuante";
import { site } from "@/lib/site";

/* Landing da F&M. As secoes entram em src/components/sections/, na
   ordem do docs/LANDING_FM.md. O main desconta a altura do header fixo. */

export default function Page() {
  return (
    <>
      <Header />
      <main id="conteudo" className="pt-(--header-h)">
        <div className="container-content section">
          <h1 className="text-h1">{site.nome}</h1>
          <p className="mt-4 max-w-text">{site.descricao}</p>
        </div>
      </main>
      <Footer />
      <WhatsappFlutuante />
    </>
  );
}
