"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useLang, type Lang } from "@/components/i18n/lang";
import { useReveal } from "@/lib/motion";
import { Arrow } from "@/components/ui/Arrow";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { IMAGES } from "@/lib/images";
import { siteConfig } from "@/lib/site";

type HeroCopy = {
  designWord: string;
  devWord: string;
  designSub: string;
  devSub: string;
  line: React.ReactNode;
  work: string;
  cv: string;
  scroll: string;
};

const HERO_COPY: Record<Lang, HeroCopy> = {
  en: {
    designWord: "Designer",
    devWord: "Developer",
    designSub: "UX / UI",
    devSub: "Frontend",
    line: (
      <>
        I design &amp; build digital products{" "}
        <span className="serif-em">that ship</span>.
      </>
    ),
    work: "See my work",
    cv: "Download CV",
    scroll: "Scroll",
  },
  es: {
    designWord: "Diseñadora",
    devWord: "Developer",
    designSub: "UX / UI",
    devSub: "Frontend",
    line: (
      <>
        Diseño y construyo productos digitales{" "}
        <span className="serif-em">que se lanzan</span>.
      </>
    ),
    work: "Ver mi trabajo",
    cv: "Descargar CV",
    scroll: "Bajar",
  },
};

// Decorative floating photos (desktop only). Cycles the available assets.
const FLOATS: Array<{ cls: string; d: number }> = [
  { cls: "hf-1", d: 1 },
  { cls: "hf-2", d: 1.8 },
  { cls: "hf-3", d: 2.6 },
  { cls: "hf-4", d: 1.4 },
  { cls: "hf-5", d: 2.2 },
  { cls: "hf-6", d: 3.1 },
  { cls: "hf-7", d: 1.2 },
  { cls: "hf-8", d: 2.8 },
];

export function Hero() {
  const ref = useReveal<HTMLElement>();
  const { lang } = useLang();
  const c = HERO_COPY[lang];

  // 3D pointer parallax for the floating photos (Floema-style depth).
  useEffect(() => {
    const sec = ref.current;
    if (!sec) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    if (reduce || coarse) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const tick = () => {
      raf = 0;
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      sec.style.setProperty("--px", cx.toFixed(4));
      sec.style.setProperty("--py", cy.toFixed(4));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001)
        raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      const r = sec.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) / r.width;
      ty = (e.clientY - (r.top + r.height / 2)) / r.height;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  return (
    <section id="top" className="hero hero-dual" ref={ref}>
      {/* duality backdrop */}
      <div className="dual-bg" aria-hidden="true">
        <div className="dual-half dual-design">
          <div className="dz-wire">
            <span className="dzw-bar" />
            <span className="dzw-line w60" />
            <span className="dzw-line w40" />
            <span className="dzw-block" />
            <span className="dzw-chip" />
          </div>
        </div>
        <div className="dual-half dual-code">
          <pre className="dual-codetext">
            <span className="ct-c">{"// components/Portfolio.tsx"}</span>
            {"\n"}
            <span className="ct-k">import</span> {"{ useState }"}{" "}
            <span className="ct-k">from</span> <span className="ct-s">&apos;react&apos;</span>
            {"\n"}
            <span className="ct-k">import</span> Image{" "}
            <span className="ct-k">from</span>{" "}
            <span className="ct-s">&apos;next/image&apos;</span>
            {"\n\n"}
            <span className="ct-k">const</span> ana ={" "}
            <span className="ct-b">{"{"}</span>
            {"\n"}
            {"  "}name: <span className="ct-s">&apos;Ana Karina Suárez&apos;</span>,
            {"\n"}
            {"  "}roles: [<span className="ct-s">&apos;UX/UI Designer&apos;</span>,{" "}
            <span className="ct-s">&apos;Frontend Dev&apos;</span>],
            {"\n"}
            {"  "}stack: [<span className="ct-s">&apos;React&apos;</span>,{" "}
            <span className="ct-s">&apos;Next.js&apos;</span>,{" "}
            <span className="ct-s">&apos;TypeScript&apos;</span>],
            {"\n"}
            <span className="ct-b">{"}"}</span>
            {"\n\n"}
            <span className="ct-k">export function</span>{" "}
            <span className="ct-f">Hero</span>() <span className="ct-b">{"{"}</span>
            {"\n"}
            {"  "}<span className="ct-k">return</span>{" "}
            <span className="ct-t">&lt;Portfolio /&gt;</span>
            {"\n"}
            <span className="ct-b">{"}"}</span>
          </pre>
        </div>
        <div className="dual-divider" />
      </div>

      <div className="hero-floats">
        {FLOATS.map(({ cls, d }, i) => (
          <div
            className={"hero-float " + cls}
            style={{ "--d": d } as React.CSSProperties}
            key={cls}
          >
            <span className="hero-float-inner">
              <ImageSlot
                className="hf-slot"
                shape="rect"
                decorative
                src={IMAGES.floats[i % IMAGES.floats.length]}
                sizes="(max-width: 880px) 0px, 150px"
                placeholder={"Foto " + (i + 1)}
              />
            </span>
          </div>
        ))}
      </div>

      <div className="wrap hero-dual-inner">
        <div className="dual-titles reveal" data-delay="120">
          <div className="dual-title dual-title-l">
            <span className="dual-word serif-em">{c.designWord}</span>
            <span className="dual-tag">{c.designSub}</span>
          </div>

          <div className="hero-portrait">
            <div className="hp-frame">
              <Image
                className="hp-img hp-img-base"
                src={IMAGES.portrait}
                alt="Ana Karina Suárez González"
                fill
                priority
                sizes="(max-width: 880px) 60vw, 320px"
              />
              <span className="hp-corner hp-corner-tl" />
              <span className="hp-corner hp-corner-br" />
            </div>
          </div>

          <div className="dual-title dual-title-r">
            <span className="dual-word mono-word">{c.devWord}</span>
            <span className="dual-tag">{c.devSub}</span>
          </div>
        </div>

        <h1 className="hero-name-c reveal" data-delay="240">
          <span className="hnc-name">
            Ana Karina <span className="serif-em">Suárez</span>
          </span>
        </h1>

        <div className="hero-actions hero-actions-c reveal" data-delay="400">
          <a href="#work" className="btn btn-primary">
            {c.work} <Arrow />
          </a>
          <a
            href={siteConfig.cv[lang]}
            className="btn btn-ghost"
            download={`Ana Karina Suárez González — CV ${lang.toUpperCase()}.pdf`}
          >
            {c.cv}
          </a>
        </div>
      </div>

      <a
        href="#work"
        className="scroll-cue reveal"
        data-delay="520"
        aria-label={c.scroll}
      >
        <span>{c.scroll}</span>
        <span className="scroll-line" />
      </a>
    </section>
  );
}
