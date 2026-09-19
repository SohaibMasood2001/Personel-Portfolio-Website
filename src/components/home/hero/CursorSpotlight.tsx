"use client";

import { useEffect, useRef } from "react";
import {
  usePointerFine,
  usePrefersReducedMotion,
} from "@/lib/hooks/useParallax";

/**
 * Soft radial glow that follows the cursor within the hero bounds.
 * Desktop / pointer-fine only; disabled under prefers-reduced-motion.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    let raf = 0;
    let pending = false;
    let px = 0;
    let py = 0;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        pending = false;
        el.style.transform = `translate3d(${px - 200}px, ${py - 200}px, 0)`;
        el.style.opacity = "1";
      });
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    parent.addEventListener("mousemove", onMove, { passive: true });
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 z-[1] h-[400px] w-[400px] rounded-full opacity-0 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)",
        willChange: "transform, opacity",
      }}
    />
  );
}
