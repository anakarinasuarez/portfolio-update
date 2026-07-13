"use client";

import { useLang, type Lang } from "@/components/i18n/lang";
import { Arrow } from "@/components/ui/Arrow";
import { Logo } from "@/components/ui/Logo";

type FooterCopy = {
  role: string;
  nav: ReadonlyArray<readonly [string, string]>;
  top: string;
  tag: string;
};

const FOOTER_COPY: Record<Lang, FooterCopy> = {
  en: {
    role: "Frontend Developer · UX/UI Designer · AI Engineer",
    nav: [
      ["Work", "#work"],
      ["About", "#about"],
      ["Contact", "#contact"],
    ],
    top: "Back to top",
    tag: "Designed & built by Ana Karina — with a little help from AI agents.",
  },
  es: {
    role: "Desarrolladora Frontend · Diseñadora UX/UI · AI Engineer",
    nav: [
      ["Proyectos", "#work"],
      ["Sobre mí", "#about"],
      ["Contacto", "#contact"],
    ],
    top: "Volver arriba",
    tag: "Diseñado y construido con mucho amor por Ana Karina, con ayuda de la IA.",
  },
};

export function Footer() {
  const { lang } = useLang();
  const c = FOOTER_COPY[lang];
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Logo />
          <p>
            Ana Karina Suárez González
            <br />
            <span>{c.role}</span>
          </p>
        </div>
        <nav
          className="footer-nav"
          aria-label={lang === "es" ? "Pie de página" : "Footer"}
        >
          {c.nav.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <button
          className="footer-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {c.top} <Arrow />
        </button>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 Ana Karina Suárez González</span>
        <span>{c.tag}</span>
      </div>
    </footer>
  );
}
