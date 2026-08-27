/* FAQ
   Familia de layout: accordion.
   Sem biblioteca externa. Usa <details> e <summary> nativos, entao
   funciona sem JavaScript, e acessivel por padrao e continua sendo
   Server Component. Nenhum 'use client' necessario.

   Respostas factuais so onde o briefing sustenta. O resto esta entre [ ].
   Sem promessa de faturamento e sem garantia de resultado. */

const perguntas = [
  {
    q: "Para quem é a ResinArt?",
    a: "Para dentista clínico que quer resolver na própria cadeira os casos de resina composta que hoje encaminha. Funciona tanto para quem saiu da faculdade há pouco quanto para quem já tem alguns anos de consultório e travou num teto técnico.",
  },
  {
    q: "Preciso de quanto tempo de clínica para acompanhar?",
    a: "Não existe tempo mínimo de formado. O que pesa é você estar atendendo e ter casos para levar. Quem não está clinicando não tem onde aplicar, e a mentoria depende disso.",
  },
  {
    q: "Como funcionam os encontros?",
    a: "[ formato, frequência, duração e se é online, presencial ou híbrido ]",
  },
  {
    q: "Qual é o investimento?",
    a: "[ valor, formas de pagamento e o que está incluso ]",
  },
  {
    q: "Quando começa a próxima turma?",
    a: "[ data de início, prazo de inscrição e número de vagas ]",
  },
  {
    q: "Já fiz outros cursos e não consegui aplicar. Por que aqui seria diferente?",
    a: "Essa é a objeção mais comum e ela é justa. A diferença que a mentoria propõe é acompanhamento sobre caso seu, não demonstração sobre caso do professor. Se ninguém olha o que você executou, o desvio se repete. Dito isso, o resultado depende de você levar caso e executar entre os encontros.",
  },
];

export default function Faq() {
  return (
    <section id="faq" style={{ paddingBlock: "var(--section-y)" }}>
      <div className="container">
        <h2
          className="h-display"
          style={{
            fontSize: "var(--text-d2)",
            maxWidth: "22ch",
            marginBottom: "var(--sp-8)",
          }}
        >
          O que os colegas perguntam antes de entrar.
        </h2>

        <div className="faq">
          {perguntas.map((p) => (
            <details key={p.q} className="faq-item">
              <summary className="faq-q">
                <span>{p.q}</span>
                <span className="faq-mark" aria-hidden="true" />
              </summary>
              <div className="faq-a">
                <p style={{ color: "var(--c-text-muted)", maxWidth: "62ch" }}>
                  {p.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
