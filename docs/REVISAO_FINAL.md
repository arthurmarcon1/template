# Revisão final da landing F&M

## 1. Pendências para confirmar com a F&M

Tudo abaixo aparece hoje no site como `[CONFIRMAR]` ou como espaço reservado. Os textos ficam em `src/lib/conteudo.ts`, e os dados de contato e marca em `src/lib/site.ts`.

Briefing preenchido por João Maneck em 13/10/2026 (ver `fm-ajustes-briefing.md`).

### Bloqueia a publicação
- [ ] **Depoimentos de clubes**: de 1 a 3, com texto, nome, cargo, clube e **autorização para publicar**. Entram em `src/data/depoimentos.ts`; com a lista vazia, a seção fica oculta.
- [ ] **Resposta: "Como funciona o chaveamento no Grippo?"**: ficou em branco. Enquanto a resposta em `conteudo.ts` estiver vazia, a pergunta não aparece no FAQ.
- [ ] **Fotos**: ver a lista abaixo.
- [ ] **Logo vetorial (SVG ou PDF)**: hoje o site usa um PNG de 235×235. Também a versão só com o traço (`logo-estampa.png`) e o favicon.
- [ ] **CNPJ e razão social**: aparecem no rodapé (`site.empresa`).
- [ ] **Domínio**: registrar e preencher `site.dominio` (ou `NEXT_PUBLIC_SITE_URL`).

### Confirmar com a F&M
- [ ] **WhatsApp (55) 98170-0001**: foi escrito como "5598170-0001" e termina em 0001. Testar o link num celular real.
- [x] **Nome do Eduardo**: confirmado como Eduardo Friedrich.
- [ ] **Preços públicos**: autorização para publicar R$ 1.000 e R$ 2.000. Hoje `exibirPrecos` está desligado em `src/data/config.ts` (planos mostram "Sob orçamento").
- [ ] **Mesa e arbitragem**: "mesa, tomada próxima e caixa de som" é o que a F&M leva ou o que o clube precisa ter?
- [ ] **Plano presencial**: quem opera a mesa no dia, a F&M ou a equipe do clube?
- [ ] **Divulgação / artes para o Instagram**: está na página como entrega, mas não foi confirmado no briefing.
- [ ] **Antecedência mínima**: o FAQ diz "antes de abrir as inscrições". Confirmar.
- [ ] Como funciona, passos 1 e 2: canal da conversa e o que o clube aprova antes de abrir as inscrições.
- [ ] Categorias oferecidas no Padel e no Beach Tennis, e as frases das duas modalidades.
- [ ] Uma linha sobre o Eduardo e uma sobre o João.
- [ ] Legenda (torneio, clube e data) e descrição da cena de cada foto da galeria.

### Decisão de posicionamento (opcional)
- [ ] Testar o headline "Seu clube abre as quadras. O resto é com a gente." ou usar a frase como subtítulo. Hoje o hero segue com "Seu clube, grandes torneios. Zero estresse."

### Fotos a enviar (lista completa)

Colocar em `public/fotos/`, em WebP. Cada foto entra sozinha no site no próximo build.

| Arquivo | Onde aparece | Proporção |
|---|---|---|
| ~~`padel.webp`~~ (recebida) | Modalidades | 4:3 horizontal |
| ~~`beach-tennis.webp`~~ (recebida) | Modalidades | 4:3 horizontal |
| `torneio-01.webp` | Galeria (destaque) | 1:1 |
| `torneio-02.webp` a `torneio-07.webp` | Galeria | 1:1 |
| `torneio-08.webp` | Galeria (faixa larga) | 2:1 horizontal |
| ~~`eduardo.webp`, `joao.webp`~~ (recebidas) | Quem organiza | 4:5 vertical |

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
- [ ] Ligar o domínio definitivo no projeto da Vercel (ou preencher `site.dominio`) e conferir o `<link rel="canonical">`. A página já é indexada; só o preview sai com `noindex`.
- [ ] Depois do deploy, rodar o Lighthouse mobile de novo no domínio real.
