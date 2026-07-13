import { siteConfig, siteUrl, socialLinks } from "@/lib/site";

/**
 * Datos estructurados JSON-LD (Person + WebSite).
 * Renderiza <script type="application/ld+json"> según la recomendación oficial
 * de Next.js. Sanitiza "<" para evitar inyección XSS vía JSON.stringify.
 */
export function StructuredData() {
  const personId = `${siteUrl}/#person`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        jobTitle: siteConfig.jobTitle,
        description: siteConfig.description,
        url: siteUrl,
        image: `${siteUrl}/images/image-me.webp`,
        email: `mailto:${siteConfig.email}`,
        telephone: siteConfig.phone,
        sameAs: socialLinks,
        knowsLanguage: ["es", "en"],
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.city,
          addressRegion: siteConfig.location.region,
          addressCountry: siteConfig.location.country,
        },
        knowsAbout: [
          "Frontend Development",
          "UX/UI Design",
          "Design Systems",
          "React",
          "Next.js",
          "TypeScript",
          "AI-assisted development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: `${siteConfig.name} — ${siteConfig.shortTitle}`,
        url: siteUrl,
        inLanguage: ["es", "en"],
        description: siteConfig.description,
        author: { "@id": personId },
        publisher: { "@id": personId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
