import Image from "next/image";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { site, secoes, whatsappUrl } from "@/lib/site";
import MobileMenu from "./MobileMenu";

/* Header fixo, fundo solido petroleo-900 (sem blur).
   lg+: logo, ancoras e WhatsApp.
   md a lg: logo, WhatsApp e menu.
   abaixo de md: logo e menu (o WhatsApp vira o botao flutuante). */

export default function Header() {
  return (
    <header className="surface-dark fixed inset-x-0 top-0 z-50 border-b border-petroleo-700">
      <div className="container-content flex h-(--header-h) items-center justify-between gap-6">
        <a href="#conteudo" className="shrink-0 rounded-md">
          {/* [CONFIRMAR: logo vetorial] PNG provisorio. */}
          <Image
            src={site.logo.src}
            width={48}
            height={48}
            alt={`${site.nome}, voltar ao início`}
            priority
          />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {secoes.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="nav-link">
                  {s.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary hidden md:inline-flex"
          >
            <WhatsappLogo size={20} weight="bold" aria-hidden />
            Falar no WhatsApp
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
