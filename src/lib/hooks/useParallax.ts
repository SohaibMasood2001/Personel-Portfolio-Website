"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type ParallaxLayer = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

type Options = {
  /** Max shift in px for the strongest layer */
  strength?: number;
  /** Disable for reduced motion / coarse pointer */
  enabled?: boolean;
};

/**
 * Mouse-position-driven offset for layered hero parallax.
 * Returns spring-smoothed x/y MotionValues in roughly ±strength px.
 */
export function useParallax({
  strength = 12,
  enabled = true,
}: Options = {}): ParallaxLayer {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 80, damping: 22, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 80, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (!enabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    let raf = 0;
    let latestX = 0;
    let latestY = 0;
    let pending = false;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      latestX = nx * strength;
      latestY = ny * strength;
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        pending = false;
        rawX.set(latestX);
        rawY.set(latestY);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled, strength, rawX, rawY]);

  return { x, y };
}

/** Scale a parallax layer by a depth factor (closer = larger motion). */
export function useParallaxDepth(
  layer: ParallaxLayer,
  depth: number
): { x: MotionValue<number>; y: MotionValue<number> } {
  const x = useTransform(layer.x, (v) => v * depth);
  const y = useTransform(layer.y, (v) => v * depth);
  return { x, y };
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function usePointerFine() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const onChange = () => setFine(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return fine;
}

/** Re-export motion for consumers that need motion.div with parallax styles */
export { motion };
