"use client";

import { useState, useEffect, useRef } from "react";
import { useLang, type Lang } from "@/components/i18n/lang";
import { useReveal } from "@/lib/motion";
import { PROJECTS } from "@/lib/projects";
import { Lightbox } from "./work/Lightbox";
import { ScreenMedia } from "./work/ScreenMedia";
import type { WorkCopy } from "./work/types";



const WORK_COPY: Record<Lang, WorkCopy> = {
  en: {
    eyebrow: "Selected work",
    title: <>Designed,<br />built &amp; <span className="serif-em">shipped</span>.</>,
    visit: "Visit site", view: "View case", prev: "Previous", next: "Next",
    resultsLabel: "Highlights", figma: "View in Figma", code: "View code", overview: "Overview", close: "Close",
  },
  es: {
    eyebrow: "Proyectos destacados",
    title: <>Diseñado,<br />construido y <span className="serif-em">lanzado</span>.</>,
    visit: "Visitar sitio", view: "Ver caso", prev: "Anterior", next: "Siguiente",
    resultsLabel: "Destacados", figma: "Ver en Figma", code: "Ver código", overview: "Resumen", close: "Cerrar",
  },
};


export function Work() {
  const ref = useReveal<HTMLElement>();
  const { lang } = useLang();
  const c = WORK_COPY[lang];
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const N = PROJECTS.length;

  // Arriving from a project's case-study page (e.g. /?project=evolution-pos)
  // re-opens that project's modal so "back" feels continuous.
  //
  // set-state-in-effect is disabled on purpose rather than worked around: the
  // page is statically generated, so the server cannot know the query string.
  // Deriving this during render would make the server and client markup differ
  // and break hydration. Reading the URL after mount is the only correct place,
  // and it runs once — there is no cascading-render cost to avoid here.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("project");
    if (!p) return;
    const i = PROJECTS.findIndex((pr) => pr.caseHref === "/proyectos/" + p);
    if (i >= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIdx(i);
      setOpen(true);
      window.history.replaceState(null, "", "/#work");
    }
  }, []);

  const restart = () => {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => setIdx((i) => (i + 1) % N), 6000);
  };
  // Auto-advance the carousel — but PAUSE while a project is open in the
  // lightbox, so you stay on the project you clicked (no surprise switching).
  useEffect(() => {
    if (open) {
      if (timer.current !== null) window.clearInterval(timer.current);
      return;
    }
    restart();
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const onNav = (n: number) => {
    setIdx((n + N) % N);
    restart();
  };

  // Realistic 3D depth: the frame tilts in perspective following the cursor,
  // the image drifts the opposite way (true parallax — a deeper layer), and a
  // soft sheen tracks the pointer like light on a glossy print.
  const mediaRef = useRef<HTMLButtonElement>(null);
  const tilt = (e: React.MouseEvent) => {
    const el = mediaRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform =
      `perspective(1100px) rotateY(${(px * 9).toFixed(2)}deg) ` +
      `rotateX(${(-py * 7).toFixed(2)}deg)`;
    const img = el.querySelector<HTMLElement>(".sc-slot");
    if (img) {
      img.style.transform =
        `scale(1.12) translate3d(${(-px * 4).toFixed(2)}%, ${(-py * 4).toFixed(2)}%, 0)`;
    }
    const glare = el.querySelector<HTMLElement>(".ed-glare");
    if (glare) {
      glare.style.opacity = "1";
      glare.style.background =
        `radial-gradient(circle at ${((px + 0.5) * 100).toFixed(1)}% ${((py + 0.5) * 100).toFixed(1)}%, ` +
        `rgba(255,255,255,0.16), rgba(255,255,255,0) 45%)`;
    }
  };
  const untilt = () => {
    const el = mediaRef.current;
    if (!el) return;
    el.style.transform = "";
    const img = el.querySelector<HTMLElement>(".sc-slot");
    if (img) img.style.transform = "";
    const glare = el.querySelector<HTMLElement>(".ed-glare");
    if (glare) {
      glare.style.opacity = "0";
      glare.style.background = "";
    }
  };

  const p = PROJECTS[idx];
  const cc = p[lang];

  return (
    <section id="work" className="section work" ref={ref}>
      <div className="wrap">
        <div className="section-head">
          <div className="reveal">
            <div className="eyebrow">{c.eyebrow}</div>
            <h2 className="section-title">{c.title}</h2>
          </div>
          <div className="sc-counter reveal" data-delay="80">
            <span className="sc-counter-cur">{String(idx + 1).padStart(2, "0")}</span>
            <span className="sc-counter-tot">/ {String(N).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="ed-stage" key={idx}>
          <h3 className="ed-headline">{p.title}</h3>
          <div className="ed-media-wrap">
            <button
              className="ed-media"
              ref={mediaRef}
              data-fill={p.fill ? "true" : undefined}
              style={{ background: p.bg, ["--crop-top" as string]: p.cropTop ?? "0px" }}
              onMouseMove={tilt}
              onMouseLeave={untilt}
              onClick={() => {
                // Stop the carousel synchronously so the project you clicked is
                // exactly the one that opens (no advance in the click's race window).
                if (timer.current !== null) window.clearInterval(timer.current);
                setOpen(true);
              }}
              aria-label={p.title}
            >
              <ScreenMedia p={p} />
              <span className="ed-glare" aria-hidden="true" />
            </button>
            <button className="ed-nav ed-nav-prev" onClick={() => onNav(idx - 1)} aria-label={c.prev}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 4l-8 8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="ed-nav ed-nav-next" onClick={() => onNav(idx + 1)} aria-label={c.next}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="ed-meta">
            <p className="ed-sub">{p.tagline[lang]}</p>
            <p className="ed-meta-role">{cc.role}</p>
            <ul className="ed-meta-tags">
              {cc.tags.slice(0, 4).map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>

        <div className="sc-nav reveal">
          <div className="sc-dots">
            {PROJECTS.map((pr, i) => (
              <button key={pr.n} className={"sc-pdot" + (i === idx ? " on" : "")} onClick={() => onNav(i)} aria-label={pr.title}>
                {i === idx && <span className="sc-pdot-bar" key={"b" + idx} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {open && <Lightbox p={p} cc={cc} labels={c} onClose={() => setOpen(false)} />}
    </section>
  );
}
