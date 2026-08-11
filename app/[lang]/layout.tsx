import type { Metadata } from "next";
import {
  Instrument_Serif,
  Manrope,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import "../globals.css";
// Ported design system (order matters: tokens define the CSS vars used below).
import "../styles/tokens.css";
import "../styles/sections.css";
import "../styles/fx.css";
import "../styles/chat.css";
import { LangProvider } from "@/components/i18n/lang";
import { LANGS, type Lang } from "@/lib/lang";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ChatLazy } from "@/components/chat/ChatLazy";
import { Fx } from "@/components/fx/Fx";
import { StructuredData } from "@/components/seo/StructuredData";
import { siteConfig, siteUrl } from "@/lib/site";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  // Only used for small labels — don't let it compete in the preload with the
  // serif that drives the LCP (nav logo / hero name).
  preload: false,
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name}, ${siteConfig.shortTitle}`,
    template: `%s, ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  keywords: [
    "Frontend Developer",
    "UX/UI Designer",
    "Diseñadora UX/UI",
    "React",
    "Next.js",
    "TypeScript",
    "Design Systems",
    "AI workflows",
    "Sevilla",
    "portfolio",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name}, ${siteConfig.shortTitle}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}, ${siteConfig.shortTitle}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Sin `icons`: app/icon.tsx y app/apple-icon.tsx generan la marca en build y
  // Next inserta sus etiquetas solo. Declararlo aquí las pisaría.
};

/** Prerenderiza /es y /en; no hay más idiomas que descubrir en runtime. */
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

/**
 * Metadata por idioma: título, descripción y og:locale cambian, y `alternates`
 * declara el hreflang recíproco que le dice a Google que son la misma página.
 */
type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    ...baseMetadata,
    description: isEn ? siteConfig.descriptionEn : siteConfig.description,
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
        "x-default": `${siteUrl}/es`,
      },
    },
    openGraph: {
      ...baseMetadata.openGraph,
      url: `${siteUrl}/${lang}`,
      locale: isEn ? "en_US" : "es_ES",
      description: isEn ? siteConfig.descriptionEn : siteConfig.description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LangParams & { children: React.ReactNode }) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      data-direction="editorial"
      data-accent="cream"
      data-grain="on"
      data-motion="on"
      className={`${serif.variable} ${sans.variable} ${mono.variable} ${grotesk.variable}`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) add
          attributes like `cz-shortcut-listen` to <body> before React hydrates,
          which is harmless but triggers a dev-only hydration warning. */}
      <body suppressHydrationWarning>
        {/* Without JS the scroll-reveal never runs — force content visible. */}
        <noscript>
          <style>{`.reveal,.reveal-rise .rise-inner{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <StructuredData />
        <a href="#content" className="skip-link">
          Saltar al contenido
        </a>
        <div className="grain" aria-hidden="true" />
        <LangProvider lang={lang as Lang}>
          <Fx />
          <Nav />
          <main id="content">{children}</main>
          <Footer />
          <ChatLazy />
        </LangProvider>
      </body>
    </html>
  );
}
