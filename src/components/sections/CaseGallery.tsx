import ParallaxMedia from "@/components/motion/ParallaxMedia";
import MediaSlot from "@/components/MediaSlot";
import VideoTile from "@/components/motion/VideoTile";

/* GALERIA DE CASOS
   Familia de layout: grid editorial assimetrico.

   ==========================================================================
   ATENCAO, CONFORMIDADE CRO / CFO

   Foto e video clinico em material de divulgacao nao sao livres. Antes de
   publicar qualquer midia real desta secao, confirmar com o CRO-RS:

   1. Consentimento informado por escrito e especifico para divulgacao,
      assinado pelo paciente e arquivado. Consentimento para tratamento
      nao cobre publicacao.
   2. O Codigo de Etica Odontologica restringe a divulgacao de imagens
      de antes e depois. Verificar a redacao vigente antes de montar
      qualquer par comparativo.
   3. Sem identificacao do paciente e sem promessa de resultado, explicita
      ou sugerida pela composicao das midias.
   4. Numero de CRO visivel no material.

   NENHUM dos quatro videos abaixo teve o conteudo revisado. Nao ha
   decodificador de video nesta maquina, entao eles entraram pelos
   metadados do container, sem inspecao de imagem. Conferir antes de
   qualquer deploy.
   ========================================================================== */

type Caso = {
  id: string;
  ratio: string;
  label: string;
  span: number;
  video?: string;
};

const casos: Caso[] = [
  { id: "caso-01", ratio: "3 / 2", label: "[ caso 01 ]", span: 7, video: "/video/caso-01.mp4" },
  { id: "caso-02", ratio: "4 / 5", label: "[ caso 02 ]", span: 5, video: "/video/caso-02.mp4" },
  { id: "caso-03", ratio: "4 / 5", label: "[ caso 03 ]", span: 4, video: "/video/caso-03.mp4" },
  { id: "caso-04", ratio: "3 / 2", label: "[ caso 04 ]", span: 8, video: "/video/caso-04.mp4" },
  { id: "caso-05", ratio: "3 / 2", label: "[ caso 05 ]", span: 12 },
];

export default function CaseGallery() {
  return (
    <section id="casos" style={{ paddingBlock: "var(--section-y)" }}>
      <div className="container">
        <h2
          className="h-display"
          style={{
            fontSize: "var(--text-d2)",
            maxWidth: "20ch",
            marginBottom: "var(--sp-5)",
          }}
        >
          Casos que chegaram encaminhados.
        </h2>
        <p
          style={{
            color: "var(--c-text-muted)",
            maxWidth: "52ch",
            marginBottom: "var(--sp-9)",
          }}
        >
          [ nota curta sobre o que cada caso demonstra, escrita pelo Uilian ]
        </p>

        <div className="gallery">
          {casos.map((c) => (
            <figure key={c.id} className="gallery-item" data-span={c.span}>
              <ParallaxMedia ratio={c.ratio}>
                {c.video ? (
                  <VideoTile
                    src={c.video}
                    label={`Vídeo do ${c.label.replace(/[[\]]/g, "").trim()}. Conteúdo ainda não revisado para conformidade CRO.`}
                  />
                ) : (
                  /* Quando a foto real chegar, passar src, width, height e
                     alt. O alt e obrigatorio e nao pode ser "foto de caso":
                     descreva o que se ve, sem prometer resultado. */
                  <MediaSlot ratio={c.ratio} rotulo={c.label} />
                )}
              </ParallaxMedia>
              <figcaption
                className="eyebrow-plain"
                style={{ marginTop: "var(--sp-3)", display: "block" }}
              >
                [ descrição técnica do caso ]
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
