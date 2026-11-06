/* Textos da landing, secao por secao, na ordem do docs/LANDING_FM.md.
   Tudo marcado [CONFIRMAR] depende de dado real da F&M. Nada aqui foi
   inventado: numeros, nomes e depoimentos so entram com dado real.
   Dados do briefing preenchido por Joao Maneck em 13/10/2026. */

import { config } from "@/data/config";

export const hero = {
  eyebrow: "Padel & Beach Tennis",
  titulo: "Seu clube, grandes torneios.",
  destaque: "Zero estresse.",
  /* A F&M nao cuida de premiacao (briefing), entao o subtitulo fecha
     nos resultados. */
  subtitulo:
    "A F&M organiza o torneio inteiro, das inscrições aos resultados. Seu clube só abre as quadras.",
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

/* Numeros confirmados no briefing. Nao acrescentar nenhum outro sem
   dado real. */
export const numeros = {
  titulo: "A F&M em números",
  itens: [
    { valor: "+2.000", rotulo: "atletas atendidos" },
    { valor: "10", rotulo: "clubes parceiros" },
    { valor: "252", rotulo: "duplas no maior torneio" },
    { valor: "Santa Maria", rotulo: "e região" },
  ],
};

export const comoFunciona = {
  titulo: "Como funciona",
  passos: [
    {
      titulo: "Conversa",
      texto: "Você diz a data, as quadras disponíveis e as modalidades.",
    },
    {
      titulo: "Planejamento",
      texto: "Montamos categorias, formato, cronograma e a divulgação.",
    },
    {
      titulo: "Dia do torneio",
      texto: "Acompanhamos o andamento dos jogos e mantemos o cronograma em dia.",
    },
    {
      titulo: "Pós-evento",
      texto:
        "Resultados publicados e chaveamento final disponível para o clube divulgar.",
    },
  ],
};

/* Faixa de foto entre "Como funciona" e "O que entregamos". A frase e
   a sugerida no briefing para o posicionamento. Foto de banco de imagem
   (Unsplash, Ashford Marx), so ambientacao. */
export const faixaFoto = {
  frase: "Seu clube abre as quadras. O resto é com a gente.",
  foto: "/fotos/fundo-quadra.webp",
};

/* Escopo conforme o briefing: premiacao e cobertura (foto/video) sairam
   porque a F&M nao presta esses servicos. */
export const servicos = {
  titulo: "O que entregamos",
  itens: [
    {
      titulo: "Inscrições",
      texto: "Recebemos, confirmamos e organizamos todos os inscritos.",
    },
    {
      titulo: "Atendimento aos atletas",
      texto:
        "Respondemos dúvidas sobre data, horário, valor e pagamento. O clube não precisa atender ninguém.",
    },
    {
      titulo: "Chaveamento no Gripo",
      texto:
        "Chaveamento no Gripo ou MatchZoom. Chaves, horários e resultados online, em tempo real, para atletas e público.",
    },
    {
      titulo: "Mesa e arbitragem",
      texto:
        "Disponível no modelo presencial. O clube disponibiliza o espaço e a aparelhagem, conforme combinado com a F&M.",
    },
    {
      titulo: "Divulgação",
      texto: "A F&M ajuda na divulgação do torneio pelo próprio Instagram.",
    },
    {
      titulo: "Patrocínios",
      texto:
        "Expomos os patrocinadores do seu clube nas artes e na divulgação do torneio.",
    },
  ],
};

/* Planos. precoPublico: o valor sempre aparece. Nos demais, so com
   config.exibirPrecos ligado; desligado, o card mostra precoOculto. */
export const planos = {
  titulo: "Dois jeitos de rodar o seu torneio.",
  precoOculto: "Sob orçamento",
  itens: [
    {
      selo: "Remota",
      nome: "Organização remota",
      preco: "R$ 990",
      precoPublico: true,
      resumo:
        "A gente monta e gerencia o torneio inteiro à distância. Você responde um formulário com o modelo do torneio e recebe tudo pronto.",
      incluiTitulo: "Inclui",
      inclui: [
        "Montagem completa no Gripo ou MatchZoom",
        "Categorias, chaves e cronograma",
        "Link de pagamento das inscrições",
        "Atendimento aos atletas durante as inscrições",
        "Resultados publicados em tempo real",
      ],
      clube: "Quadras e a equipe do dia.",
    },
    {
      selo: "Presencial",
      nome: "Organização presencial",
      preco: "R$ 2.000 + custos de deslocamento",
      precoPublico: false,
      resumo:
        "Tudo da organização remota, mais a nossa presença no dia do torneio.",
      incluiTitulo: "Inclui tudo do plano remoto, mais",
      inclui: [
        "Equipe da F&M no local durante o torneio",
        "Acompanhamento do cronograma ao vivo",
      ],
      clube:
        "Quadras, espaço reservado para a organização, água e alimentação, hospedagem e deslocamento da equipe.",
    },
  ],
  nota: "Os custos de deslocamento variam conforme a distância e são definidos no orçamento.",
};

export const diferenciais = {
  titulo: "Por que a F&M",
  pilares: [
    {
      titulo: "Organização",
      texto:
        "Seu clube não precisa responder a cada atleta. A F&M chega com processo pronto e cumpre o cronograma.",
    },
    {
      titulo: "Competição",
      texto:
        "Categorias bem montadas, jogos equilibrados e chaveamento transparente no Gripo ou MatchZoom.",
    },
    {
      titulo: "Experiência",
      texto:
        "Atleta bem recebido, evento com cara profissional e divulgação que valoriza o seu clube.",
    },
  ],
};

export const modalidades = {
  titulo: "Padel e Beach Tennis",
  itens: [
    {
      nome: "Padel",
      frase: "Torneios de duplas na quadra do seu clube, com categorias por nível.",
      categorias: "Naipes (1ª, 2ª, 3ª, 4ª, 5ª etc.), Sênior (35+, 45+, 60+ etc.) e Júnior (Sub 10, Sub 12, Sub 14 etc.)",
      foto: {
        src: "/fotos/padel.webp",
        alt: "Duas raquetes de Padel e várias bolas sobre a quadra azul",
      },
    },
    {
      nome: "Beach Tennis",
      frase: "Torneios de duplas na areia do seu clube, com categorias por nível.",
      categorias: "Naipes (1ª, 2ª, 3ª, 4ª, 5ª etc.), Sênior (35+, 45+, 60+ etc.) e Júnior (Sub 10, Sub 12, Sub 14 etc.)",
      foto: {
        src: "/fotos/beach-tennis.webp",
        alt: "Atletas disputando um ponto de Beach Tennis na areia, junto à rede",
      },
    },
  ],
};

export const torneios = {
  titulo: "Torneios realizados",
  destaque: {
    titulo: "Circuito Santa-Mariense de Beach Tennis",
    texto:
      "A F&M fez todo o acompanhamento do circuito, o maior do centro do RS e o maior do interior do estado.",
    foto: {
      src: "/fotos/circuito-beach-sm.webp",
      alt: "Vista do alto das quadras de areia do Circuito Santa-Mariense de Beach Tennis, com atletas em jogo e bandeiras dos patrocinadores",
    },
  },
  /* Os dois videos com som, inteiros. */
  eliteClub: {
    titulo: "Acompanhamento e dicas para o torneio",
    texto: "Conteúdos da F&M gravados no Elite Padel Club.",
    videos: [
      {
        src: "/videos/elite-clube-1.mp4",
        poster: "/videos/elite-clube-1.webp",
        rotulo: "João e Eduardo, da F&M, na quadra do Elite Padel Club, falando sobre o jogo na rede",
      },
      {
        src: "/videos/elite-clube-2.mp4",
        poster: "/videos/elite-clube-2.webp",
        rotulo: "Eduardo e João, da F&M, na quadra do Elite Padel Club, falando sobre posicionamento",
      },
    ],
  },
  /* Takes curtos e sem som dos videos longos. Originais fora do
     repositorio; recortes em public/videos/ (540x960, H.264). */
  eliteCup: [
    {
      titulo: "Elite Cup: sexta",
      takes: [
        { id: "elite-sexta-1", rotulo: "Dupla se abraça na quadra depois do jogo" },
        { id: "elite-sexta-2", rotulo: "Atleta se prepara para receber o saque" },
        { id: "elite-sexta-3", rotulo: "Público acompanha os jogos da arquibancada" },
      ],
    },
    {
      titulo: "Elite Cup: sábado",
      takes: [
        { id: "elite-sabado-1", rotulo: "Atletas posam juntos na rede" },
        { id: "elite-sabado-2", rotulo: "Atleta em jogo na quadra azul" },
        { id: "elite-sabado-3", rotulo: "Atletas se cumprimentam na rede" },
      ],
    },
    {
      titulo: "Elite Cup: melhores momentos",
      takes: [
        { id: "elite-final-1", rotulo: "Dupla comemora na quadra com o público ao fundo" },
        { id: "elite-final-2", rotulo: "Atleta corre para a rede durante o ponto" },
        { id: "elite-final-3", rotulo: "Atletas comemoram com o troféu na premiação" },
      ],
    },
  ],
  instagram: "Ver mais no Instagram",
};

export const equipe = {
  titulo: "Quem organiza",
  pessoas: [
    {
      nome: "Eduardo Friedrich",
      linha: "[CONFIRMAR: uma linha sobre o Eduardo]",
      instagram: { handle: "@edufriedrich_", url: "https://instagram.com/edufriedrich_" },
      foto: { src: "/fotos/eduardo.webp", alt: "Eduardo Friedrich, da F&M, com uma raquete de Padel na quadra" },
    },
    {
      nome: "João Eduardo Moraes Maneck",
      linha: "[CONFIRMAR: uma linha sobre o João]",
      instagram: { handle: "@joao.maneck", url: "https://instagram.com/joao.maneck" },
      foto: { src: "/fotos/joao.webp", alt: "João Maneck, da F&M, em quadra de Padel" },
    },
  ],
};

export const clubesAtendidos = {
  titulo: "Clubes que já receberam torneios da F&M",
};

export const depoimentosSecao = {
  titulo: "O que dizem os clubes.",
};

/* Resposta vazia: a pergunta nao renderiza (Faq.tsx). */
export const faq = {
  titulo: "Perguntas frequentes",
  itens: [
    {
      pergunta: "Quanto custa? Como é cobrado?",
      resposta: config.exibirPrecos
        ? "Trabalhamos com dois formatos. A organização remota custa R$ 990 e cobre a montagem e a gestão completa do torneio à distância. A organização presencial custa R$ 2.000 mais os custos de deslocamento, e inclui a nossa equipe no local no dia do evento."
        : "Trabalhamos com dois formatos. A organização remota custa R$ 990 e cobre a montagem e a gestão completa do torneio à distância. Na presencial, com a nossa equipe no local, o valor depende da distância: chame no WhatsApp que passamos o orçamento.",
    },
    {
      pergunta: "Com quanto tempo de antecedência preciso marcar?",
      resposta:
        "Não existe prazo fixo. O importante é falar com a gente antes de abrir as inscrições do seu torneio, para montarmos tudo desde o começo.",
    },
    {
      pergunta: "Quantas quadras preciso ter?",
      resposta:
        "Depende do número de duplas inscritas. A gente calcula isso junto com você quando define o formato do torneio.",
    },
    {
      pergunta: "Vocês atendem quais cidades?",
      resposta:
        "Somos de Santa Maria e atendemos a região presencialmente. Para outras cidades, falamos sobre deslocamento e combinamos no orçamento. No formato remoto, atendemos o Brasil inteiro.",
    },
    {
      pergunta: "O clube precisa fornecer algo além das quadras?",
      resposta:
        "Na organização remota, só as quadras e a equipe do dia. Na presencial, também um espaço reservado para a organização, água e alimentação, além de hospedagem e deslocamento da nossa equipe.",
    },
    {
      /* [CONFIRMAR] Ficou em branco no briefing. Oculta ate o cliente
         responder. */
      pergunta: "Como funciona o chaveamento no Gripo?",
      resposta: "",
    },
    {
      pergunta: "Dá para fazer só Padel, só Beach Tennis ou misto?",
      resposta:
        "Dá para fazer das três formas. Se quiser rodar as duas modalidades no mesmo evento, a gente monta o cronograma para isso.",
    },
  ],
};

export const ctaFinal = {
  titulo: "Bora colocar o seu clube no calendário?",
  botao: "Quero um torneio no meu clube",
  /* Bola com a marca F&M na quadra verde. */
  foto: "/fotos/bola-fm.webp",
};
