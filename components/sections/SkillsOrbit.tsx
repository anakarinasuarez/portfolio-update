"use client";

import { useState } from "react";
import { useLang } from "@/components/i18n/lang";

type LocalizedText = { en: string; es: string };

interface SkillIcon {
  slug?: string;
  /** Direct image path (e.g. a PNG) — used instead of the /icons/<slug>.svg path. */
  src?: string;
  color?: string;
  text?: string;
}

// Flat skill list for the orbit.
// [name, {en,es} desc, icon, {en,es} cat, {en,es} level, {en[],es[]} keywords]
type Keywords = { en: string[]; es: string[] };
type SkillEntry = [
  name: string,
  desc: LocalizedText,
  icon: SkillIcon,
  category: LocalizedText,
  level: LocalizedText,
  keywords: Keywords,
];

const EXPERT = { en: "Expert", es: "Experta" };
const ADVANCED = { en: "Advanced", es: "Avanzado" };
const PROFICIENT = { en: "Proficient", es: "Sólido" };
const INTERMEDIATE = { en: "Intermediate", es: "Intermedio" };
const FRONTEND = { en: "Frontend", es: "Frontend" };
const DESIGN = { en: "Design", es: "Diseño" };
const AI = { en: "AI & Agents", es: "IA y Agentes" };
const WORKFLOW = { en: "Workflow", es: "Flujo de trabajo" };
const DEVOPS = { en: "DevOps", es: "DevOps" };

const SKILLS: SkillEntry[] = [
  ["Agents", { en: "AI-accelerated development with custom agents and automated workflows.", es: "Desarrollo acelerado con IA mediante agentes y flujos automatizados." }, { slug: "ai", color: "A78BFA" }, AI, EXPERT,
    { en: ["AI-accelerated", "Custom agents", "Agent workflows", "Automation", "Faster delivery", "Production-grade"], es: ["Acelerado con IA", "Agentes a medida", "Flujos con agentes", "Automatización", "Entrega más rápida", "Calidad producción"] }],
  ["React", { en: "Component-driven apps with hooks and Server Components.", es: "Apps por componentes con hooks y Server Components." }, { slug: "react", color: "61DAFB" }, FRONTEND, EXPERT,
    { en: ["Components", "Custom hooks", "Zustand state", "Server Components", "React 19", "Reusable UI"], es: ["Componentes", "Custom hooks", "Estado Zustand", "Server Components", "React 19", "UI reutilizable"] }],
  ["Next.js", { en: "Fullstack App Router apps with SEO-first performance.", es: "Apps fullstack con App Router y rendimiento SEO-first." }, { slug: "nextdotjs", color: "FFFFFF" }, FRONTEND, EXPERT,
    { en: ["App Router", "Server Components", "Streaming", "Caching", "SEO first", "Fullstack"], es: ["App Router", "Server Components", "Streaming", "Caching", "SEO first", "Fullstack"] }],
  ["Figma", { en: "End-to-end product design and scalable design systems.", es: "Diseño de producto y design systems escalables." }, { slug: "figma", color: "F24E1E" }, DESIGN, EXPERT,
    { en: ["Wireframes", "High-fidelity UI", "Design system", "Prototyping", "Accessibility", "Dev handoff"], es: ["Wireframes", "UI alta fidelidad", "Design system", "Prototipado", "Accesibilidad", "Handoff a dev"] }],
  ["UX/UI", { en: "User research, flows and polished, accessible interfaces.", es: "Investigación, flujos e interfaces accesibles y cuidadas." }, { text: "UX" }, DESIGN, EXPERT,
    { en: ["User research", "User flows", "Wireframes", "Interaction design", "Accessibility", "Usability testing"], es: ["Investigación", "Flujos de usuario", "Wireframes", "Diseño de interacción", "Accesibilidad", "Tests de usabilidad"] }],
  ["TypeScript", { en: "Type-safe, maintainable and scalable code.", es: "Código tipado, mantenible y escalable." }, { slug: "typescript", color: "3178C6" }, FRONTEND, ADVANCED,
    { en: ["Type-safe", "Interfaces", "Clear contracts", "Maintainable", "Scalable", "Fewer bugs"], es: ["Tipado seguro", "Interfaces", "Contratos claros", "Mantenible", "Escalable", "Menos bugs"] }],
  ["JavaScript", { en: "Interactive logic with clean, modular architecture.", es: "Lógica interactiva con arquitectura limpia y modular." }, { slug: "javascript", color: "F7DF1E" }, FRONTEND, EXPERT,
    { en: ["Modern ES6", "Promises", "Async await", "Modular", "Clean code", "Scalable"], es: ["ES6 moderno", "Promises", "Async await", "Modular", "Código limpio", "Escalable"] }],
  ["Tailwind", { en: "Utility-first, token-driven responsive UIs.", es: "UIs responsive utility-first basadas en tokens." }, { slug: "tailwindcss", color: "38BDF8" }, FRONTEND, ADVANCED,
    { en: ["Utility-first", "Responsive", "Design tokens", "JIT compiler", "Fast delivery", "Consistent UI"], es: ["Utility-first", "Responsive", "Design tokens", "Compilador JIT", "Entrega rápida", "UI consistente"] }],
  ["HTML5", { en: "Semantic, accessible markup built for SEO.", es: "Marcado semántico y accesible, listo para SEO." }, { slug: "html5", color: "E34F26" }, FRONTEND, EXPERT,
    { en: ["Semantic", "Accessible", "ARIA", "WCAG", "SEO ready", "Maintainable"], es: ["Semántico", "Accesible", "ARIA", "WCAG", "Listo para SEO", "Mantenible"] }],
  ["CSS3", { en: "Scalable, mobile-first, system-driven interfaces.", es: "Interfaces escalables, mobile-first y por sistema." }, { slug: "css", color: "663399" }, FRONTEND, EXPERT,
    { en: ["Mobile-first", "Flexbox", "Grid", "Design tokens", "Animations", "Scalable"], es: ["Mobile-first", "Flexbox", "Grid", "Design tokens", "Animaciones", "Escalable"] }],
  ["Zustand", { en: "Minimal, fast global state for React.", es: "Estado global mínimo y rápido en React." }, { src: "/icons/zustand.webp", color: "A9743F" }, FRONTEND, PROFICIENT,
    { en: ["Global state", "Minimal", "Fast", "No boilerplate", "Simple API", "React"], es: ["Estado global", "Mínimo", "Rápido", "Sin boilerplate", "API simple", "React"] }],
  ["GitHub", { en: "PR-based collaboration with reviews and CI.", es: "Colaboración por PRs con reviews y CI." }, { slug: "github", color: "FFFFFF" }, WORKFLOW, EXPERT,
    { en: ["Pull Requests", "Code reviews", "Automated CI", "Testing", "Collaboration", "Clean history"], es: ["Pull Requests", "Code reviews", "CI automatizado", "Testing", "Colaboración", "Historial limpio"] }],
  ["Git", { en: "Version control with a clean commit history.", es: "Control de versiones con historial limpio." }, { slug: "git", color: "F05032" }, WORKFLOW, EXPERT,
    { en: ["Version control", "Feature branches", "Branching", "Clean commits", "Rebase", "Collaboration"], es: ["Control de versiones", "Ramas de feature", "Branching", "Commits limpios", "Rebase", "Colaboración"] }],
  ["Docker", { en: "Reproducible, containerized environments.", es: "Entornos reproducibles y en contenedores." }, { slug: "docker", color: "2496ED" }, DEVOPS, INTERMEDIATE,
    { en: ["Containers", "Reproducible", "Docker Compose", "Isolation", "Portability", "Dev to prod"], es: ["Contenedores", "Reproducible", "Docker Compose", "Aislamiento", "Portabilidad", "Dev a prod"] }],
];

export function SkillsOrbit() {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const N = SKILLS.length;
  const ic = SKILLS[active][2];
  const tool = ic.color ? "#" + ic.color : "var(--accent)";
  return (
    <div className="cap-orbit in-about" style={{ "--tool": tool } as React.CSSProperties}>
      <div className="orbit-center">
        <div className="cube3d" aria-hidden="true">
          {["cf-front","cf-back","cf-right","cf-left","cf-top","cf-bottom"].map((f, i) => {
            // Vertical faces carry a keyword each; the lid + base (top/bottom)
            // show the skill's icon embossed in black & white — no text there, so
            // nothing ever reads upside-down when the box tilts.
            const isLid = f === "cf-top" || f === "cf-bottom";
            return (
              <span className={"cube-face " + f} key={f}>
                {isLid ? (
                  <span className="cf-emblem" key={active}>
                    {ic.slug || ic.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="cf-emblem-logo" src={ic.src ?? "/icons/" + ic.slug + ".svg"} alt="" width={64} height={64} />
                    ) : (
                      <span className="cf-emblem-mono">{ic.text}</span>
                    )}
                  </span>
                ) : (
                  <span className="cf-label" key={active}>
                    <span className="cf-lv">{SKILLS[active][4][lang]}</span>
                    <span className="cf-key">{SKILLS[active][0]}</span>
                    <span className="cf-kw">{SKILLS[active][5][lang][i]}</span>
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
      <div className="orbit-rotor">
        {SKILLS.map(([name, , icon], i) => (
          <div className="orbit-item" key={name} style={{ "--a": (i / N) * 360 + "deg" } as React.CSSProperties}>
            <button
              className={"cap-badge" + (active === i ? " on" : "")}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={name}
            >
              <span className="cap-badge-ring">
                {icon.slug || icon.src ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="cap-badge-logo" src={icon.src ?? "/icons/" + icon.slug + ".svg"} alt={name} width={24} height={24} loading="lazy" />
                  </>
                ) : (
                  <span className="cap-badge-mono">{icon.text}</span>
                )}
              </span>
              <span className="cap-badge-name">{name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
