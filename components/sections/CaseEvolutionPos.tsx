"use client";

import Image from "next/image";
import { useLang, type Lang } from "@/components/i18n/lang";

type Loc = Record<Lang, string>;
type Step = { n: string; img: string; title: Loc; text: Loc };

const STEPS: Step[] = [
  {
    n: "01", img: "/images/evo/01.webp",
    title: { es: "Entrar a la mesa", en: "Enter the table" },
    text: {
      es: "El comensal escanea el QR de su mesa y entra al instante, sin apps ni esperas. El sistema detecta la mesa automáticamente.",
      en: "The diner scans the table QR and is in instantly — no app, no waiting. The system detects the table automatically.",
    },
  },
  {
    n: "02", img: "/images/evo/02.webp",
    title: { es: "Menú del restaurante", en: "Restaurant menu" },
    text: {
      es: "Explora el menú por categorías, con fotos, precios y descripciones claras. El pedido en curso vive siempre a la vista.",
      en: "Browse the menu by category, with photos, prices and clear descriptions. The running order stays in view at all times.",
    },
  },
  {
    n: "03", img: "/images/evo/03.webp",
    title: { es: "Detalle del plato", en: "Dish detail" },
    text: {
      es: "Personaliza cada plato (extras, cantidad) y lo añade al pedido con el precio actualizado en vivo.",
      en: "Customize each dish (extras, quantity) and add it to the order with the price updated live.",
    },
  },
  {
    n: "04", img: "/images/evo/04.webp",
    title: { es: "Tu pedido", en: "Your order" },
    text: {
      es: "Revisa el pedido, deja una nota para la cocina y lo envía. Los totales son siempre transparentes.",
      en: "Review the order, leave a note for the kitchen and send it. Totals are always transparent.",
    },
  },
  {
    n: "05", img: "/images/evo/05.webp",
    title: { es: "Pagar desde la mesa", en: "Pay from the table" },
    text: {
      es: "Paga sin esperar al camarero: propina sugerida y pago con Apple Pay o tarjeta en segundos.",
      en: "Pay without waiting for staff: suggested tip and Apple Pay or card checkout in seconds.",
    },
  },
  {
    n: "06", img: "/images/evo/06.webp",
    title: { es: "Dividir la cuenta", en: "Split the bill" },
    text: {
      es: "Divide la cuenta a partes iguales, por platos o manual, y cada comensal paga su parte con un enlace.",
      en: "Split the bill equally, by items or manually — each guest pays their share via a link.",
    },
  },
  {
    n: "07", img: "/images/evo/07.webp",
    title: { es: "Reservar mesa", en: "Reserve a table" },
    text: {
      es: "Reserva mesa eligiendo fecha, hora y número de comensales, con confirmación inmediata.",
      en: "Book a table by picking date, time and party size, with instant confirmation.",
    },
  },
  {
    n: "08", img: "/images/evo/08.webp",
    title: { es: "Estado del pedido", en: "Order status" },
    text: {
      es: "Sigue el pedido en tiempo real (confirmado → en preparación → en camino → servido) y llama al camarero si hace falta.",
      en: "Track the order live (confirmed → preparing → on the way → served) and call the waiter if needed.",
    },
  },
];

type Copy = {
  back: string; kind: string; tagline: string;
  roleL: string; role: string; whenL: string; when: string; stackL: string; stack: string;
  overviewL: string; overview: string;
  flowL: string; flowSub: string;
  metricsL: string; metrics: { v: string; l: string }[];
  dsL: string; ds: string; dsCap: string;
  tagsL: string; tags: string[];
  backToWork: string;
};

const COPY: Record<Lang, Copy> = {
  es: {
    back: "Proyectos",
    kind: "Caso de estudio · Producto",
    tagline: "Reserva, pide y paga desde la mesa.",
    roleL: "Rol", role: "Desarrolladora Frontend & Diseñadora UX/UI",
    whenL: "Periodo", when: "2022 — Hoy",
    stackL: "Stack", stack: "React · Zustand · Next.js",
    overviewL: "El proyecto",
    overview:
      "Evolution POS es un producto de pedido y pago desde la mesa para restaurantes. Elimina la fricción de depender del personal para pedir y pagar: el comensal escanea, pide y paga desde su móvil, y las mesas rotan más rápido. Incluye un sistema de diseño basado en tokens que convierte la identidad de cada restaurante en una app de marca lista para lanzar en minutos.",
    flowL: "El flujo, paso a paso",
    flowSub: "Ocho pantallas que llevan al comensal de sentarse a pagar, sin esperas.",
    metricsL: "Impacto",
    metrics: [
      { v: "−40%", l: "tiempos de espera" },
      { v: "+23,1%", l: "ingresos interanuales" },
      { v: "Minutos", l: "del sistema de diseño a una página de marca" },
    ],
    dsL: "Un sistema, muchas marcas",
    ds: "No diseñé una app, diseñé un sistema. Evolution POS se apoya en un design system basado en tokens (color, tipografía, radios, sombras): los componentes son los mismos para todos los restaurantes, pero cada uno mantiene su propia identidad. Cambiar la marca —colores, logo, tono— genera una app completamente branded, lista para lanzar en minutos, sin reescribir cada pantalla.",
    dsCap: "Tokens de color (claro/oscuro) en Figma: la base del sistema.",
    tagsL: "Disciplinas",
    tags: ["Diseño de producto", "Sistema de diseño", "React", "Zustand", "Next.js"],
    backToWork: "Volver a proyectos",
  },
  en: {
    back: "Work",
    kind: "Case study · Product",
    tagline: "Book, order and pay from the table.",
    roleL: "Role", role: "Frontend Developer & UX/UI Designer",
    whenL: "Timeframe", when: "2022 — Now",
    stackL: "Stack", stack: "React · Zustand · Next.js",
    overviewL: "The project",
    overview:
      "Evolution POS is a table-side ordering & payment product for restaurants. It removes the friction of depending on staff to order and pay: the diner scans, orders and pays from their phone, and tables turn faster. It ships with a token-based design system that turns each restaurant's identity into a launch-ready, fully branded app in minutes.",
    flowL: "The flow, step by step",
    flowSub: "Eight screens that take the diner from sitting down to paying — with no waiting.",
    metricsL: "Impact",
    metrics: [
      { v: "−40%", l: "customer wait times" },
      { v: "+23.1%", l: "revenue year over year" },
      { v: "Minutes", l: "from design system to a branded page" },
    ],
    dsL: "One system, many brands",
    ds: "I didn't design an app — I designed a system. Evolution POS runs on a token-based design system (colour, type, radii, shadows): the components are the same for every restaurant, but each keeps its own identity. Swapping the brand — colours, logo, tone — produces a fully branded, launch-ready app in minutes, without rewriting each screen.",
    dsCap: "Color tokens (light/dark) in Figma — the foundation of the system.",
    tagsL: "Disciplines",
    tags: ["Product Design", "Design System", "React", "Zustand", "Next.js"],
    backToWork: "Back to work",
  },
};

export function CaseEvolutionPos() {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
    <article className="case">
      <div className="wrap case-top">
        <a href="/?project=evolution-pos#work" className="case-back">← {c.back}</a>
        <span className="case-kind">{c.kind}</span>
      </div>

      <header className="wrap case-hero">
        <h1 className="case-title">Evolution POS</h1>
        <p className="case-tagline">{c.tagline}</p>
        <ul className="case-meta">
          <li><span>{c.roleL}</span>{c.role}</li>
          <li><span>{c.whenL}</span>{c.when}</li>
          <li><span>{c.stackL}</span>{c.stack}</li>
        </ul>
      </header>

      <section className="wrap case-overview">
        <h2 className="case-h">{c.overviewL}</h2>
        <p className="case-lead">{c.overview}</p>
      </section>

      <section className="wrap case-metrics" aria-label={c.metricsL}>
        {c.metrics.map((m) => (
          <div className="case-metric" key={m.l}>
            <span className="cm-val">{m.v}</span>
            <span className="cm-label">{m.l}</span>
          </div>
        ))}
      </section>

      <section className="wrap case-flow">
        <div className="case-flow-head">
          <h2 className="case-h">{c.flowL}</h2>
          <p className="case-flow-sub">{c.flowSub}</p>
        </div>
        <div className="case-steps">
          {STEPS.map((s) => (
            <div className="case-step" key={s.n}>
              <div className="cs-shot">
                <Image
                  src={s.img}
                  alt={s.title[lang]}
                  fill
                  sizes="(max-width: 720px) 60vw, 300px"
                  className="cs-img"
                />
              </div>
              <div className="cs-copy">
                <span className="cs-n">{s.n}</span>
                <h3 className="cs-title">{s.title[lang]}</h3>
                <p className="cs-text">{s.text[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap case-ds">
        <h2 className="case-h">{c.dsL}</h2>
        <p className="case-lead case-ds-lead">{c.ds}</p>
      </section>

      <section className="wrap case-foot">
        <div className="case-tags">
          <span className="case-tags-l">{c.tagsL}</span>
          <ul>{c.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="case-actions">
          <a href="/?project=evolution-pos#work" className="btn btn-primary">← {c.backToWork}</a>
        </div>
      </section>
    </article>
  );
}
