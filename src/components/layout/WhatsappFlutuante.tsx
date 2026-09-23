import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { whatsappUrl } from "@/lib/site";

/* Botao flutuante de WhatsApp, so abaixo de md (no md+ o header ja
   mostra o botao). Quadrado com raio de 8px, o maximo da marca.
   Fundo petroleo-900 com borda bege-200: aparece tanto sobre as secoes
   claras quanto sobre as escuras. */

export default function WhatsappFlutuante() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="whatsapp-flutuante md:hidden"
    >
      <WhatsappLogo size={28} weight="bold" aria-hidden />
    </a>
  );
}
