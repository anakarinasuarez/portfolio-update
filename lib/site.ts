/**
 * Configuración central del sitio — fuente de verdad para SEO, JSON-LD y contacto.
 * Los textos de secciones viven en cada componente (i18n ES/EN).
 */

// URL de producción. En Vercel define NEXT_PUBLIC_SITE_URL en las env vars.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://anakarinasuarez.vercel.app"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Ana Karina Suárez González",
  firstName: "Ana Karina",
  jobTitle: "Frontend Developer & UX/UI Designer",
  shortTitle: "UI/UX Designer & Front-end Developer",
  description:
    "Portfolio de Ana Karina Suárez González, Frontend Developer y diseñadora UX/UI en Sevilla. " +
    "Diseño y construyo productos digitales accesibles y rápidos con React, Next.js y flujos de trabajo con IA.",
  descriptionEn:
    "Portfolio of Ana Karina Suárez González, Frontend Developer and UX/UI Designer based in Seville. " +
    "I design and build accessible, fast digital products with React, Next.js and AI-accelerated workflows.",
  locale: "es_ES",
  lang: "es",
  location: {
    city: "Sevilla",
    region: "Andalucía",
    country: "ES",
  },
  email: "karinasuarezdos@gmail.com",
  // Fuera del JSON-LD a propósito: ahí lo cosechan los rastreadores sin que
  // ningún humano lo lea. Sigue visible en Contacto, para quien quiera llamar.
  phone: "+34698347608",
  phoneDisplay: "+34 698 347 608",
  cv: {
    en: "/cvs/anakarinasuarez-cv-en.pdf",
    es: "/cvs/anakarinasuarez-cv-esp.pdf",
  },
  // Perfiles públicos para JSON-LD `sameAs` y el footer. NO incluir aquí otro
  // portfolio: `sameAs` le dice a Google "esta persona también es esa web", y
  // apuntar al Webflow antiguo repartía la señal entre dos sitios.
  social: {
    github: "https://github.com/anakarinasuarez",
    linkedin: "https://www.linkedin.com/in/connect-ana-karina-su%C3%A1rez-gonz%C3%A1lez/",
  },
} as const;

// Enlaces de navegación → anclas de las secciones de la home.
export const navItems = [
  { href: "#work", label: "Proyectos" },
  { href: "#about", label: "Sobre mí" },
  { href: "#contact", label: "Contacto" },
] as const;

// Perfiles sociales como array (para iterar en JSON-LD `sameAs`).
export const socialLinks = Object.values(siteConfig.social);
