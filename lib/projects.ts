import type { Lang } from "@/components/i18n/lang";
import { IMAGES } from "@/lib/images";

/**
 * Catálogo de proyectos del carrusel de trabajo. Vive aparte del componente:
 * añadir o editar un proyecto es tocar contenido, no tocar la UI.
 */

export interface ProjectContent {
  role: string;
  note?: string;
  blurb: string;
  results?: string[];
  tags: string[];
}

export interface Project {
  n: string;
  title: string;
  href?: string;
  figma?: string;
  github?: string;
  /** Case-study document (PDF under /public) for projects without a live URL. */
  caseUrl?: string;
  /** Internal case-study page (opens in-site, not a new tab). */
  caseHref?: string;
  /** Screenshot under /public/images — omit to show the branded placeholder. */
  img?: string;
  /** Backdrop color behind the board (fallback while the image loads). */
  bg: string;
  /** Natural aspect ratio (w/h) of the asset. The frame adopts it so the board
   * shows COMPLETE — no crop, no letterbox bars — at a uniform height. */
  ratio: number;
  /** Near-square boards leave big side margins in the fixed frame; `fill` makes
   * them cover the frame (matching the visual size of the wider boards). */
  fill?: boolean;
  /** Nudge the board up (e.g. "3%") to hide a thin edge/line at its top. */
  cropTop?: string;
  head: Record<Lang, readonly [string, string]>;
  tagline: Record<Lang, string>;
  en: ProjectContent;
  es: ProjectContent;
}

// Project screenshots are mapped in lib/images.ts. A project whose `img` is
// undefined (e.g. ReadEasily) shows the branded ImageSlot placeholder until
// its asset is added under /public/images.
export const PROJECTS: Project[] = [
  {
    n: "01", title: "DeepFilm", href: "https://www.deepfilm.ai/",
    img: IMAGES.work.deepfilm, bg: "#0a090f", ratio: 2118 / 1728, fill: true,
    head: { en: ["AI FILM,", "DIRECTED"], es: ["CINE con IA,", "DIRIGIDO"] },
    tagline: { en: "Turn a prompt into a film, an AI director for story, pacing and cut.", es: "Convierte una idea en una película, un director con IA para historia, ritmo y montaje." },
    en: {
      role: "UX/UI + Frontend", note: "Freelance · deepfilm.ai",
      blurb: "Landing page for an AI video-creation platform with a persistent agent-driven workflow. Cinematic video sections and a responsive, high-performance front-end.",
      results: ["Cinematic, motion-led UX", "Built in Next.js", "Communicates an agent workflow"],
      tags: ["Landing", "Motion", "AI Product", "Next.js"],
    },
    es: {
      role: "UX/UI + Frontend", note: "Freelance · deepfilm.ai",
      blurb: "Landing para una plataforma de creación de vídeo con IA y un flujo dirigido por agentes. Secciones de vídeo cinematográficas y un frontend responsive de alto rendimiento.",
      results: ["UX cinematográfica y con movimiento", "Hecho en Next.js", "Comunica un flujo con agentes"],
      tags: ["Landing", "Motion", "Producto IA", "Next.js"],
    },
  },
  {
    n: "02", title: "Evolution POS",
    caseHref: "/proyectos/evolution-pos",
    img: IMAGES.work.evopos, bg: "#4a9b76", ratio: 2880 / 1708,
    head: { en: ["RESTAURANTS,", "REENGINEERED"], es: ["RESTAURANTES,", "REINVENTADOS"] },
    tagline: { en: "Tables that turn faster and spend more, order & pay in seconds.", es: "Mesas que rotan más rápido y gastan más, pedir y pagar en segundos." },
    en: {
      role: "UX/UI + Frontend", note: "Product · 2022–Now",
      blurb: "Table-side ordering & payment for restaurants, plus a token-based design system that turns each brand's identity into a launch-ready, fully branded page in minutes.",
      results: ["−40% customer wait times", "+23.1% revenue YoY", "Design system → branded page in minutes"],
      tags: ["Product Design", "Design System", "React", "Zustand", "Next.js"],
    },
    es: {
      role: "UX/UI + Frontend", note: "Producto · 2022–Hoy",
      blurb: "Pedido y pago desde la mesa para restaurantes, más un sistema de diseño basado en tokens que convierte la identidad de cada marca en una página lista para lanzar en minutos.",
      results: ["−40% tiempos de espera", "+23,1% ingresos interanuales", "Sistema de diseño → página de marca en minutos"],
      tags: ["Diseño de producto", "Sistema de diseño", "React", "Zustand", "Next.js"],
    },
  },
  {
    n: "03", title: "Chef at Home",
    href: "https://chef-at-home-v1.vercel.app/",
    figma: "https://www.figma.com/design/wOuCDVihYDlaoOUXhsTDx5/Chef-at-Home?node-id=1289-52&p=f&t=2VKbsRLR5Twlv0Q7-0",
    github: "https://github.com/anakarinasuarez/chef-at-home",
    img: IMAGES.work.chef, bg: "#000000", ratio: 2150 / 1392, cropTop: "3%",
    head: { en: ["YOUR PANTRY,", "PLATED"], es: ["TU DESPENSA,", "EN UN PLATO"] },
    tagline: { en: "Never wonder what's for dinner, your ingredients, instantly plated by AI.", es: "Nunca más pienses qué cocinar, tus ingredientes servidos al instante con IA." },
    en: {
      role: "UX/UI + Frontend", note: "Personal · AI",
      blurb: "A web app that turns the ingredients you already have at home into great recipes, powered by AI.",
      results: ["AI recipe generation", "From pantry to plate", "React web app"],
      tags: ["AI", "Web App", "Personal"],
    },
    es: {
      role: "UX/UI + Frontend", note: "Personal · IA",
      blurb: "Una app web que convierte los ingredientes que ya tienes en casa en grandes recetas, con el poder de la IA.",
      results: ["Generación de recetas con IA", "De la despensa al plato", "App web en React"],
      tags: ["IA", "App web", "Personal"],
    },
  },
  {
    n: "04", title: "ReadEasily",
    href: "https://read-easily.vercel.app",
    figma: "https://www.figma.com/design/sc9DIhX0wvFgrvmL8NVBf5/ReadEasily?node-id=0-1",
    github: "https://github.com/anakarinasuarez/ReadEasily",
    img: IMAGES.work.readeasily, bg: "#f2e8d9", ratio: 2516 / 1800,
    head: { en: ["LANGUAGES,", "MADE EASY"], es: ["IDIOMAS,", "MÁS FÁCILES"] },
    tagline: { en: "A full Figma design system, ported 1:1 to a tested, accessible production app.", es: "Un design system completo en Figma, portado 1:1 a una app real, testeada y accesible." },
    en: {
      role: "UX/UI + Frontend",
      note: "Personal · Design → Code",
      blurb: "A graded-reading app to learn English through short illustrated fables: read, listen, translate and save words. Built to prove a design decision can reach production intact: a complete Figma design system (~125 tokens, 32 components) ported 1:1 to a Next.js app with strict TypeScript, 686 tests and WCAG AA accessibility.",
      results: ["Figma design system → 1:1 in code", "686 tests · WCAG AA · CI on every PR", "48 screens · ~125 tokens · 32 components"],
      tags: ["Design System", "Figma", "Next.js", "TypeScript", "Testing", "Accessibility"],
    },
    es: {
      role: "UX/UI + Frontend",
      note: "Personal · Diseño → Código",
      blurb: "Una app de lectura graduada para aprender inglés con cuentos cortos ilustrados: leer, escuchar, traducir y guardar palabras. Construida para demostrar que una decisión de diseño puede llegar a producción intacta: un design system completo en Figma (~125 tokens, 32 componentes) portado 1:1 a una app Next.js con TypeScript estricto, 686 tests y accesibilidad WCAG AA.",
      results: ["Design system en Figma → 1:1 en código", "686 tests · WCAG AA · CI en cada PR", "48 pantallas · ~125 tokens · 32 componentes"],
      tags: ["Design System", "Figma", "Next.js", "TypeScript", "Testing", "Accesibilidad"],
    },
  },
];
