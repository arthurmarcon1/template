/* Textos da landing, secao por secao, na ordem do docs/LANDING_FM.md.
   Tudo marcado [CONFIRMAR] depende de dado real da F&M. Nada aqui foi
   inventado: numeros, nomes e depoimentos so entram com dado real. */

export const hero = {
  eyebrow: "Padel & Beach Tennis",
  titulo: "Seu clube, grandes torneios.",
  destaque: "Zero estresse.",
  subtitulo:
    "A F&M organiza o torneio inteiro, das inscrições à premiação. Seu clube só abre as quadras.",
  ctaPrincipal: "Quero um torneio no meu clube",
  ctaSecundario: "Ver como funciona",
};

export const problema = {
  titulo: ["Torneio bom dá movimento.", "Organizar dá dor de cabeça."],
  sem: {
    titulo: "Sem a F&M",
    itens: [
      "Planilha de inscritos",
      "Grupo de WhatsApp lotado",
      "Chaveamento na mão",
      "Atraso de jogo",
      "Reclamação de atleta",
      "Divulgação improvisada",
    ],
  },
  com: {
    titulo: "Com a F&M",
    itens: [
      "Inscrições organizadas",
      "Chaveamento e resultados online",
      "Cronograma cumprido",
      "Atleta bem atendido",
      "Divulgação profissional",
    ],
  },
  fechamento: "Você ganha o evento. A gente assume o trabalho.",
};

/* Os detalhes de cada etapa precisam ser validados com a F&M. */
export const comoFunciona = {
  titulo: "Como funciona",
  passos: [
    {
      titulo: "Conversa",
      texto: "Você diz a data, as quadras disponíveis e as modalidades.",
      detalhe: "[CONFIRMAR: com quanto tempo de antecedência e por qual canal]",
    },
    {
      titulo: "Planejamento",
      texto: "Montamos categorias, formato, cronograma e a divulgação.",
      detalhe: "[CONFIRMAR: o que o clube aprova antes de abrir as inscrições]",
    },
    {
      titulo: "Dia do torneio",
      texto: "Nossa equipe conduz a mesa, os jogos e a premiação.",
      detalhe: "[CONFIRMAR: tamanho da equipe no dia]",
    },
    {
      titulo: "Pós-evento",
      texto: "Resultados publicados e fotos para o seu clube divulgar.",
      detalhe: "[CONFIRMAR: prazo de entrega das fotos]",
    },
  ],
};
