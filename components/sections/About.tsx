"use client";

import { useState, useEffect, useRef } from "react";
import { useLang, type Lang } from "@/components/i18n/lang";
import { useReveal, useCountUp } from "@/lib/motion";
import { Arrow } from "@/components/ui/Arrow";
import { SkillsOrbit } from "@/components/sections/SkillsOrbit";

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  text?: string;
}

function Stat({ value, suffix, label, text }: StatProps) {
  const [ref, val] = useCountUp(value || 0);
  return (
    <div className="stat reveal">
      <div className="stat-num" ref={ref}>
        {text ? text : val}
        {suffix && <span className="stat-suffix">{suffix}</span>}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

interface ProcessStep {
  k: string;
  t: string;
  tag: string;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  text?: string;
}

interface AboutCopy {
  eyebrow: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  sub: React.ReactNode;
  cta: string;
  stepsLabel: string;
  steps: ProcessStep[];
  stats: StatItem[];
}

const ABOUT_COPY: Record<Lang, AboutCopy> = {
  en: {
    eyebrow: "About",
    title: <>I turn ideas into products<br />that <span className="serif-em">move the numbers</span>.</>,
    lead: <>Designer <b>and</b> developer, a rare full-stack profile that takes a product from the first sketch to the shipped, tested interface. No handoff gaps. No lost intent. Just outcomes.</>,
    sub: <>A decade in finance &amp; insurance taught me to chase the metric that matters. Now I bring that lens to digital products, using <span className="text-accent">AI-accelerated workflows</span> to ship faster without cutting corners on craft.</>,
    cta: "Let's build something",
    stepsLabel: "How we'd work together",
    steps: [
      { k: "Discover", t: "I dig into your users, your market and, above all, the business goal. Every pixel later traces back to a number here.", tag: "Research · Strategy" },
      { k: "Design", t: "Flows, wireframes and a polished UI in Figma, backed by a scalable design system your team can grow with.", tag: "UX/UI · Design Systems" },
      { k: "Build", t: "Production-grade front-end in React & Next.js, accessible, responsive, fast. Designed and coded by the same person.", tag: "React · Next.js · TypeScript" },
      { k: "Scale", t: "AI-accelerated workflows automate the busywork so we ship faster and iterate more, with human judgment always in the loop.", tag: "AI workflows · Automation" },
    ],
    stats: [
      { value: 3, suffix: "+", label: "Years shipping production product" },
      { value: 10, suffix: "+", label: "Years of business & finance background" },
      { value: 2, suffix: "", label: "Disciplines in a single profile" },
      { value: 100, suffix: "%", label: "Hands-on across design & code" },
    ],
  },
  es: {
    eyebrow: "Sobre mí",
    title: <>Convierto ideas en productos<br />que <span className="serif-em">mueven los números</span>.</>,
    lead: <>Diseñadora <b>y</b> desarrolladora, un perfil full-stack poco común que lleva un producto del primer boceto a la interfaz lanzada y testeada. Sin saltos en el traspaso. Sin perder la intención. Solo resultados.</>,
    sub: <>Una década en finanzas y seguros me enseñó a perseguir la métrica que importa. Hoy llevo esa mirada a los productos digitales, usando <span className="text-accent">flujos acelerados con IA</span> para lanzar más rápido sin sacrificar el detalle.</>,
    cta: "Construyamos algo",
    stepsLabel: "Cómo trabajaríamos juntos",
    steps: [
      { k: "Descubrir", t: "Investigo a tus usuarios, tu mercado y, sobre todo, el objetivo de negocio. Cada píxel después nace de un número de aquí.", tag: "Investigación · Estrategia" },
      { k: "Diseñar", t: "Flujos, wireframes y una UI cuidada en Figma, con un sistema de diseño escalable con el que tu equipo puede crecer.", tag: "UX/UI · Sistemas de diseño" },
      { k: "Construir", t: "Front-end de producción en React y Next.js, accesible, responsive y rápido. Diseñado y programado por la misma persona.", tag: "React · Next.js · TypeScript" },
      { k: "Escalar", t: "Flujos acelerados con IA automatizan lo repetitivo para lanzar más rápido e iterar más, con criterio humano siempre en el bucle.", tag: "Flujos con IA · Automatización" },
    ],
    stats: [
      { value: 3, suffix: "+", label: "Años lanzando producto en producción" },
      { value: 10, suffix: "+", label: "Años de experiencia en negocio y finanzas" },
      { value: 2, suffix: "", label: "Disciplinas en un solo perfil" },
      { value: 100, suffix: "%", label: "Implicada en diseño y código" },
    ],
  },
};

function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const N = steps.length;
  const restart = () => {
    clearInterval(timer.current ?? undefined);
    if (!auto) return;
    timer.current = setInterval(() => setActive((a) => (a + 1) % N), 3800);
  };
  useEffect(() => {
    restart();
    return () => clearInterval(timer.current ?? undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto]);
  const pick = (i: number) => { setAuto(false); setActive(i); clearInterval(timer.current ?? undefined); };

  return (
    <div className="proc">
      <div className="proc-rail">
        {steps.map((s, i) => (
          <button
            key={s.k}
            className={"proc-tab" + (i === active ? " on" : "") + (i < active ? " done" : "")}
            onClick={() => pick(i)}
          >
            <span className="proc-tab-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="proc-tab-k">{s.k}</span>
            {i === active && auto && <span className="proc-tab-bar" key={"b" + active} />}
          </button>
        ))}
      </div>
      <div className="proc-panel" key={active}>
        <span className="proc-panel-tag">{steps[active].tag}</span>
        <p className="proc-panel-t">{steps[active].t}</p>
        <div className="proc-panel-num">{String(active + 1).padStart(2, "0")}<span>/ {String(N).padStart(2, "0")}</span></div>
      </div>
    </div>
  );
}

export function About() {
  const ref = useReveal<HTMLElement>();
  const { lang } = useLang();
  const c = ABOUT_COPY[lang];
  return (
    <section id="about" className="section about" ref={ref}>
      <div className="wrap about-grid">
        <div className="about-left">
          <div className="eyebrow reveal">{c.eyebrow}</div>
          <h2 className="section-title reveal" data-delay="60">{c.title}</h2>
          <p className="about-p about-lead reveal" data-delay="120">{c.lead}</p>
          <p className="about-p reveal" data-delay="160">{c.sub}</p>
          <a href="#contact" className="btn btn-primary about-cta reveal" data-delay="200">{c.cta} <Arrow /></a>
        </div>

        <div className="about-orbit reveal" data-delay="120">
          <SkillsOrbit />
        </div>
      </div>

      <div className="wrap proc-wrap reveal">
        <div className="proc-head">
          <span className="proc-head-line" />
          <span className="proc-head-label">{c.stepsLabel}</span>
        </div>
        <ProcessSteps steps={c.steps} />
      </div>

      <div className="wrap stats-row">
        {c.stats.map((s, i) => (
          <Stat key={i} value={s.value} suffix={s.suffix} text={s.text} label={s.label} />
        ))}
      </div>
    </section>
  );
}
