import Image from "next/image";
import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { site, whatsappUrl } from "@/lib/site";

/* Footer em petroleo-900: logo, assinatura, contatos e credito.
   Abaixo de md ganha respiro no fim para o botao flutuante do
   WhatsApp nao cobrir o credito. */

export default function Footer() {
  return (
    <footer className="surface-dark border-t border-petroleo-700 pb-24 md:pb-0">
      <div className="container-content grid gap-10 py-16 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          {/* [CONFIRMAR: logo vetorial] PNG provisorio. */}
          <Image
            src={site.logo.src}
            width={80}
            height={80}
            alt={site.nome}
          />
          <p className="eyebrow mt-6 text-agua-400">
            {site.assinatura.join(" · ")}
          </p>
        </div>

        <address className="not-italic">
          <ul className="space-y-3">
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3"
              >
                <WhatsappLogo size={22} aria-hidden />
                <span>
                  <span className="sr-only">WhatsApp: </span>
                  {site.whatsapp.exibicao}
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3"
              >
                <InstagramLogo size={22} aria-hidden />
                <span>
                  <span className="sr-only">Instagram: </span>
                  {site.instagram.handle}
                </span>
              </a>
            </li>
            <li className="text-neutro-400">{site.regiao}</li>
          </ul>
        </address>
      </div>

      <div className="border-t border-petroleo-700">
        <div className="container-content flex flex-col gap-2 py-6 text-small text-neutro-400 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nome}
          </p>
          <p>Site por 3eTec</p>
        </div>
      </div>
    </footer>
  );
}
