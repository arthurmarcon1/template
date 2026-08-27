/* PROVA SOCIAL
   Familia de layout: linha de citacoes com regua, sem card.

   Nenhum depoimento foi escrito por mim. Os corpos estao marcados como
   pendentes de autorizacao, e a atribuicao usa apenas iniciais e cidade,
   conforme pedido. Substituir pelo texto real so depois do aceite por
   escrito de cada aluno.

   Teto de 3 linhas por citacao (Secao 4.10) vale quando o texto real
   entrar. Aspas tipograficas de verdade, nunca ASCII. */

const depoimentos = [
  { iniciais: "M. R.", cidade: "[cidade], RS" },
  { iniciais: "A. L. S.", cidade: "[cidade], SC" },
  { iniciais: "J. P.", cidade: "[cidade], PR" },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" style={{ paddingBlock: "var(--section-y)" }}>
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "var(--sp-5)" }}>
          Quem já passou pela mentoria
        </p>
        <hr className="rule" style={{ marginBottom: "var(--sp-8)" }} />

        <div className="quotes">
          {depoimentos.map((d) => (
            <figure key={d.iniciais} className="quote">
              <blockquote
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-d3)",
                  lineHeight: "var(--lh-tight)",
                  letterSpacing: "var(--tr-display)",
                  color: "var(--c-text-muted)",
                }}
              >
                “[ depoimento real, aguardando autorização ]”
              </blockquote>
              <figcaption
                style={{
                  marginTop: "var(--sp-5)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--fs-body-sm)",
                }}
              >
                {d.iniciais}
                <span style={{ color: "var(--c-text-muted)" }}>
                  {" / "}
                  {d.cidade}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
