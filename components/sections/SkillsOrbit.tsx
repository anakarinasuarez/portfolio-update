"use client";

import { useState } from "react";
import { useLang } from "@/components/i18n/lang";

type LocalizedText = { en: string; es: string };

interface SkillIcon {
  slug?: string;
  color?: string;
  text?: string;
}

// Flat skill list for the orbit. [name, {en,es} desc, icon, {en,es} cat]
type SkillEntry = [
  name: string,
  desc: LocalizedText,
  icon: SkillIcon,
  category: LocalizedText,
];

const SKILLS: SkillEntry[] = [
  ["Claude", { en: "My core build environment — designing and orchestrating AI agents end to end.", es: "Mi entorno principal — diseñando y orquestando agentes de IA de principio a fin." }, { slug: "claude", color: "D97757" }, { en: "AI & Agents", es: "IA y Agentes" }],
  ["React", { en: "My primary build tool — composable, stateful interfaces.", es: "Mi herramienta principal — interfaces componibles y con estado." }, { slug: "react", color: "61DAFB" }, { en: "Frontend", es: "Frontend" }],
  ["Next.js", { en: "Production React apps with routing, SSR and great DX.", es: "Apps React en producción con routing, SSR y gran DX." }, { slug: "nextdotjs", color: "FFFFFF" }, { en: "Frontend", es: "Frontend" }],
  ["Figma", { en: "My design home — systems, components, prototyping.", es: "Mi casa de diseño — sistemas, componentes, prototipado." }, { slug: "figma", color: "F24E1E" }, { en: "Design", es: "Diseño" }],
  ["TypeScript", { en: "Type-safe components and fewer bugs at scale.", es: "Componentes tipados y menos bugs a escala." }, { slug: "typescript", color: "3178C6" }, { en: "Frontend", es: "Frontend" }],
  ["UX/UI", { en: "Research, flows, wireframes through to polished UI.", es: "Investigación, flujos, wireframes hasta la UI final." }, { text: "UX" }, { en: "Design", es: "Diseño" }],
  ["JavaScript", { en: "The fundamentals — DOM, async, ES6+, interaction logic.", es: "Los fundamentos — DOM, async, ES6+, lógica de interacción." }, { slug: "javascript", color: "F7DF1E" }, { en: "Frontend", es: "Frontend" }],
  ["Node.js", { en: "Server-side JavaScript and tooling.", es: "JavaScript en el servidor y tooling." }, { slug: "nodedotjs", color: "5FA04E" }, { en: "Backend", es: "Backend" }],
  ["Cypress", { en: "End-to-end testing — fewer production bugs.", es: "Tests end-to-end — menos bugs en producción." }, { slug: "cypress", color: "69D3A7" }, { en: "Frontend", es: "Frontend" }],
  ["HTML5", { en: "Semantic, accessible markup.", es: "Marcado semántico y accesible." }, { slug: "html5", color: "E34F26" }, { en: "Frontend", es: "Frontend" }],
  ["CSS", { en: "Modern layout — grid, flex, animations.", es: "Layout moderno — grid, flex, animaciones." }, { slug: "css", color: "663399" }, { en: "Frontend", es: "Frontend" }],
  ["Agents", { en: "Multi-step agent workflows that automate coding, testing and review.", es: "Flujos de agentes multi-paso que automatizan código, tests y revisión." }, { text: "◇" }, { en: "AI & Agents", es: "IA y Agentes" }],
  ["Docker", { en: "Reproducible environments for build & deploy.", es: "Entornos reproducibles para build y despliegue." }, { slug: "docker", color: "2496ED" }, { en: "Backend", es: "Backend" }],
  ["Git", { en: "Version control, branching and collaboration.", es: "Control de versiones, ramas y colaboración." }, { slug: "git", color: "F05032" }, { en: "Backend", es: "Backend" }],
];

export function SkillsOrbit() {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const N = SKILLS.length;
  const ic = SKILLS[active][2];
  const tool = ic.slug ? "#" + (ic.color || "FFFFFF") : "var(--accent)";
  return (
    <div className="cap-orbit in-about" style={{ "--tool": tool } as React.CSSProperties}>
      <div className="orbit-center">
        <div className="cube3d" aria-hidden="true">
          {["cf-front","cf-back","cf-right","cf-left","cf-top","cf-bottom"].map((f) => (
            <span className={"cube-face " + f} key={f}>
              <span className="cf-cat">{SKILLS[active][3][lang]}</span>
              <span className="cf-key">{SKILLS[active][0]}</span>
              <span className="cf-desc">{SKILLS[active][1][lang]}</span>
            </span>
          ))}
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
                {icon.slug ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="cap-badge-logo" src={"/icons/" + icon.slug + ".svg"} alt={name} width={24} height={24} loading="lazy" />
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
