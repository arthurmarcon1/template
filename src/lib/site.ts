/* Dados centrais da F&M Eventos Esportivos.
   Tudo marcado [CONFIRMAR] precisa de dado real antes de publicar.
   Nenhum numero, nome ou depoimento foi inventado. */

export const site = {
  nome: "F&M Eventos Esportivos",
  descricao:
    "A F&M organiza torneios de Padel e Beach Tennis para clubes, das inscrições aos resultados.",
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

  /* [CONFIRMAR] Numero informado no briefing como "5598170-0001" (formato
     ambiguo e final 0001 com cara de placeholder). Testar o link num
     celular real antes de publicar. Unico lugar do site onde o WhatsApp
     e definido. digitos: formato do wa.me, 13 digitos (55 + DDD + 9). */
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

  cidade: "Santa Maria",
  uf: "RS",
  regiao: "Santa Maria / RS",
  /* [CONFIRMAR: CNPJ e razao social] Aparecem no rodape. */
  empresa: "[CONFIRMAR: razão social] · CNPJ [CONFIRMAR]",

  /* [CONFIRMAR: dominio definitivo] Ainda nao registrado pelo cliente.
     Com https://, ex.: "https://dominio.com.br". Enquanto vazio, a URL
     canonica vem da Vercel (ver layout.tsx). */
  dominio: "",
} as const;

/* Link unico de WhatsApp: todo botao do site usa este, com a mensagem
   pre-preenchida. */
export const whatsappUrl = `https://wa.me/${site.whatsapp.digitos}?text=${encodeURIComponent(site.whatsapp.mensagem)}`;

/* Ancoras da pagina. O id e o mesmo no menu e na secao. */
export const secoes = [
  { id: "como-funciona", rotulo: "Como funciona" },
  { id: "servicos", rotulo: "Serviços" },
  { id: "planos", rotulo: "Planos" },
  { id: "diferenciais", rotulo: "Diferenciais" },
  { id: "torneios", rotulo: "Torneios" },
  { id: "faq", rotulo: "FAQ" },
] as const;
