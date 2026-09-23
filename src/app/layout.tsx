import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { site } from "@/lib/site";
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

const TITULO = `${site.nome} | Torneios de padel e beach tennis`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: TITULO,
  description: site.descricao,
  applicationName: site.nome,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.nome,
    title: TITULO,
    description: site.descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: site.descricao,
  },
  /* Preview NAO deve ser indexado. Trocar para index/follow apenas no
     deploy de producao, com dominio definitivo. */
  robots: {
    index: false,
    follow: false,
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

/* JSON-LD: a empresa como SportsOrganization. Os eventos (SportsEvent)
   entram quando houver calendario real de torneios. */
function JsonLd() {
  const organizacao = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    "@id": `${baseUrl}/#organizacao`,
    name: site.nome,
    description: site.descricao,
    url: baseUrl,
    telephone: `+${site.whatsapp.digitos}`,
    sport: site.modalidades,
    sameAs: [site.instagram.url],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizacao) }}
    />
  );
}
