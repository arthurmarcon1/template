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

export const servicos = {
  titulo: "O que entregamos",
  itens: [
    {
      titulo: "Inscrições",
      texto: "Recebemos, confirmamos e organizamos todos os inscritos.",
    },
    {
      titulo: "Chaveamento no Gripo",
      texto:
        "Chaves, horários e resultados online, em tempo real, para atletas e público.",
    },
    { titulo: "Mesa e arbitragem", texto: "[CONFIRMAR: escopo]" },
    {
      titulo: "Divulgação",
      texto: "Artes e posts prontos para o Instagram do clube.",
    },
    {
      titulo: "Premiação",
      texto: "[CONFIRMAR: troféus, medalhas, brindes]",
    },
    {
      titulo: "Patrocínios",
      texto: "[CONFIRMAR: se a F&M capta ou só expõe patrocinadores]",
    },
    { titulo: "Cobertura", texto: "[CONFIRMAR: foto e vídeo]" },
  ],
};

export const diferenciais = {
  titulo: "Por que a F&M",
  pilares: [
    {
      titulo: "Organização",
      texto:
        "Seu clube não precisa destacar ninguém da equipe. A F&M chega com processo pronto e cumpre o cronograma.",
    },
    {
      titulo: "Competição",
      texto:
        "Categorias bem montadas, jogos equilibrados e chaveamento transparente no Gripo.",
    },
    {
      titulo: "Experiência",
      texto:
        "Atleta bem recebido, evento com cara profissional e divulgação que valoriza o seu clube.",
    },
  ],

  /* Faixa de numeros. So aparece com exibir: true E todos os valores
     preenchidos. Enquanto os numeros reais nao chegarem, fica oculta. */
  numeros: {
    exibir: false,
    itens: [
      { valor: "", rotulo: "torneios realizados" }, // [CONFIRMAR: torneios realizados]
      { valor: "", rotulo: "atletas" }, // [CONFIRMAR: atletas]
      { valor: "", rotulo: "clubes parceiros" }, // [CONFIRMAR: clubes parceiros]
    ],
  },
};

export const modalidades = {
  titulo: "Padel e Beach Tennis",
  itens: [
    {
      nome: "Padel",
      frase: "Torneios de duplas na quadra do seu clube, com categorias por nível.",
      categorias: "[CONFIRMAR: categorias oferecidas no Padel]",
      foto: {
        src: "/fotos/padel.webp",
        alt: "Dupla disputando um ponto em torneio de Padel organizado pela F&M",
      },
    },
    {
      nome: "Beach Tennis",
      frase: "Torneios de duplas na areia do seu clube, com categorias por nível.",
      categorias: "[CONFIRMAR: categorias oferecidas no Beach Tennis]",
      foto: {
        src: "/fotos/beach-tennis.webp",
        alt: "Atletas em jogo de Beach Tennis durante torneio organizado pela F&M",
      },
    },
  ],
};
