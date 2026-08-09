"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLang, type Lang } from "@/components/i18n/lang";
import { useReveal } from "@/lib/motion";
import { Arrow } from "@/components/ui/Arrow";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PROJECTS, type Project, type ProjectContent } from "@/lib/projects";

interface WorkCopy {
  eyebrow: string;
  title: React.ReactNode;
  visit: string;
  view: string;
  prev: string;
  next: string;
  resultsLabel: string;
  figma: string;
  code: string;
  overview: string;
  close: string;
}


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

function ScreenMedia({ p }: { p: Project }) {
  return (
    <ImageSlot
      className="sc-slot"
      shape="rect"
      src={p.img}
      sizes="(max-width: 768px) 92vw, 960px"
      placeholder={"Drop a screenshot: " + p.title}
    />
  );
}

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

function Lightbox({ p, cc, labels, onClose }: { p: Project; cc: ProjectContent; labels: WorkCopy; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  return createPortal(
    <div className="pg-page" role="dialog" aria-modal="true" aria-label={p.title}>
      <button className="pg-close" onClick={onClose} aria-label={labels.close}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      </button>

      <div className="pg-inner">
        <div className="pg-head">
          <span className="pg-n">{p.n}</span>
          <span className="pg-note">{cc.note}</span>
        </div>
        <h1 className="pg-title">{p.title}</h1>
        <p className="pg-role">{cc.role}</p>

        <div className="pg-shot">
          <ScreenMedia p={p} />
        </div>

        <div className="pg-body">
          <div className="pg-main">
            <p className="pg-blurb">{cc.blurb}</p>
            {cc.results && (
              <div className="pg-results">
                <span className="pg-results-h">{labels.resultsLabel}</span>
                <ul>{cc.results.map((r) => <li key={r}><span className="dash" />{r}</li>)}</ul>
              </div>
            )}
          </div>
          <aside className="pg-side">
            <ul className="pg-tags">{cc.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            <div className="pg-links">
              {p.href && (
                <a className="btn btn-primary pg-link" href={p.href} target="_blank" rel="noreferrer">{labels.visit} <Arrow /></a>
              )}
              {p.caseHref && (
                <a className={"btn pg-link " + (p.href ? "btn-ghost" : "btn-primary")} href={p.caseHref}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 2.75h7l5 5V20.5a.75.75 0 0 1-.75.75H6.75A.75.75 0 0 1 6 20.5v-17A.75.75 0 0 1 6.75 2.75z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M13 2.75V7.75h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                  {labels.view} <Arrow />
                </a>
              )}
              {p.caseUrl && (
                <a className={"btn pg-link " + (p.href ? "btn-ghost" : "btn-primary")} href={p.caseUrl} target="_blank" rel="noreferrer">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 2.75h7l5 5V20.5a.75.75 0 0 1-.75.75H6.75A.75.75 0 0 1 6 20.5v-17A.75.75 0 0 1 6.75 2.75z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M13 2.75V7.75h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                  {labels.view} <Arrow />
                </a>
              )}
              {p.figma && (
                <a className="btn btn-ghost pg-link" href={p.figma} target="_blank" rel="noreferrer">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 2h4v6H8a3 3 0 0 1 0-6z" fill="#F24E1E"/><path d="M12 2h4a3 3 0 0 1 0 6h-4V2z" fill="#FF7262"/><path d="M8 8h4v6H8a3 3 0 0 1 0-6z" fill="#A259FF"/><path d="M12 11a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" fill="#1ABCFE"/><path d="M8 14h4v3a3 3 0 1 1-4-3z" fill="#0ACF83"/></svg>
                  {labels.figma}
                </a>
              )}
              {p.github && (
                <a className="btn btn-ghost pg-link" href={p.github} target="_blank" rel="noreferrer">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>
                  {labels.code}
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>,
    document.body
  );
}
