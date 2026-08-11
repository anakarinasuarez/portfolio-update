import type { MetadataRoute } from "next";

import { LANGS } from "@/lib/lang";
import { siteUrl } from "@/lib/site";

/**
 * Una entrada por idioma y ruta real. Las secciones de la home (#work, #about,
 * #contact) son anclas, no páginas: no van aquí.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return LANGS.flatMap((lang) => [
    {
      url: `${siteUrl}/${lang}`,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/${lang}/proyectos/evolution-pos`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    },
  ]);
}
