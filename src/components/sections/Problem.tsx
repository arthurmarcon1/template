/* O PROBLEMA
   Familia de layout: escada assimetrica. Os tres blocos tem larguras e
   deslocamentos diferentes, nao sao tres cards iguais.
   Tres cards iguais e um dos AI tells listados na Secao 9. */

const blocos = [
  {
    n: "01",
    titulo: "O curso mostra o caso pronto",
    texto:
      "Você vê o antes e o depois. As duzentas microdecisões entre um e outro, que são onde o caso se ganha ou se perde, ficam de fora.",
    span: 7,
    offset: 0,
  },
  {
    n: "02",
    titulo: "A mão aprende repetindo, não assistindo",
    texto:
      "Estratificação é habilidade motora. Assistir alguém executar bem não transfere o gesto para a sua mão.",
    span: 5,
    offset: 1,
  },
  {
    n: "03",
    titulo: "Sem devolutiva, o erro vira hábito",
    texto:
      "Você termina o caso, acha que ficou bom e segue. Sem alguém olhando o que você fez, o mesmo desvio se repete por anos.",
    span: 6,
    offset: 0,
  },
];

export default function Problem() {
  return (
    <section id="problema" style={{ paddingBlock: "var(--section-y)" }}>
      <div className="container">
        <h2
          className="h-display"
          style={{
            fontSize: "var(--text-d2)",
            maxWidth: "18ch",
            marginBottom: "var(--sp-9)",
          }}
        >
          Por que o curso não chegou no seu consultório.
        </h2>

        <div className="problem-stack">
          {blocos.map((b) => (
            <article
              key={b.n}
              className="problem-item"
              data-span={b.span}
              data-offset={b.offset}
            >
              <span className="eyebrow-plain">{b.n}</span>
              <h3
                className="h-display"
                style={{
                  fontSize: "var(--text-d3)",
                  marginBlock: "var(--sp-3) var(--sp-4)",
                }}
              >
                {b.titulo}
              </h3>
              <p style={{ color: "var(--c-text-muted)", maxWidth: "48ch" }}>
                {b.texto}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
