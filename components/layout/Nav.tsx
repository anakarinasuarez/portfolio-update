"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, type Lang } from "@/components/i18n/lang";
import { Arrow } from "@/components/ui/Arrow";
import { Logo } from "@/components/ui/Logo";

type NavCopy = {
  links: ReadonlyArray<readonly [string, string]>;
  cta: string;
};

const NAV_COPY: Record<Lang, NavCopy> = {
  en: {
    links: [
      ["Work", "#work"],
      ["About", "#about"],
      ["Contact", "#contact"],
    ],
    cta: "Get in touch",
  },
  es: {
    links: [
      ["Proyectos", "#work"],
      ["Sobre mí", "#about"],
      ["Contacto", "#contact"],
    ],
    cta: "Hablemos",
  },
};

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        className={lang === "en" ? "on" : ""}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        className={lang === "es" ? "on" : ""}
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
      >
        ES
      </button>
    </div>
  );
}

export function Nav() {
  const { lang } = useLang();
  const c = NAV_COPY[lang];
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        const dy = y - lastY.current;
        if (y > 160 && dy > 6) setHidden(true);
        else if (dy < -6 || y < 120) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "nav" +
        (scrolled ? " nav-scrolled" : "") +
        (hidden && !open ? " nav-hidden" : "")
      }
    >
      <div className="nav-inner wrap">
        <a href="#top" className="brand" aria-label="Ana Karina Suárez — inicio">
          <Logo />
        </a>
        <nav className="nav-links" aria-label={lang === "es" ? "Principal" : "Primary"}>
          {c.links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <LangToggle />
          <a href="#contact" className="btn btn-primary nav-btn">
            {c.cta} <Arrow />
          </a>
          <button
            className="nav-burger"
            aria-label={lang === "es" ? "Menú" : "Menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-mobile">
          {c.links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={() => setOpen(false)}
          >
            {c.cta} <Arrow />
          </a>
        </div>
      )}
    </header>
  );
}
