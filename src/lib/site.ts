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
  },

  regiao: "[CONFIRMAR: cidade/região de atuação]",
} as const;
