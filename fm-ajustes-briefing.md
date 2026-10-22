# F&M — ajustes a partir do briefing preenchido

Briefing respondido por João Maneck em 13/10/2026.
Este documento tem três partes: o que decidir, o que ainda falta pedir, e os prompts prontos.

---

## PARTE 1 — Decisões antes de codar

### 1.1 A página promete quatro coisas que eles não fazem

Este é o achado mais sério do briefing. O template foi escrito supondo um escopo
maior do que o real. Se um clube contratar esperando isso, vira conflito no dia.

| A página diz hoje | O que eles responderam |
|---|---|
| **Premiação** como item entregue | "Temos contato para realização de troféu, mas normalmente **não nos envolvemos**" |
| **Cobertura** foto e vídeo | "**Não nos envolvemos** nessa parte por enquanto" |
| Passo 4: "fotos para o seu clube divulgar" | Mesma coisa — eles não fazem foto |
| Passo 3: "Nossa equipe conduz a mesa, os jogos e a premiação" | "Não utilizamos pessoas contratadas externamente, apenas pessoas que já compõem a equipe do clube" |
| **Mesa e arbitragem** como entrega | "Mesa, tomada próxima e caixa de som" — isso parece ser o que o CLUBE fornece, não o que a F&M entrega |

**Decisão necessária:** remover ou reescrever. O prompt 2 abaixo já faz isso.

As duas últimas linhas precisam de confirmação com eles antes:
- No plano presencial, quem opera a mesa no dia? Vocês ou a equipe do clube?
- "Mesa, tomada e caixa de som" é o que vocês levam ou o que o clube precisa ter?

### 1.2 Existem dois planos, e a página não sabe disso

Essa é a informação mais valiosa do briefing inteiro:

**Organização remota — R$ 1.000**
Tudo pelo Grippo ou MatchZoom. O contratante responde um formulário com o modelo
do torneio (número de duplas, categorias, valores) e recebe o torneio montado.

**Organização presencial — R$ 2.000 + auxílio de custos**
Acrescenta a presença física. Requer do clube: local restrito para a organização,
água e alimentação, hospedagem e deslocamento.

A página hoje assume um serviço só. Precisa de uma seção de planos — é o prompt 3.

### 1.3 Colocar preço na página?

Eles informaram R$ 1.000 e R$ 2.000. Minha recomendação: **colocar**.

A favor: o FAQ já pergunta "quanto custa" e resposta vaga ali frustra; preço filtra
quem não tem verba antes de ocupar o WhatsApp de vocês; nesse ticket a transparência
funciona como diferencial, não como risco.

Contra: perde margem de negociação por clube.

Se eles preferirem não expor, a alternativa é "a partir de R$ 1.000" — mantém a
referência sem fechar o valor.

**Confirmar com eles antes de publicar.** Eles responderam no briefing, não
necessariamente autorizaram publicar.

---

## PARTE 2 — O que ainda falta

### Bloqueia a publicação

- [ ] **Depoimento de clube** — ficou em branco e é a prova mais forte que existe
      nesse tipo de venda. Com 10 clubes atendidos, dá pra conseguir dois ou três.
- [ ] **Resposta: "Como funciona o chaveamento no Grippo?"** — ficou em branco e é
      justamente o diferencial técnico de vocês.
- [ ] **As 12 fotos** — mantidas como placeholder por enquanto, conforme combinado.
- [ ] **Logo em vetor** — sem ela a marca fica serrilhada em tela grande.
- [ ] **CNPJ e razão social** — para o rodapé.
- [ ] **Domínio** — ficou em branco. Precisam registrar ou decidir.

### Confirmar

- [ ] **WhatsApp (55) 98170-0001** — foi escrito como "5598170-0001", formato ambíguo,
      e termina em 0001, que tem cara de placeholder. Testem o link antes de publicar.
- [ ] **Nome completo do Eduardo** — o briefing diz "Eduardo Ivan", a página diz
      "Eduardo Friedrich". Qual é o correto?
- [ ] **Grafia da plataforma** — a página escreve "Gripo", eles escreveram "Grippo".
- [ ] **MatchZoom** — apareceu no briefing e não existe na página. Mencionar as duas?
- [ ] **Divulgação / artes para o Instagram** — está na página como entrega, mas não
      foi confirmado no briefing. Vocês fazem?
- [ ] **Antecedência mínima** — responderam "não há tempo exato, antes de abrir as
      inscrições". Serve como resposta de FAQ, mas confirmem se é isso mesmo.

### Deixar de fora por enquanto

- Número total de torneios organizados (responderam só a lista de clubes)
- Atletas num torneio típico
- Prazo de entrega de fotos (não se aplica — eles não fazem cobertura)

---

## PARTE 3 — Prompts

Rode na ordem. Confira entre um e outro.

### Prompt 1 — Dados reais e números

```
Atualize a landing page da F&M com os dados reais do cliente, recebidos no briefing.

NÚMEROS (criar uma seção de números, que hoje não existe)
  Posicione logo após a seção "Sem a F&M / Com a F&M".
  Quatro números em linha, no desktop; 2x2 no mobile.
  Mesmo tratamento tipográfico do resto da página.

    +2.000          atletas atendidos
    10              clubes parceiros
    252             duplas no maior torneio
    Santa Maria     e região

  Não invente nenhum outro número. Estes são os únicos confirmados.

CLUBES ATENDIDOS
  Crie um arquivo /data/clubes.ts com esta lista:
    Agudo Winner Sports Padel e Beach
    Star Padel Club
    Fomera Padel
    Fair Play Arena
    Cesla SM
    G15 Village
    Pier 158
    8000 Esportes Beach
    SH House
    Elite Padel Club

  Exiba como uma faixa de nomes em texto, não como grid de logos — ainda não
  temos os logos. Título da faixa: "Clubes que já receberam torneios da F&M".
  Deixe o componente preparado para receber logos depois, trocando texto por imagem.

RODAPÉ
  Cidade: Santa Maria / RS
  [CONFIRMAR: CNPJ e razão social]

SÓCIOS
  João Eduardo Moraes Maneck
  Eduardo [CONFIRMAR nome completo: o briefing diz "Eduardo Ivan",
  a página diz "Eduardo Friedrich"]

Não altere layout nem estilos existentes.
```

### Prompt 2 — Corrigir o escopo

```
A página promete serviços que o cliente confirmou NÃO prestar. Corrija.

REMOVER da seção "O que entregamos":
  - O card "Premiação" inteiro. O cliente respondeu: "temos contato para
    realização de troféu, mas normalmente não nos envolvemos."
  - O card "Cobertura". O cliente respondeu: "não nos envolvemos nessa parte
    por enquanto."

REESCREVER na seção "O que entregamos":
  - Card "Patrocínios" → novo texto: "Expomos os patrocinadores do seu clube
    nas artes e na divulgação do torneio." (eles apenas expõem, não captam)
  - Card "Chaveamento no Gripo" → corrigir a grafia para "Grippo" e acrescentar
    MatchZoom: "Chaveamento no Grippo ou MatchZoom. Chaves, horários e
    resultados online, em tempo real, para atletas e público."
  - Card "Mesa e arbitragem" → marcar como [CONFIRMAR: o cliente respondeu
    "mesa, tomada próxima e caixa de som", o que parece ser o que o CLUBE
    fornece, não o que a F&M entrega]

REESCREVER na seção "Como funciona":
  - Passo 3 "Dia do torneio": o texto atual diz "Nossa equipe conduz a mesa,
    os jogos e a premiação". O cliente respondeu que não contrata pessoas
    externas e usa a equipe do próprio clube. Substitua por:
    "Acompanhamos o andamento dos jogos e mantemos o cronograma em dia."
    [CONFIRMAR: no plano presencial, quem opera a mesa no dia?]
  - Passo 4 "Pós-evento": remova a menção a fotos. Novo texto:
    "Resultados publicados e chaveamento final disponível para o clube
    divulgar."

ADICIONAR na seção "O que entregamos", card novo:
  - "Atendimento aos atletas" — "Respondemos dúvidas sobre data, horário,
    valor e pagamento. O clube não precisa atender ninguém."

  Esse é o diferencial que o cliente mais destacou no briefing e não está
  na página: "entregamos o produto pronto para que o organizador apenas
  confira, sem precisar se envolver com a parte burocrática de responder
  a cada pessoa."
```

### Prompt 3 — Seção de planos

```
Crie uma seção de planos, id="planos", posicionada após "O que entregamos"
e antes de "Por que a F&M".

A F&M trabalha com dois formatos e a página hoje não mostra isso.

ESTRUTURA
  Título: "Dois jeitos de rodar o seu torneio."
  Dois cards lado a lado no desktop, empilhados no mobile.

CARD 1 — Organização remota
  Selo: REMOTA
  Preço: "R$ 1.000"
  Resumo: "A gente monta e gerencia o torneio inteiro à distância.
  Você responde um formulário com o modelo do torneio e recebe tudo pronto."
  Inclui:
    - Montagem completa no Grippo ou MatchZoom
    - Categorias, chaves e cronograma
    - Link de pagamento das inscrições
    - Atendimento aos atletas durante as inscrições
    - Resultados publicados em tempo real
  O clube fornece: quadras e a equipe do dia

CARD 2 — Organização presencial
  Selo: PRESENCIAL
  Preço: "R$ 2.000 + custos de deslocamento"
  Resumo: "Tudo da organização remota, mais a nossa presença no dia do torneio."
  Inclui: tudo do plano remoto, mais:
    - Equipe da F&M no local durante o torneio
    - Acompanhamento do cronograma ao vivo
  O clube fornece: quadras, espaço reservado para a organização,
  água e alimentação, hospedagem e deslocamento da equipe

  Nota abaixo dos dois cards, texto menor:
  "Os custos de deslocamento variam conforme a distância e são definidos
  no orçamento."

IMPORTANTE SOBRE OS PREÇOS
  Deixe os dois valores em um componente que possa ser desligado por uma flag
  em /data/config.ts (exibirPrecos: boolean). O cliente ainda não confirmou
  se quer os valores públicos. Com a flag desligada, o card mostra
  "Sob orçamento" no lugar do valor.

Design: mesma linguagem visual da página. Raio máximo 8px, sem sombra pesada,
sem gradiente. Os dois cards com o mesmo peso visual — nenhum é "recomendado".
```

### Prompt 4 — FAQ

```
Preencha as respostas do FAQ com o conteúdo do briefing.

"Quanto custa? Como é cobrado?"
  "Trabalhamos com dois formatos. A organização remota custa R$ 1.000 e cobre
  a montagem e a gestão completa do torneio à distância. A organização
  presencial custa R$ 2.000 mais os custos de deslocamento, e inclui a nossa
  equipe no local no dia do evento."
  [Esta resposta respeita a flag exibirPrecos. Com ela desligada:
  "Trabalhamos com dois formatos, remoto e presencial. O valor depende do
  formato escolhido e da distância. Chame no WhatsApp que passamos o orçamento."]

"Com quanto tempo de antecedência preciso marcar?"
  "Não existe prazo fixo. O importante é falar com a gente antes de abrir as
  inscrições do seu torneio, para montarmos tudo desde o começo."

"Quantas quadras preciso ter?"
  "Depende do número de duplas inscritas. A gente calcula isso junto com você
  quando define o formato do torneio."

"Vocês atendem quais cidades?"
  "Somos de Santa Maria e atendemos a região. Para outras cidades, falamos
  sobre deslocamento e combinamos no orçamento."

"O clube precisa fornecer algo além das quadras?"
  "Na organização remota, só as quadras e a equipe do dia. Na presencial,
  também um espaço reservado para a organização, água e alimentação, além
  de hospedagem e deslocamento da nossa equipe."

"Como funciona o chaveamento no Grippo?"
  [FALTA RESPOSTA — pedir ao cliente. É o diferencial técnico e ficou em branco
  no briefing. Enquanto não vier, não renderize esta pergunta.]

"Dá para fazer só Padel, só Beach Tennis ou misto?"
  "Dá para fazer das três formas. Se quiser rodar as duas modalidades no mesmo
  evento, a gente monta o cronograma para isso."

Corrija a grafia "Gripo" para "Grippo" em toda a página.
```

### Prompt 5 — Depoimentos

```
Crie uma seção de depoimentos, id="depoimentos", posicionada após a faixa de
clubes atendidos e antes do FAQ.

Três cards: citação, nome, cargo e clube.

Implemente com renderização condicional a partir de /data/depoimentos.ts:
  - Card sem texto não renderiza
  - Com dois depoimentos, o grid vira duas colunas centralizadas
  - Com nenhum, a seção inteira não renderiza

Deixe o arquivo criado e vazio. Os depoimentos ainda não foram coletados.

Título: "O que dizem os clubes."
```

### Prompt 6 — Publicação

```
Preparação final para publicar.

1. Remova "noindex, nofollow" das meta tags. A página precisa ser indexada.

2. O canonical aponta hoje para uma URL de preview da Vercel
   (template-h3l2rjxks-...). Troque pelo domínio final.
   [CONFIRMAR: domínio ainda não definido pelo cliente]

3. Valide o link do WhatsApp: deve ter 13 dígitos (55 + DDD + 9 dígitos).
   O número informado é (55) 98170-0001, que gera 5555981700001.
   Teste o link em um celular real antes de considerar pronto.

4. Adicione JSON-LD de LocalBusiness com nome, telefone, areaServed
   (Santa Maria, RS, BR) e a URL final.

5. Atualize a meta description para incluir Santa Maria:
   "A F&M organiza o torneio de Padel e Beach Tennis do seu clube em Santa
   Maria e região: inscrições, chaveamento, cronograma e atendimento aos
   atletas. Seu clube só abre as quadras."
```

---

## Sobre o posicionamento

Uma observação que vale levar pra eles.

A resposta mais forte do briefing foi esta, sobre por que um clube contrataria
a F&M em vez de organizar sozinho:

> "Organizamos a parte que o dono não quer se envolver. Sanamos dúvidas sobre
> o torneio, desde o dia, horários, valores de inscrição, link de pagamentos.
> Entregamos o produto pronto para que o organizador apenas confira se está do
> seu agrado, sem precisar se envolver com a parte burocrática de responder a
> cada pessoa."

Isso é mais específico e mais vendável que o headline atual. "Zero estresse" é
genérico; "você não precisa responder a cada pessoa" é a dor exata do dono de
clube, e combina com o medo que eles próprios listaram: "mão de obra de organizar
e lidar com impedimentos e pessoas no pré-torneio".

Vale testar um headline alternativo:

> **"Seu clube abre as quadras. O resto é com a gente."**

ou manter o atual e colocar essa frase como subtítulo. Decisão de vocês — o
headline de hoje já funciona bem.
