import { site } from "@/lib/site";
import MediaSlot from "@/components/MediaSlot";

/* QUEM E O UILIAN
   Familia de layout: split foto grande + coluna estreita de texto.
   Primeiro e unico split imagem mais texto da pagina, entao o teto de
   zigzag da Secao 4.7 nao chega perto de ser atingido.

   Credenciais em lista seca, sem icone e sem adjetivo.
   Tudo que nao veio do briefing esta entre [ ]. */

const credenciais = [
  `Cirurgião-dentista, ${site.cro}`,
  "Professor, [instituição]",
  "[especialização ou título]",
  "[X] anos de clínica",
  "Casos complexos e retratamentos",
  "Resina composta e laminados cerâmicos",
];

export default function About() {
  return (
    <section id="uilian" style={{ paddingBlock: "var(--section-y)" }}>
      <div className="container">
        <div className="about-grid">
          <div className="about-media">
            <div className="slot" style={{ aspectRatio: "4 / 5" }}>
              {/* O arquivo precisa existir em public/uilian/retrato.jpg.
                  Enquanto nao existir, o next/image devolve 404 e a
                  moldura fica vazia: o build NAO quebra.

                  Dimensoes reais do arquivo: 721x905, proporcao 0.7967.
                  A moldura e 4:5 (0.8000), entao o recorte e desprezivel.

                  O arquivo e PNG, nao JPEG. A extensao original dizia
                  .jpg mas os bytes eram PNG. Renomeado para nao mentir.
                  O Next converte para AVIF ou WebP na entrega de
                  qualquer forma, entao o peso servido nao sofre. */}
              <MediaSlot
                ratio="4 / 5"
                rotulo="[ retrato do Uilian ]"
                src="/uilian/retrato.png"
                width={721}
                height={905}
                alt="Uilian Machado de jaleco preto no consultório, inclinado sobre a bancada, anotando em um tablet com caneta digital."
              />
            </div>
          </div>

          <div className="about-text">
            <h2
              className="h-display"
              style={{
                fontSize: "var(--text-d2)",
                maxWidth: "14ch",
                marginBottom: "var(--sp-6)",
              }}
            >
              Quem é o {site.nome.split(" ")[0]}.
            </h2>

            <div style={{ color: "var(--c-text-muted)", maxWidth: "42ch" }}>
              <p style={{ marginBottom: "var(--sp-4)" }}>
                Dentista e professor no {site.estado}. Trabalha com casos
                complexos e retratamentos em resina composta e laminados
                cerâmicos, que é a parte da rotina que a maioria dos
                consultórios prefere encaminhar.
              </p>
              <p style={{ marginBottom: "var(--sp-4)" }}>
                [ parágrafo do Uilian: como ele chegou nos retratamentos e por
                que decidiu ensinar ]
              </p>
              <p>
                [ parágrafo do Uilian: o que ele espera de quem entra na
                mentoria ]
              </p>
            </div>

            <ul className="creds">
              {credenciais.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
