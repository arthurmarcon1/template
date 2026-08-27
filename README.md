# ResinArt / Uilian Machado

Landing page de captação para a mentoria ResinArt.
Objetivo único da página: fazer o dentista entrar na lista de espera pelo WhatsApp.

> **Esta é uma versão demonstrativa.** Tudo que aparece entre colchetes `[ ]` na
> página é espaço reservado e precisa ser preenchido com informação real antes
> de qualquer publicação. Nenhum número, data, preço ou promessa foi inventado.

---

## O que é cada seção

**1. Topo (hero).** Seu nome, o que você faz em uma frase e o botão principal.
É a única parte que a maioria das pessoas lê. À direita há um espaço reservado
para o objeto 3D que você vai mandar.

**2. Faixa de números.** Seus números de autoridade em tipografia grande.
Hoje mostra 18,2 mil seguidores e 98% de recomendação, que são reais. Faltam
alunos formados e anos de clínica.

**3. O problema.** Três blocos curtos explicando por que curso tradicional não
chega no consultório do colega. É aqui que o leitor se reconhece.

**4. O método.** As cinco etapas da mentoria, numeradas. Os nomes das etapas
estão vazios esperando você.

**5. Casos.** Galeria de fotos clínicas. **Leia a seção sobre CRO mais abaixo
antes de mandar qualquer foto.**

**6. Quem é o Uilian.** Sua foto, seu texto e suas credenciais.

**7. Depoimentos.** Três depoimentos de alunos. Hoje aparecem só iniciais e
cidade, e o texto está marcado como aguardando autorização.

**8. Perguntas.** Seis perguntas frequentes. Três já estão respondidas, três
dependem de informação sua.

**9. Chamada final.** Bloco escuro com o botão do WhatsApp.

**10. Rodapé.** CRO, Instagram, WhatsApp e cidade.

---

## O que você precisa enviar

### Textos

| O que | Onde entra |
|---|---|
| Nome das 5 etapas do método | Seção 4 |
| Uma frase por etapa, dizendo o que o colega sai sabendo fazer | Seção 4 |
| Dois parágrafos sobre você: como chegou nos retratamentos e o que espera de quem entra | Seção 6 |
| Uma frase de abertura para a galeria | Seção 5 |
| Descrição técnica de cada caso da galeria | Seção 5 |

### Números e datas

| O que | Onde entra |
|---|---|
| Quantos alunos já se formaram | Seção 2 |
| Quantos anos de clínica | Seções 2 e 6 |
| Formato dos encontros: online, presencial ou híbrido | Seção 8 |
| Frequência e duração dos encontros | Seção 8 |
| Valor e formas de pagamento | Seção 8 |
| Data de início e prazo de inscrição da próxima turma | Seção 8 |
| Número de vagas | Seção 8 |

### Dados de contato e registro

| O que | Onde entra |
|---|---|
| Número do CRO-RS | Rodapé e dados estruturados |
| WhatsApp com DDD | Todos os botões |
| Cidade da clínica | Rodapé |
| Endereço completo e CEP | Dados estruturados de busca |
| Nome da instituição onde leciona | Seção 6 |
| Especialização ou título | Seção 6 |

### Imagens

| O que | Formato |
|---|---|
| Objeto 3D do topo | Proporção 4:5, vertical |
| Seu retrato | Proporção 4:5, vertical, boa resolução |
| Fotos de caso 1, 2 e 3 | Duas em 4:5 vertical, uma em 3:2 horizontal |
| Fotos de caso 4 e 5 | 3:2 horizontal |

Mande no maior tamanho que tiver. O site converte sozinho para os formatos
leves e gera os tamanhos certos para celular e computador.

### Depoimentos

Para cada aluno: o texto do depoimento e uma **autorização por escrito** dizendo
que ele aceita aparecer no site. Enquanto não houver autorização, o depoimento
não entra. Hoje a página mostra apenas iniciais e cidade, nunca nome completo.

---

## Antes de publicar foto clínica: conformidade CRO

Foto de paciente em material de divulgação não é livre. Antes de mandar as
fotos da galeria, confirme com o CRO-RS:

1. **Consentimento específico para divulgação**, assinado e arquivado.
   O consentimento que o paciente assina para o tratamento não cobre publicação.
2. **Antes e depois tem restrição** no Código de Ética Odontológica.
   Confirme a redação vigente antes de montar qualquer par comparativo.
3. **Sem identificação do paciente** em nenhuma imagem.
4. **Sem promessa de resultado**, nem escrita nem sugerida pela composição
   das fotos.
5. **Número do CRO visível** no material.

Este é o item que mais atrasa lançamento de site de dentista. Vale resolver
primeiro.

---

## Para quem for mexer no código

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:3000
npm run build    # build de produção
npm run lint
```

**Stack.** Next.js 16 com App Router, React 19, Tailwind v4, GSAP com
ScrollTrigger e ScrollSmoother. Todas as seções são Server Components;
o movimento vive isolado em componentes cliente dentro de
`src/components/motion/`.

**Onde ficam as coisas.**

```
design/tokens.css              cores, tipografia, espaçamento e grid
src/lib/site.ts                dados da marca e todos os placeholders
src/app/layout.tsx             SEO, dados estruturados, fontes
src/components/sections/       uma pasta, um arquivo por seção
src/components/motion/         animações, uma por arquivo
```

**Para preencher os placeholders**, comece por `src/lib/site.ts`. WhatsApp,
CRO, Instagram e cidade estão todos lá em um lugar só.

**Deploy na Vercel.**

```bash
npx vercel            # cria o preview
npx vercel --prod     # publica em produção
```

A página está com `noindex` ligado de propósito, para o preview não aparecer
no Google. Ao publicar em produção, mudar `robots` em `src/app/layout.tsx`
para `index: true, follow: true` e preencher `NEXT_PUBLIC_SITE_URL` com o
domínio definitivo.
