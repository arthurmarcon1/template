/* Dados centrais da F&M Eventos Esportivos.
   Tudo marcado [CONFIRMAR] precisa de dado real antes de publicar.
   Nenhum numero, nome ou depoimento foi inventado. */

export const site = {
  nome: "F&M Eventos Esportivos",
  descricao:
    "A F&M organiza torneios de Padel e Beach Tennis para clubes, das inscrições à premiação.",
  assinatura: ["Organização", "Competição", "Experiência"],
  frase: "Seu clube, grandes torneios. Zero estresse.",
  modalidades: ["Padel", "Beach Tennis"],

  instagram: {
    handle: "@fmeventosesportivos",
    url: "https://instagram.com/fmeventosesportivos",
  },
  responsaveis: [
    { handle: "@edufriedrich_", url: "https://instagram.com/edufriedrich_" },
    { handle: "@joao.maneck", url: "https://instagram.com/joao.maneck" },
  ],

  /* [CONFIRMAR] Numero tirado dos posts do Instagram, ainda nao validado
     com a F&M. Unico lugar do site onde o WhatsApp e definido.
     digitos: formato do wa.me (pais + DDD + numero). */
  whatsapp: {
    exibicao: "(55) 98170-0001",
    digitos: "5555981700001",
    mensagem:
      "Olá! Tenho um clube e quero saber como funciona a organização de torneios com a F&M.",
  },

  /* [CONFIRMAR: logo vetorial] Versao provisoria em PNG 235x235, com o
     disco creme. Trocar pelo SVG oficial quando o cliente enviar. */
  logo: {
    src: "/bola/logo.png",
    largura: 235,
    altura: 235,
  },

  regiao: "[CONFIRMAR: cidade/região de atuação]",
} as const;

/* Link unico de WhatsApp: todo botao do site usa este, com a mensagem
   pre-preenchida. */
export const whatsappUrl = `https://wa.me/${site.whatsapp.digitos}?text=${encodeURIComponent(site.whatsapp.mensagem)}`;

/* Ancoras da pagina. O id e o mesmo no menu e na secao. */
export const secoes = [
  { id: "como-funciona", rotulo: "Como funciona" },
  { id: "servicos", rotulo: "Serviços" },
  { id: "diferenciais", rotulo: "Diferenciais" },
  { id: "torneios", rotulo: "Torneios" },
  { id: "faq", rotulo: "FAQ" },
] as const;
