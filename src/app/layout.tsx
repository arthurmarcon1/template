import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import "./globals.css";

/* Tipografia ainda nao definida. Quando a direcao visual fechar,
   carregar as fontes aqui via next/font/google (display: "swap")
   e expor como variaveis CSS no <body>. */

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
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
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
    telephone: site.telefone,
    sport: site.modalidades,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.cidade,
      addressRegion: site.estado,
      addressCountry: "BR",
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
