import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { site, whatsappUrl } from "@/lib/site";
import "./globals.css";

/* Barlow Condensed nos titulos, Barlow no corpo. next/font hospeda os
   arquivos no proprio dominio, faz preload e gera fallback com metricas
   ajustadas (adjustFontFallback), o que evita salto de layout na troca.
   As variaveis sao lidas por design/tokens.css (--font-display/body). */

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

/* Em preview da Vercel a URL muda a cada deploy. VERCEL_URL e injetada
   automaticamente pela plataforma. O fallback so vale em desenvolvimento. */
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const indexar = process.env.INDEXAR === "1";

const TITULO =
  "F&M Eventos Esportivos | Organização de torneios de Padel e Beach Tennis";
const DESCRICAO =
  "A F&M organiza o torneio de Padel e Beach Tennis do seu clube: inscrições, chaveamento no Gripo, mesa, divulgação e premiação. Seu clube só abre as quadras.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: TITULO,
  description: DESCRICAO,
  applicationName: site.nome,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.nome,
    title: TITULO,
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
  },
  /* Preview NAO deve ser indexado. So o deploy de producao, com dominio
     definitivo, liga INDEXAR=1 (variavel de ambiente de build). */
  robots: {
    index: indexar,
    follow: indexar,
  },
};

export const viewport: Viewport = {
  themeColor: "#10313E",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* As variaveis das fontes ficam no <html> porque os tokens do
       @theme resolvem var(--font-barlow...) no :root. */
    <html
      lang="pt-BR"
      className={`${barlowCondensed.variable} ${barlow.variable}`}
    >
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}

/* JSON-LD: Organization com os contatos. Ficam de fora, de proposito,
   dados ainda nao confirmados (regiao atendida, endereco): entram quando
   o [CONFIRMAR] correspondente for resolvido. O telefone tambem e
   [CONFIRMAR], mas ja e o que o site inteiro usa. */
function JsonLd() {
  const organizacao = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organizacao`,
    name: site.nome,
    description: DESCRICAO,
    url: baseUrl,
    logo: `${baseUrl}${site.logo.src}`,
    slogan: site.assinatura.join(" · "),
    knowsAbout: ["Torneios de Padel", "Torneios de Beach Tennis"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${site.whatsapp.digitos}`,
      url: whatsappUrl,
      availableLanguage: "pt-BR",
    },
    sameAs: [site.instagram.url],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizacao) }}
    />
  );
}
