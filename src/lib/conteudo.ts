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

export const torneios = {
  titulo: "Torneios realizados",
  /* Legenda: nome do torneio, clube e data. Trocar cada [CONFIRMAR] pelo
     dado real ao colocar a foto correspondente em public/fotos/. */
  galeria: Array.from({ length: 8 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      src: `/fotos/torneio-${n}.webp`,
      alt: `Foto do torneio ${n} organizado pela F&M [CONFIRMAR: descrever a cena]`,
      legenda: "[CONFIRMAR: nome do torneio, clube e data]",
    };
  }),
  instagram: "Ver mais no Instagram",
};

export const equipe = {
  titulo: "Quem organiza",
  pessoas: [
    {
      nome: "Eduardo Friedrich [CONFIRMAR nome completo]",
      linha: "[CONFIRMAR: uma linha sobre o Eduardo]",
      instagram: { handle: "@edufriedrich_", url: "https://instagram.com/edufriedrich_" },
      foto: { src: "/fotos/eduardo.webp", alt: "Retrato de Eduardo Friedrich, da F&M" },
    },
    {
      nome: "João Maneck",
      linha: "[CONFIRMAR: uma linha sobre o João]",
      instagram: { handle: "@joao.maneck", url: "https://instagram.com/joao.maneck" },
      foto: { src: "/fotos/joao.webp", alt: "Retrato de João Maneck, da F&M" },
    },
  ],
};

/* Depoimentos de clubes: ate 3. A secao fica oculta enquanto a lista
   estiver vazia. So entram depoimentos reais, com autorizacao. Formato:
   { texto: "...", nome: "Nome da pessoa", clube: "Clube, cidade" } */
export const depoimentos: { texto: string; nome: string; clube: string }[] = [];

export const faq = {
  titulo: "Perguntas frequentes",
  itens: [
    { pergunta: "Quanto custa? Como é cobrado?", resposta: "[CONFIRMAR: modelo de cobrança e faixa de valores]" },
    { pergunta: "Com quanto tempo de antecedência preciso marcar?", resposta: "[CONFIRMAR: antecedência mínima]" },
    { pergunta: "Quantas quadras preciso ter?", resposta: "[CONFIRMAR: número mínimo de quadras]" },
    { pergunta: "Vocês atendem quais cidades?", resposta: "[CONFIRMAR: cidades e região de atuação]" },
    { pergunta: "O clube precisa fornecer algo além das quadras?", resposta: "[CONFIRMAR: o que fica por conta do clube]" },
    { pergunta: "Como funciona o chaveamento no Gripo?", resposta: "[CONFIRMAR: como atletas e público acompanham chaves e resultados]" },
    { pergunta: "Dá para fazer torneio só de Padel, só de Beach Tennis ou misto?", resposta: "[CONFIRMAR: formatos possíveis]" },
  ],
};

export const ctaFinal = {
  titulo: "Bora colocar o seu clube no calendário?",
  botao: "Quero um torneio no meu clube",
};
