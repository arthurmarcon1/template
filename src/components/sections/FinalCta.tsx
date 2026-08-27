import { site, CTA_PRIMARIO } from "@/lib/site";

/* CTA FINAL
   Familia de layout: bloco full-bleed de alto contraste.

   Este e o unico ponto da pagina onde o tema inverte, e ele segue
   invertido ate o fim no rodape. E uma troca deliberada, uma vez so,
   que e a excecao prevista na Secao 4.11. A pagina nao fica alternando.

   O rotulo do CTA e identico ao do heroi. Um rotulo por intencao,
   conforme a Secao 4.5. */

export default function FinalCta() {
  return (
    <section id="lista-de-espera" style={{ paddingBlock: "var(--section-y-lg)" }}>
      <div className="container">
        <h2
          className="h-display"
          style={{
            fontSize: "var(--text-d1)",
            maxWidth: "16ch",
            marginBottom: "var(--sp-6)",
          }}
        >
          Próxima turma da {site.produto}.
        </h2>

        <p
          style={{
            fontSize: "var(--fs-body-lg)",
            color: "var(--c-text-muted)",
            maxWidth: "46ch",
            marginBottom: "var(--sp-8)",
          }}
        >
          A lista de espera abre as vagas antes de qualquer divulgação. Entrar
          na lista não compromete você com nada.
        </p>

        <a
          className="btn btn-primary"
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          {CTA_PRIMARIO}
        </a>

        <p
          className="eyebrow-plain"
          style={{ marginTop: "var(--sp-5)", display: "block" }}
        >
          Conversa direta no WhatsApp com o {site.nome.split(" ")[0]}
        </p>
      </div>
    </section>
  );
}
