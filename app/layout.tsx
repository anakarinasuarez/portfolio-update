import type { Metadata } from "next";
import {
  Instrument_Serif,
  Manrope,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
// Ported design system (order matters: tokens define the CSS vars used below).
import "./styles/tokens.css";
import "./styles/sections.css";
import "./styles/fx.css";
import "./styles/chat.css";
import { LangProvider } from "@/components/i18n/lang";
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

export const metadata: Metadata = {
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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.lang}
      data-direction="editorial"
      data-accent="cream"
      data-grain="on"
      data-motion="on"
      className={`${serif.variable} ${sans.variable} ${mono.variable} ${grotesk.variable}`}
    >
      <body>
        {/* Without JS the scroll-reveal never runs — force content visible. */}
        <noscript>
          <style>{`.reveal,.reveal-rise .rise-inner{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <StructuredData />
        <a href="#content" className="skip-link">
          Saltar al contenido
        </a>
        <div className="grain" aria-hidden="true" />
        <LangProvider>
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
