"use client";

import { useEffect, useRef } from "react";

function motionOn() {
  if (document.documentElement.dataset.motion === "off") return false;
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return false;
  return true;
}
function coarsePointer() {
  return window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
}

/** Thin scroll-progress bar pinned to the top of the viewport. */
function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={ref} />
    </div>
  );
}

/** Magnetic CTAs + 3D tilt on project media (pointer-fine + motion only). */
function useMotionFx() {
  useEffect(() => {
    const magnets = Array.from(
      document.querySelectorAll<HTMLElement>(".btn-primary, .chat-fab"),
    );
    const magCleanup = magnets.map((el) => {
      const move = (e: MouseEvent) => {
        if (!motionOn() || coarsePointer()) return;
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        el.style.transform =
          "translate(" +
          (mx * 0.25).toFixed(1) +
          "px," +
          (my * 0.35).toFixed(1) +
          "px)";
      };
      const leave = () => {
        el.style.transform = "";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    });

    const tilts = Array.from(
      document.querySelectorAll<HTMLElement>(".proj-media"),
    );
    const tiltCleanup = tilts.map((el) => {
      const move = (e: MouseEvent) => {
        if (!motionOn() || coarsePointer()) return;
        const r = el.getBoundingClientRect();
        const clamp = (v: number) => Math.max(-0.5, Math.min(0.5, v));
        const px = clamp((e.clientX - r.left) / r.width - 0.5);
        const py = clamp((e.clientY - r.top) / r.height - 0.5);
        el.style.transform =
          "perspective(900px) rotateY(" +
          (px * 6).toFixed(2) +
          "deg) rotateX(" +
          (-py * 6).toFixed(2) +
          "deg) translateY(-4px)";
      };
      const leave = () => {
        el.style.transform = "";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      magCleanup.forEach((fn) => fn());
      tiltCleanup.forEach((fn) => fn());
    };
  }, []);
}

export function Fx() {
  useMotionFx();
  return <ScrollProgress />;
}
