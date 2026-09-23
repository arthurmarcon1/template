# F&M Eventos Esportivos

Landing page da F&M, organizadora de torneios de Padel e Beach Tennis
para clubes. O plano de trabalho está em `docs/LANDING_FM.md`.

> Projeto em construção. Tudo que aparece entre colchetes `[ ]` é espaço
> reservado e precisa ser preenchido com informação real antes de publicar.

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

**Stack.** Next.js 16 (App Router), React 19, Tailwind v4, three.js
0.184 (carregado sob demanda), Motion, Phosphor Icons.

```
design/tokens.css              cores, tipografia, espaçamento
src/lib/site.ts                dados da empresa e placeholders
src/app/layout.tsx             SEO, dados estruturados, fontes
src/components/sections/       um arquivo por seção
src/components/ball/           bola 3D (web component + montagem)
public/bola/                   logo e imagens da bola
public/fotos/                  fotos reais dos torneios
```

**Rotas de trabalho.** `/tokens` mostra cores, tipografia e botões (só em
desenvolvimento). `/bola` é o visualizador da bola com orbit livre e
exportação OBJ/GLB (fora do índice de busca).

## Deploy na Vercel

```bash
npx vercel            # preview
npx vercel --prod     # produção
```

A página está com `noindex` ligado de propósito. Ao publicar em produção,
mudar `robots` em `src/app/layout.tsx` para `index: true, follow: true` e
preencher `NEXT_PUBLIC_SITE_URL` com o domínio definitivo.
