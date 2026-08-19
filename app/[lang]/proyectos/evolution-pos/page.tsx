import type { Metadata } from "next";

import { CaseEvolutionPos } from "@/components/sections/CaseEvolutionPos";
import { LANGS } from "@/lib/lang";
import { siteUrl } from "@/lib/site";

const PATH = "/proyectos/evolution-pos";

const COPY = {
  es: {
    title: "Evolution POS · Caso de estudio",
    description:
      "Caso de estudio — Evolution POS: pedido y pago desde la mesa para restaurantes, más un sistema de diseño basado en tokens. UX/UI y frontend de Ana Karina Suárez.",
    ogDescription:
      "Pedido y pago desde la mesa para restaurantes, más un sistema de diseño basado en tokens.",
  },
  en: {
    title: "Evolution POS · Case study",
    description:
      "Case study — Evolution POS: table-side ordering & payment for restaurants, plus a token-based design system. UX/UI design and frontend by Ana Karina Suárez.",
    ogDescription:
      "Table-side ordering & payment for restaurants, plus a token-based design system.",
  },
} as const;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

/**
 * El canonical tiene que llevar el idioma. Apuntando a `/proyectos/...` sin
 * prefijo señalaba una URL que ahora redirige, y ambas versiones declaraban la
 * misma: Google lo leía como que la inglesa era un duplicado de la española y
 * no indexaba ninguna.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const c = COPY[lang === "en" ? "en" : "es"];
  const url = `${siteUrl}/${lang}${PATH}`;

  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: url,
      languages: {
        es: `${siteUrl}/es${PATH}`,
        en: `${siteUrl}/en${PATH}`,
        "x-default": `${siteUrl}/es${PATH}`,
      },
    },
    openGraph: {
      title: c.title,
      description: c.ogDescription,
      url,
      locale: lang === "en" ? "en_US" : "es_ES",
      type: "article",
    },
  };
}

export default function EvolutionPosCasePage() {
  return <CaseEvolutionPos />;
}
