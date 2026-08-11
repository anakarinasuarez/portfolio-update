"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLangHref } from "@/components/i18n/lang";
import { Arrow } from "@/components/ui/Arrow";
import { ScreenMedia } from "./ScreenMedia";
import type { Project, ProjectContent } from "@/lib/projects";
import type { WorkCopy } from "./types";

export function Lightbox({ p, cc, labels, onClose }: { p: Project; cc: ProjectContent; labels: WorkCopy; onClose: () => void }) {
  const withLang = useLangHref();
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
                <a className={"btn pg-link " + (p.href ? "btn-ghost" : "btn-primary")} href={withLang(p.caseHref)}>
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
