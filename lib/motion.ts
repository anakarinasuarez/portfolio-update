"use client";

import { useEffect, useRef, useState } from "react";

/** Scroll-position based visibility (reliable across preview/iframe contexts). */
function inView(el: Element, ratio = 0.9): boolean {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return r.top < vh * ratio && r.bottom > 0;
}

/**
 * Reveal-on-scroll: adds the `in` class to `.reveal` / `.reveal-rise`
 * descendants (or the element itself) as they enter the viewport.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const self =
      el.classList.contains("reveal") || el.classList.contains("reveal-rise");
    const targets: HTMLElement[] = self
      ? [el]
      : Array.from(el.querySelectorAll<HTMLElement>(".reveal, .reveal-rise"));
    if (!targets.length) return;
    targets.forEach((t) => {
      t.style.transitionDelay = (t.dataset.delay || "0") + "ms";
    });

    const check = () => {
      let remaining = false;
      targets.forEach((t) => {
        if (t.classList.contains("in")) return;
        if (inView(t)) t.classList.add("in");
        else remaining = true;
      });
      return remaining;
    };

    check();
    const t1 = window.setTimeout(check, 60);
    const t2 = window.setTimeout(check, 300);

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    const onScroll = () => {
      if (!check()) cleanup();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cleanup();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);
  return ref;
}

/** Count-up number animation that starts when scrolled into view. */
export function useCountUp(
  target: number,
  duration = 1600,
  decimals = 0,
): [React.RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const factor = Math.pow(10, decimals);
    const round = (n: number) => Math.round(n * factor) / factor;
    let raf = 0;
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(round(eased * target));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setVal(target);
      };
      raf = requestAnimationFrame(tick);
      window.setTimeout(() => setVal(target), duration + 350);
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    const onScroll = () => {
      if (inView(el, 0.85)) run();
    };
    onScroll();
    const t = window.setTimeout(onScroll, 120);
    const tEnd = window.setTimeout(() => {
      if (!done) {
        done = true;
        setVal(target);
      }
    }, 4000);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cleanup();
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.clearTimeout(tEnd);
    };
  }, [target, duration, decimals]);
  return [ref, val];
}
