import { site } from "@/lib/site";

/* FOOTER
   Continua no tema escuro herdado do CTA final, para que a troca de tema
   aconteca uma vez so na pagina.

   O numero de CRO e obrigatorio em material de divulgacao odontologica
   e esta como placeholder ate o Uilian confirmar. */

export default function SiteFooter() {
  return (
    <footer style={{ paddingBottom: "var(--section-y)" }}>
      <div className="container">
        <hr className="rule" style={{ marginBottom: "var(--sp-7)" }} />

        <div className="footer-grid">
          <div>
            <p
              className="h-display"
              style={{ fontSize: "var(--text-d3)", marginBottom: "var(--sp-2)" }}
            >
              {site.nome}
            </p>
            <p className="eyebrow-plain" style={{ display: "block" }}>
              {site.papel} / {site.cro}
            </p>
          </div>

          <nav aria-label="Contato">
            <ul className="footer-links">
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram {site.instagram.handle}
                </a>
              </li>
              <li>
                <span style={{ color: "var(--c-text-muted)" }}>
                  {site.cidade}, {site.estado}
                </span>
              </li>
            </ul>
          </nav>
        </div>

        <p
          className="eyebrow-plain"
          style={{ display: "block", marginTop: "var(--sp-8)" }}
        >
          {site.produto} / {site.nome} / {site.cro}
        </p>
      </div>
    </footer>
  );
}
