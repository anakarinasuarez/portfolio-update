import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Las secciones de la home (#work, #about, #contact) son anclas, no páginas:
 * no van aquí. Solo las rutas reales, que son las que Google indexa por
 * separado.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/proyectos/evolution-pos`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
