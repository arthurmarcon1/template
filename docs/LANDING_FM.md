# Landing page — F&M Eventos Esportivos

## Contexto

A F&M Eventos Esportivos organiza torneios de **Padel e Beach Tennis** para clubes. O público são donos e gestores de clubes que querem ter torneios, mas não querem se envolver com nada da organização: inscrições, chaveamento, mesa, premiação, divulgação. A F&M cuida de tudo e o clube só recebe o evento.

- Assinatura da marca: **Organização • Competição • Experiência**
- Frase já usada no Instagram: **"Seu clube, grandes torneios. Zero estresse."**
- Chaveamento e resultados são publicados no **Gripo**.
- Instagram: @fmeventosesportivos (responsáveis: @edufriedrich_ e @joao.maneck)
- WhatsApp usado nos posts: (55) 98170-0001 `[CONFIRMAR]`

A hero terá uma bola de tênis/padel 3D em three.js, com a logo da F&M estampada.

Arquivos da bola que já existem:
- `ball.html`: monta a bola (feltro, faixa de costura, sulco, decalque da logo) e entrega ao stage via `stage.setObject(ball)`.
- `three-d-stage.js`: web component `<three-d-stage>` (renderer, luzes, OrbitControls, enquadramento automático, toolbar de exportação OBJ/GLB). Hoje funciona como **visualizador**, não como elemento de página.
- `logo.png`: logo da F&M (235×235, com disco creme de fundo).
- three.js 0.184.0 via import map do unpkg.

## Identidade visual

Paleta extraída da logo e dos posts do Instagram:

| Token | Hex | Uso |
|---|---|---|
| `petroleo-900` | `#10313E` | Fundo principal escuro (hero, seções de destaque) |
| `petroleo-700` | `#294B54` | Cor da logo, títulos sobre fundo claro, bordas |
| `petroleo-500` | `#507275` | Fundos secundários escuros, cards sobre fundo escuro |
| `agua-400` | `#729E91` | Destaques de texto ("Zero estresse."), ícones, detalhes |
| `agua-600` | `#4F6E65` | Texto verde-água sobre fundo claro (`creme-50`) |
| `neutro-400` | `#9CA7A4` | Texto secundário sobre fundo escuro |
| `creme-50` | `#F1EFE8` | Fundo claro das seções, texto sobre fundo escuro |
| `bege-200` | `#E2D7B7` | Detalhes da logo, divisores, selos, hexágono |
| `bola-400` | `#D6E23F` | Acento raro: a bola, um CTA principal, nada além disso |

### Regras de contraste (decididas na Tarefa 2)

Razões WCAG calculadas; AA exige 4,5:1 para texto normal. A tabela completa está em `/tokens`.

- **`agua-400` nunca é texto sobre fundo claro** (2,60:1 sobre `creme-50`). Texto verde-água no claro usa **`agua-600`** (4,87:1 sobre `creme-50`; sobre `bege-200` cai para 3,9:1, então lá só em texto grande).
- **`agua-400` sobre `petroleo-900`** (4,58:1) é liberado **só para títulos, eyebrow e destaques**. Texto corrido em fundo escuro usa `creme-50` (11,92:1) ou `neutro-400` (5,54:1).
- **`petroleo-500` não é fundo de seção com texto.** Só cards, bordas e detalhes. Sobre ele, `agua-400` (1,75:1) e `neutro-400` (2,12:1) falham; se um card em `petroleo-500` tiver texto, o texto é `creme-50` (4,56:1).
- Números grandes do "Como funciona" (Tarefa 10): `agua-600` se a seção for clara, `agua-400` se for escura.

Tipografia: os posts usam títulos em caixa alta, sans pesada e um pouco condensada, com subtítulos espaçados ("ORGANIZAÇÃO · COMPETIÇÃO · EXPERIÊNCIA"). Sugestão: **Barlow Condensed** (700/800) nos títulos e **Barlow** (400/500/600) no corpo, via Google Fonts, com fallback de sistema. Subtítulos-assinatura em caixa alta com `letter-spacing` largo.

Elemento gráfico: o **hexágono** da logo pode aparecer como moldura sutil, marcador de lista ou recorte de foto, com moderação.

## Regras de design (valem para tudo)

- Sem glassmorphism.
- Border-radius máximo de 8px.
- Sem texto com gradiente.
- Nada com cara de SaaS genérico: sem grade de ícones genéricos em cards idênticos, sem ilustrações 3D de bonequinhos, sem "Trusted by" com logos falsas.
- O amarelo `#D6E23F` é acento raro. Não vira cor de fundo de seção.
- Fotos reais de torneio têm prioridade sobre qualquer ilustração.

## Regras de conteúdo

- **Nunca invente** números (torneios realizados, atletas, clubes), depoimentos, nomes de clientes ou patrocinadores.
- Tudo que precisar de dado real entra como placeholder visível no formato `[CONFIRMAR: descrição]`, para eu preencher depois.
- Imagens: use placeholders com proporção fixa e `alt` descritivo, apontando para `/fotos/<nome>.webp`. Eu coloco as fotos reais depois.
- Texto em português do Brasil, direto, falando com o dono ou gestor do clube ("seu clube"). Frases curtas, sem jargão de marketing.

## Como trabalhar neste arquivo

- Execute **uma tarefa por vez**, na ordem.
- Ao terminar cada tarefa, **pare**, resuma o que mudou e espere eu commitar e mandar seguir.
- Não altere nada fora do escopo da tarefa atual.
- Se algo aqui contradizer o que você encontrar no código, avise antes de agir.

---

# PARTE 1 — Base

## Tarefa 1 — Reconhecimento (sem código)

1. Verifique se já existe um projeto de landing nesta pasta. Se existir, identifique a stack (HTML puro, Next, Vite etc.) e a estrutura.
2. Se não existir, proponha a stack. Priorize página estática rápida, fácil de hospedar, com bom SEO e que suporte o three.js carregado sob demanda. Não crie nada antes de eu confirmar.
3. Leia `ball.html` e `three-d-stage.js` e explique em poucas linhas como o stage monta a cena: renderer, luzes, controles, câmera e toolbar.
4. Proponha onde a bola vai morar no projeto e se o three vira dependência npm.

Entregue só o diagnóstico e o plano.

## Tarefa 2 — Setup e design tokens

Com a stack confirmada:
- crie ou ajuste o projeto;
- defina os tokens de cor da tabela acima como variáveis CSS (ou tema do Tailwind, se for a stack);
- configure a tipografia (Barlow Condensed + Barlow, com fallback);
- defina escala de espaçamento, largura máxima de conteúdo (~1200px) e breakpoints;
- crie os estilos-base: fundo `creme-50`, texto `petroleo-900`, links, foco visível para teclado.

Crie uma página `/_tokens` (ou equivalente) mostrando as cores, os tamanhos de título e os botões, para eu validar o visual antes de montar as seções.

## Tarefa 3 — Header e footer

**Header**
- Logo à esquerda e âncoras para as seções (Como funciona, Serviços, Diferenciais, Torneios, FAQ).
- Botão "Falar no WhatsApp" à direita.
- Fixo no scroll, com fundo sólido `petroleo-900` (sem blur).
- Menu simples no mobile.

**Footer**
- Fundo `petroleo-900`.
- Logo, assinatura "Organização · Competição · Experiência", WhatsApp, Instagram e `[CONFIRMAR: cidade/região de atuação]`.
- Crédito discreto: "Site por 3eTec".

**Extra:** botão flutuante de WhatsApp no canto inferior direito, só no mobile. Todos os links de WhatsApp devem usar mensagem pré-preenchida: "Olá! Tenho um clube e quero saber como funciona a organização de torneios com a F&M."

---

# PARTE 2 — Bola 3D

## Tarefa 4 — Feltro aveludado

No `ball.html`, troque o material do feltro (`felt`) de `MeshStandardMaterial` para `MeshPhysicalMaterial`:
- mantenha a cor `0xd6e23f` e a roughness alta;
- adicione `sheen: 1`, `sheenRoughness` por volta de 0.8 e `sheenColor` amarelo-claro (por exemplo `0xf2f7a0`).

Não mexa na geometria nem na costura. No resumo, diga quais valores ajustar se o brilho nas bordas ficar forte demais.

## Tarefa 5 — Logo como estampa, não adesivo

**Pré-requisito:** `logo-estampa.png` precisa existir no projeto. É a versão só com o traço em `#294B54`, fundo transparente e sem o disco creme. Se o arquivo não existir, pare e me avise.

Troque o decalque da logo para usar `logo-estampa.png`. O objetivo é parecer tinta impressa no feltro. No material:
- `transparent: true`;
- `alphaTest` baixo (cerca de 0.05);
- `opacity` por volta de 0.9;
- roughness igual à do feltro;
- `depthWrite: false`.

Mantenha a lógica atual de orientação do decalque. Se o raio `R * 1.014` deixar a logo visivelmente flutuando, reduza até ela ficar rente sem piscar.

## Tarefa 6 — Modo hero no stage

Crie um modo hero ativado por atributo (`<three-d-stage hero>`) que:
- esconde a toolbar e a nota "Drag to orbit";
- deixa o fundo transparente (sem background no `:host`; o renderer já tem `alpha: true`);
- desliga zoom e pan (`enableZoom = false`, `enablePan = false`), para não capturar o scroll da página;
- remove o plano de sombra do chão;
- mantém o autorotate lento e faz a bola inclinar levemente seguindo o mouse (poucos graus, com damping), no lugar do orbit livre;
- deixa a altura ser definida pelo CSS do container, e não por 100vh;
- enquadra a bola ocupando cerca de 85% do menor lado do canvas;
- ajusta a luz para um fundo escuro `#10313E`: a bola não pode ficar apagada nem estourada, e um leve rim light verde-água (`#729E91`) por trás ajuda a destacar a silhueta.

O modo padrão, sem o atributo, deve continuar funcionando exatamente como hoje.

## Tarefa 7 — Imagem estática de fallback

Renderize a cena do modo hero uma vez, com fundo transparente, em 1200×1200 (`renderer.domElement.toDataURL`; o `preserveDrawingBuffer` já está ligado).

- Salve como `ball-static.png` e converta também para WebP.
- Deixe um script ou instrução para regenerar esse arquivo se a bola mudar.

---

# PARTE 3 — Seções da landing

## Tarefa 8 — Hero

Fundo `petroleo-900`, texto à esquerda e bola à direita. No mobile, a bola vai acima do texto e fica menor.

**Conteúdo**
- Linha pequena acima do título, em caixa alta espaçada, cor `agua-400`: "PADEL & BEACH TENNIS".
- Título: "Seu clube, grandes torneios." e, em outra linha na cor `agua-400`: "Zero estresse."
- Subtítulo: "A F&M organiza o torneio inteiro, das inscrições à premiação. Seu clube só abre as quadras."
- CTA principal: "Quero um torneio no meu clube" (WhatsApp), com fundo `bola-400` e texto `petroleo-900`.
- CTA secundário, só em texto: "Ver como funciona" (âncora).
- Rodapé da hero: "ORGANIZAÇÃO · COMPETIÇÃO · EXPERIÊNCIA", em caixa alta espaçada, cor `neutro-400`.

**Bola**
- Use o modo hero.
- O three.js carrega só depois do conteúdo principal (dynamic import ou IntersectionObserver).
- Enquanto não carrega, mostre `ball-static` no mesmo lugar e tamanho, sem salto de layout.
- Com `prefers-reduced-motion`, mostre só a imagem estática e não carregue o three.js.
- Se a stack usa npm, use `three@0.184.0` como dependência em vez do unpkg.

## Tarefa 9 — Problema e proposta

Seção em fundo `creme-50` que fala a dor do clube.

- Título: "Torneio bom dá movimento. Organizar dá dor de cabeça."
- Contraste em duas colunas:
  - **"Sem a F&M"**: planilha de inscritos, grupo de WhatsApp lotado, chaveamento na mão, atraso de jogo, reclamação de atleta, divulgação improvisada.
  - **"Com a F&M"**: inscrições organizadas, chaveamento e resultados online, cronograma cumprido, atleta bem atendido, divulgação profissional.
- Fechamento em uma linha: "Você ganha o evento. A gente assume o trabalho."

Visual sóbrio: sem ícones genéricos de "X" vermelho e check verde. Use tipografia e uma divisória em `bege-200`.

## Tarefa 10 — Como funciona

Quatro passos numerados, com números grandes em Barlow Condensed na cor `agua-600` se a seção for clara, ou `agua-400` se for escura (ver "Regras de contraste"):

1. **Conversa:** "Você diz a data, as quadras disponíveis e as modalidades."
2. **Planejamento:** "Montamos categorias, formato, cronograma e a divulgação."
3. **Dia do torneio:** "Nossa equipe conduz a mesa, os jogos e a premiação."
4. **Pós-evento:** "Resultados publicados e fotos para o seu clube divulgar."

Todos os detalhes ficam como `[CONFIRMAR]`, porque precisam ser validados com a F&M. No desktop, mostre em linha do tempo horizontal; no mobile, vertical.

## Tarefa 11 — O que entregamos (serviços)

Seção em fundo `petroleo-900` com lista dos serviços, cada item com título curto e uma frase:

- **Inscrições:** "Recebemos, confirmamos e organizamos todos os inscritos."
- **Chaveamento no Gripo:** "Chaves, horários e resultados online, em tempo real, para atletas e público."
- **Mesa e arbitragem:** `[CONFIRMAR: escopo]`
- **Divulgação:** "Artes e posts prontos para o Instagram do clube."
- **Premiação:** `[CONFIRMAR: troféus, medalhas, brindes]`
- **Patrocínios:** `[CONFIRMAR: se a F&M capta ou só expõe patrocinadores]`
- **Cobertura:** `[CONFIRMAR: foto e vídeo]`

Layout em lista de duas colunas com o hexágono como marcador, em vez de cards idênticos com ícones.

## Tarefa 12 — Diferenciais

Três blocos, um para cada pilar da assinatura da marca, com título grande e texto curto:

- **Organização:** o clube não precisa destacar ninguém da equipe; a F&M chega com processo pronto e cumpre o cronograma.
- **Competição:** categorias bem montadas, jogos equilibrados, chaveamento transparente no Gripo.
- **Experiência:** atleta bem recebido, evento com cara profissional e divulgação que valoriza o clube.

Depois, uma faixa com números: `[CONFIRMAR: torneios realizados]`, `[CONFIRMAR: atletas]`, `[CONFIRMAR: clubes parceiros]`. **Se eu não preencher os números, a faixa não aparece.** Implemente isso com um flag simples no conteúdo.

## Tarefa 13 — Modalidades

Duas colunas, **Padel** e **Beach Tennis**, cada uma com foto (placeholder `/fotos/padel.webp` e `/fotos/beach-tennis.webp`), uma frase e as categorias oferecidas: `[CONFIRMAR]`.

## Tarefa 14 — Torneios realizados e equipe

**Galeria**
- Grade de 6 a 8 fotos reais (placeholders `/fotos/torneio-01.webp` e seguintes).
- Legenda curta com nome do torneio, clube e data: `[CONFIRMAR]`.
- Link "Ver mais no Instagram".

**Equipe**
- Eduardo Friedrich `[CONFIRMAR nome completo]` e João Maneck, com foto, uma linha sobre cada um (`[CONFIRMAR]`) e link do Instagram.
- Fotos com recorte sóbrio, sem círculo com borda colorida.

**Depoimentos**
- Estrutura pronta para até 3 depoimentos de clubes, oculta enquanto não houver conteúdo real. Não invente depoimentos.

## Tarefa 15 — FAQ e CTA final

**FAQ** em acordeão acessível (`button` + `aria-expanded`), com respostas `[CONFIRMAR]`:
- Quanto custa? Como é cobrado?
- Com quanto tempo de antecedência preciso marcar?
- Quantas quadras preciso ter?
- Vocês atendem quais cidades?
- O clube precisa fornecer algo além das quadras?
- Como funciona o chaveamento no Gripo?
- Dá para fazer torneio só de Padel, só de Beach Tennis ou misto?

**CTA final**
- Fundo `petroleo-900`, com a bola estática menor como elemento visual.
- Título: "Bora colocar o seu clube no calendário?"
- Botão de WhatsApp com a mensagem pré-preenchida.

---

# PARTE 4 — Acabamento

## Tarefa 16 — SEO, acessibilidade e performance

**SEO**
- `title`: "F&M Eventos Esportivos | Organização de torneios de Padel e Beach Tennis".
- `meta description` focada em clubes.
- Open Graph com imagem 1200×630 (fundo `petroleo-900`, bola e frase da hero).
- Favicon a partir da logo.
- JSON-LD de `Organization` com os contatos.
- `lang="pt-BR"`.

**Acessibilidade**
- Contraste AA em todos os textos. Confira especialmente `agua-400` e `neutro-400` sobre `petroleo-900`; se falharem, ajuste o tom e me diga.
- `alt` em todas as imagens.
- Navegação por teclado funcionando.
- Foco visível.

**Performance**
- Fontes com `display=swap` e preload das principais.
- Imagens em WebP com `width`/`height`, e lazy abaixo da dobra.
- three.js fora do bundle inicial.
- Rode Lighthouse mobile e me traga os números. Meta: 90+ em Performance, Acessibilidade e SEO.

## Tarefa 17 — Revisão final

1. Liste **todos** os `[CONFIRMAR]` que sobraram, agrupados por seção, para eu levar ao cliente.
2. Liste o que eu devo testar manualmente, incluindo:
   - celular Android intermediário real;
   - scroll livre por cima da bola;
   - `prefers-reduced-motion`;
   - links de WhatsApp no celular;
   - carregamento em 4G lento.
