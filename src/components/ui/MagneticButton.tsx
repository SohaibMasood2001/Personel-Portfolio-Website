"use client";

import {
  useRef,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  usePointerFine,
  usePrefersReducedMotion,
} from "@/lib/hooks/useParallax";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max pull distance in px */
  strength?: number;
  /** Radius around the button that activates magnetism */
  radius?: number;
};

/**
 * Cursor-attraction hover wrapper for CTAs.
 * Desktop / pointer-fine only; respects prefers-reduced-motion.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 10,
  radius = 80,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });

  const onMove = (e: ReactMouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    const t = 1 - dist / radius;
    x.set((dx / dist) * strength * t || 0);
    y.set((dy / dist) * strength * t || 0);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
