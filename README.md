# Torneios de padel e beach tennis

Landing page da [Nome da empresa], organizadora de torneios de padel e
beach tennis.

> Projeto em construção. Tudo que aparece entre colchetes `[ ]` é espaço
> reservado e precisa ser preenchido com informação real antes de publicar.

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

**Stack.** Next.js 16 (App Router), React 19, Tailwind v4, Motion,
Phosphor Icons.

```
design/tokens.css              cores, tipografia, espaçamento
src/lib/site.ts                dados da empresa e placeholders
src/app/layout.tsx             SEO, dados estruturados, fontes
src/components/sections/       um arquivo por seção
public/                        imagens e vídeos
```

## Deploy na Vercel

```bash
npx vercel            # preview
npx vercel --prod     # produção
```

A página está com `noindex` ligado de propósito. Ao publicar em produção,
mudar `robots` em `src/app/layout.tsx` para `index: true, follow: true` e
preencher `NEXT_PUBLIC_SITE_URL` com o domínio definitivo.
