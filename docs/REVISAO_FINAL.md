# Revisão final da landing F&M

## 1. Pendências para confirmar com a F&M

Tudo abaixo aparece hoje no site como `[CONFIRMAR]` ou como espaço reservado. Os textos ficam em `src/lib/conteudo.ts`, e os dados de contato e marca em `src/lib/site.ts`.

### Marca e contato (valem para o site inteiro)
- [ ] **WhatsApp (55) 98170-0001**: confirmar se é o número certo para os clubes falarem com a F&M. Ele aparece em todos os botões e no rodapé.
- [ ] **Logo vetorial (SVG ou PDF)**: hoje o site usa um PNG de 235×235 no cabeçalho e no rodapé.
- [ ] **Versão da logo só com o traço** (`logo-estampa.png`, em `#294B54`, fundo transparente, sem o disco creme): hoje a bola usa uma versão provisória, recortada automaticamente do PNG. A raquete e a bolinha da logo original ficaram de fora do recorte.
- [ ] **Ícone da aba (favicon)**: hoje é provisório, só as letras "F&M" em Barlow Condensed. Refazer a partir da logo vetorial.
- [ ] **Cidade ou região de atuação**: aparece no rodapé.

### Como funciona
- [ ] Conversa: com quanto tempo de antecedência e por qual canal.
- [ ] Planejamento: o que o clube aprova antes de abrir as inscrições.
- [ ] Dia do torneio: tamanho da equipe no dia.
- [ ] Pós-evento: prazo de entrega das fotos.
- [ ] Confirmar se as quatro etapas descrevem o processo real da F&M.

### O que entregamos
- [ ] Mesa e arbitragem: escopo.
- [ ] Premiação: troféus, medalhas ou brindes? Quem providencia?
- [ ] Patrocínios: a F&M capta patrocinadores ou só expõe os que o clube já tem?
- [ ] Cobertura: tem foto? Tem vídeo?

### Diferenciais (faixa de números)
- [ ] Quantos torneios já foram realizados.
- [ ] Quantos atletas participaram.
- [ ] Quantos clubes são parceiros.

A faixa só aparece no site com os três números preenchidos e o flag `diferenciais.numeros.exibir` ligado.

### Modalidades
- [ ] Categorias oferecidas no Padel.
- [ ] Categorias oferecidas no Beach Tennis.
- [ ] Validar as frases das duas modalidades ("Torneios de duplas na quadra/areia do seu clube, com categorias por nível"). Elas foram escritas para o site e não vieram da F&M.

### Torneios realizados
- [ ] De 6 a 8 fotos reais de torneios, cada uma com **nome do torneio, clube e data**.
- [ ] Uma descrição curta da cena de cada foto, que vira o texto alternativo para leitores de tela.

### Quem organiza
- [ ] Nome completo do Eduardo Friedrich.
- [ ] Uma linha sobre o Eduardo e uma sobre o João Maneck.
- [ ] Retrato de cada um, vertical (proporção 4:5).

### Depoimentos
- [ ] Até 3 depoimentos de clubes, cada um com texto, nome da pessoa, clube e cidade, e **autorização para publicar**. Enquanto não houver nenhum, o bloco fica escondido.

### Perguntas frequentes (as 7 respostas)
- [ ] Quanto custa? Como é cobrado?
- [ ] Com quanto tempo de antecedência preciso marcar?
- [ ] Quantas quadras preciso ter?
- [ ] Vocês atendem quais cidades?
- [ ] O clube precisa fornecer algo além das quadras?
- [ ] Como funciona o chaveamento no Gripo?
- [ ] Dá para fazer torneio só de Padel, só de Beach Tennis ou misto?

### Fotos a enviar (lista completa)

Colocar em `public/fotos/`, em WebP. Cada foto entra sozinha no site no próximo build.

| Arquivo | Onde aparece | Proporção |
|---|---|---|
| `padel.webp` | Modalidades | 4:3 horizontal |
| `beach-tennis.webp` | Modalidades | 4:3 horizontal |
| `torneio-01.webp` | Galeria (destaque) | 1:1 |
| `torneio-02.webp` a `torneio-07.webp` | Galeria | 1:1 |
| `torneio-08.webp` | Galeria (faixa larga) | 2:1 horizontal |
| `eduardo.webp`, `joao.webp` | Quem organiza | 4:5 vertical |

---

## 2. Testes manuais antes de publicar

### Celular Android intermediário (aparelho real, não emulador)
- [ ] A página abre com a bola estática; ao tocar ou rolar, a bola 3D entra sem salto de layout.
- [ ] A bola gira de forma fluida e não esquenta o aparelho nem trava a rolagem.
- [ ] O menu abre e fecha, e cada âncora leva à seção certa, sem o título ficar escondido atrás do cabeçalho.
- [ ] O botão flutuante de WhatsApp só aparece depois que a hero sai da tela.

### Rolagem por cima da bola
- [ ] No celular, arrastar o dedo em cima da bola rola a página normalmente (a bola não "segura" o toque).
- [ ] No computador, a roda do mouse em cima da bola rola a página, sem zoom na bola.
- [ ] No computador, a bola inclina de leve seguindo o mouse.

### Movimento reduzido (`prefers-reduced-motion`)
- [ ] Com "reduzir movimento" ligado (Android: Acessibilidade > Remover animações; iPhone: Acessibilidade > Movimento; Windows/macOS nas configurações do sistema), a bola fica estática e o three.js não é baixado (conferir na aba Rede do DevTools).

### Links de WhatsApp no celular
- [ ] Todos os botões abrem o WhatsApp no número certo, com a mensagem "Olá! Tenho um clube e quero saber como funciona a organização de torneios com a F&M." já escrita: cabeçalho, menu, hero, botão flutuante, CTA final e rodapé.
- [ ] Testar com o WhatsApp instalado e sem ele (deve abrir a página do wa.me).

### 4G lento
- [ ] No DevTools, aba Rede, perfil "Slow 4G": o texto da hero e a bola estática aparecem rápido, sem tela em branco nem troca de fonte com salto.
- [ ] Rolando até as fotos, elas carregam sob demanda, e os espaços reservados não pulam.

### Geral
- [ ] Navegar só com o teclado (Tab, Enter, Esc): o anel de foco aparece sempre, e o "Pular para o conteúdo" surge no primeiro Tab.
- [ ] O acordeão do FAQ abre e fecha com Enter e Espaço.
- [ ] Compartilhar o link no WhatsApp e no Instagram e conferir a imagem de prévia (Open Graph).
- [ ] Safari no iPhone: bola, fontes e menu.

### Ao publicar em produção
- [ ] Na Vercel, definir `NEXT_PUBLIC_SITE_URL` com o domínio definitivo e `INDEXAR=1`. Sem essas duas variáveis, o site sai com `noindex`.
- [ ] Depois do deploy, rodar o Lighthouse mobile de novo no domínio real.
