import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Archivo, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/* Par tipografico A (taste-skill Secao 4.1).
   display: "swap" e obrigatorio. adjustFontFallback fica ligado (padrao
   do next/font): ele gera uma fonte de fallback com metricas ajustadas
   por size-adjust, que e o que impede o troca-fonte de gerar CLS.
   O preload dos woff2 tambem e automatico para os subsets declarados. */

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  preload: true,
  axes: ["opsz"],
  /* A segunda voz do titulo e italico de verdade. Sem carregar o estilo
     o navegador sintetiza um falso italico inclinando a romana, o que
     num display de 7rem fica evidente. */
  style: ["normal", "italic"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
});

/* Em preview da Vercel a URL muda a cada deploy. VERCEL_URL e injetada
   automaticamente pela plataforma. O fallback so vale em desenvolvimento. */
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const TITULO = "ResinArt | Mentoria em resina composta com Uilian Machado";
const DESCRICAO =
  "Mentoria em odontologia restauradora para dentistas que querem dominar resina composta e resolver na própria cadeira os casos complexos que hoje encaminham.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: TITULO,
  description: DESCRICAO,
  applicationName: "ResinArt",
  authors: [{ name: site.nome }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "ResinArt",
    title: TITULO,
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
  },
  /* Preview NAO deve ser indexado. Trocar para index/follow apenas no
     deploy de producao, com dominio definitivo. */
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  /* A pagina e escura e travada. Um valor so. */
  themeColor: "#0A0A0B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${bodoni.variable} ${archivo.variable} ${geistMono.variable}`}
      >
        <a href="#hero" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}

/* ---------------------------------------------------------------------------
   JSON-LD

   Dois tipos: Dentist (o profissional) e Course (a ResinArt).

   O que NAO esta aqui, de proposito: AggregateRating. Os 98% vem de 25
   avaliacoes do Facebook, que sao de terceiro e nao avaliacoes coletadas
   pelo proprio site. Marcar isso como AggregateRating do Course seria
   review auto-declarada, o que as diretrizes do Google tratam como spam
   estrutural e pode render penalidade manual. O numero continua na pagina
   como texto, que e legitimo. So nao vai para o schema.

   Enquanto hasCourseInstance e offers estiverem com placeholder, o Course
   nao fica elegivel a rich result. Isso e esperado nesta fase.
   --------------------------------------------------------------------------- */
function JsonLd() {
  const dentista = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${baseUrl}/#dentista`,
    name: site.nome,
    description:
      "Cirurgião-dentista e professor, especializado em casos complexos e retratamentos em resina composta e laminados cerâmicos.",
    url: baseUrl,
    // PLACEHOLDER: telefone no formato +55DDNUMERO
    telephone: "[+55 00 00000-0000]",
    address: {
      "@type": "PostalAddress",
      addressLocality: "[cidade]",
      addressRegion: site.estado,
      addressCountry: "BR",
      streetAddress: "[endereço da clínica]",
      postalCode: "[CEP]",
    },
    sameAs: [site.instagram.url],
    medicalSpecialty: "Dentistry",
    knowsAbout: [
      "Resina composta",
      "Laminados cerâmicos",
      "Retratamento estético",
      "Odontologia restauradora",
    ],
  };

  const curso = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${baseUrl}/#curso`,
    name: "ResinArt",
    description:
      "Mentoria em odontologia estética e restauradora para cirurgiões-dentistas, focada em execução de casos complexos em resina composta.",
    url: `${baseUrl}/#metodo`,
    inLanguage: "pt-BR",
    provider: {
      "@type": "Person",
      "@id": `${baseUrl}/#dentista`,
      name: site.nome,
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "Cirurgião-dentista",
    },
    // PLACEHOLDER: preencher quando turma, formato e preco existirem.
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "[online, presencial ou híbrido]",
      courseWorkload: "[ISO 8601, ex. PT40H]",
      startDate: "[AAAA-MM-DD]",
      location: {
        "@type": "Place",
        name: "[local ou plataforma]",
      },
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: "[valor]",
      availability: "https://schema.org/PreOrder",
      url: site.whatsapp,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([dentista, curso]),
      }}
    />
  );
}
