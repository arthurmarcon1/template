import PillarsMotion from "@/components/motion/PillarsMotion";
import ParallaxMedia from "@/components/motion/ParallaxMedia";
import VideoTile from "@/components/motion/VideoTile";

/* O METODO RESINART
   Familia de layout: linhas numeradas com ordinal grande.
   Eyebrow usado aqui. Orcamento da Secao 4.7: max ceil(10/3) = 4 na pagina.
   Uso real: heroi, este e prova social. Tres no total.

   Os nomes e as descricoes dos modulos sao placeholders. Nao invento
   carga horaria, sequencia nem promessa de resultado. Uilian preenche. */

const pilares = [
  { n: "01", nome: "[ nome do módulo 01 ]", desc: "[ o que o dentista sai sabendo executar ]" },
  { n: "02", nome: "[ nome do módulo 02 ]", desc: "[ o que o dentista sai sabendo executar ]" },
  { n: "03", nome: "[ nome do módulo 03 ]", desc: "[ o que o dentista sai sabendo executar ]" },
  { n: "04", nome: "[ nome do módulo 04 ]", desc: "[ o que o dentista sai sabendo executar ]" },
  { n: "05", nome: "[ nome do módulo 05 ]", desc: "[ o que o dentista sai sabendo executar ]" },
];

export default function Method() {
  return (
    <section id="metodo" style={{ paddingBlock: "var(--section-y)" }}>
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "var(--sp-5)" }}>
          O método ResinArt
        </p>
        <h2
          className="h-display"
          style={{
            fontSize: "var(--text-d2)",
            maxWidth: "20ch",
            marginBottom: "var(--sp-9)",
          }}
        >
          Cinco etapas, na ordem em que a mão aprende.
        </h2>

        <PillarsMotion>
          <ol className="pillars">
          {pilares.map((p) => (
            <li key={p.n} className="pillar" data-pilar>
              <span className="pillar-ord h-display" aria-hidden="true">
                {p.n}
              </span>
              <div className="pillar-body">
                <h3
                  className="h-display"
                  style={{ fontSize: "var(--text-d3)" }}
                >
                  <span className="sr-only">Etapa {p.n}. </span>
                  {p.nome}
                </h3>
                <p
                  style={{
                    color: "var(--c-text-muted)",
                    maxWidth: "52ch",
                    marginTop: "var(--sp-3)",
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </li>
          ))}
          </ol>
        </PillarsMotion>

        {/* Gravacoes de tela da plataforma do curso. Ainda sem legenda real
            do Uilian sobre o que cada uma mostra. */}
        <div className="metodo-videos">
          <figure>
            <ParallaxMedia ratio="1170 / 1902">
              <VideoTile
                src="/video/metodo-tela-01.mp4"
                label="Gravação de tela da plataforma do curso."
              />
            </ParallaxMedia>
            <figcaption
              className="eyebrow-plain"
              style={{ marginTop: "var(--sp-3)", display: "block" }}
            >
              [ o que esta tela mostra ]
            </figcaption>
          </figure>
          <figure>
            <ParallaxMedia ratio="1170 / 2026">
              <VideoTile
                src="/video/metodo-tela-02.mp4"
                label="Gravação de tela da plataforma do curso."
              />
            </ParallaxMedia>
            <figcaption
              className="eyebrow-plain"
              style={{ marginTop: "var(--sp-3)", display: "block" }}
            >
              [ o que esta tela mostra ]
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
