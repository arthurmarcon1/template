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

/* URL canonica, em ordem: dominio definitivo (site.dominio ou
   NEXT_PUBLIC_SITE_URL); dominio de producao do projeto na Vercel
   (VERCEL_PROJECT_PRODUCTION_URL, o mesmo em todo deploy, e vira o
   dominio proprio assim que ele for ligado no projeto); URL do deploy
   (VERCEL_URL, muda a cada deploy); localhost em desenvolvimento.
   [CONFIRMAR: dominio definitivo] */
const vercel =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const baseUrl =
  site.dominio ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercel ? `https://${vercel}` : "http://localhost:3000");

/* A pagina e indexada. So o preview da Vercel fica de fora, para a URL
   temporaria nao concorrer com o dominio no Google. */
const preview = process.env.VERCEL_ENV === "preview";

const TITULO =
  "F&M Eventos Esportivos | Organização de torneios de Padel e Beach Tennis";
const DESCRICAO =
  "A F&M organiza o torneio de Padel e Beach Tennis do seu clube em Santa Maria e região: inscrições, chaveamento, cronograma e atendimento aos atletas. Seu clube só abre as quadras.";

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
  ...(preview && { robots: { index: false, follow: false } }),
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

/* JSON-LD: LocalBusiness com contato e area atendida. Sem endereco de
   rua: a F&M vai ate o clube, entao so cidade e estado. O telefone e
   [CONFIRMAR], mas ja e o que o site inteiro usa. */
function JsonLd() {
  const empresa = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#empresa`,
    name: site.nome,
    description: DESCRICAO,
    url: baseUrl,
    telephone: `+${site.whatsapp.digitos}`,
    logo: `${baseUrl}${site.logo.src}`,
    image: `${baseUrl}${site.logo.src}`,
    slogan: site.assinatura.join(" · "),
    knowsAbout: ["Torneios de Padel", "Torneios de Beach Tennis"],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.cidade,
      addressRegion: site.uf,
      addressCountry: "BR",
    },
    areaServed: {
      "@type": "City",
      name: site.cidade,
      containedInPlace: {
        "@type": "State",
        name: site.uf,
        containedInPlace: { "@type": "Country", name: "BR" },
      },
    },
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(empresa) }}
    />
  );
}
