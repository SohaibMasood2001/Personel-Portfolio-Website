"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import {
  agentShowcaseSlides,
  SHOWCASE_HOLD_AFTER_CYCLE_MS,
} from "@/lib/agent-showcase";
import { SliderControls } from "./SliderControls";
import {
  usePointerFine,
  usePrefersReducedMotion,
} from "@/lib/hooks/useParallax";

export function AgentShowcaseSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const waitingToAdvance = useRef(false);
  const pausedRef = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const tiltOn = fine && !reduced;
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rotY, { stiffness: 120, damping: 18 });

  const count = agentShowcaseSlides.length;
  const slide = agentShowcaseSlides[index];
  const isAutoPaused = paused || hoverPaused;
  const isFirst = index === 0;

  pausedRef.current = isAutoPaused;

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  }, []);

  const go = useCallback(
    (next: number) => {
      clearAdvanceTimer();
      waitingToAdvance.current = false;
      setIndex(((next % count) + count) % count);
    },
    [count, clearAdvanceTimer]
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  const scheduleAdvance = useCallback(() => {
    clearAdvanceTimer();
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      if (pausedRef.current) {
        waitingToAdvance.current = true;
        return;
      }
      waitingToAdvance.current = false;
      setIndex((i) => (i + 1) % count);
    }, SHOWCASE_HOLD_AFTER_CYCLE_MS);
  }, [clearAdvanceTimer, count]);

  const onCycleComplete = useCallback(() => {
    if (pausedRef.current) {
      waitingToAdvance.current = true;
      return;
    }
    scheduleAdvance();
  }, [scheduleAdvance]);

  useEffect(() => {
    if (!isAutoPaused && waitingToAdvance.current && !advanceTimer.current) {
      scheduleAdvance();
    }
  }, [isAutoPaused, scheduleAdvance]);

  useEffect(() => {
    clearAdvanceTimer();
    waitingToAdvance.current = false;
  }, [index, clearAdvanceTimer]);

  useEffect(() => () => clearAdvanceTimer(), [clearAdvanceTimer]);

  const onTiltMove = (e: React.MouseEvent) => {
    if (!tiltOn || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.set(px * 10);
    rotX.set(-py * 8);
  };

  const onTiltLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const Demo = slide.Demo;

  return (
    <motion.div
      ref={panelRef}
      className={`rounded-2xl p-3 md:p-4 w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-none transition-shadow duration-500 border border-white/20 dark:border-white/12 bg-white/75 dark:bg-[#13131A]/80 backdrop-blur-xl shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)] ${
        isFirst ? "ring-1 shadow-[0_0_40px_rgba(59,130,246,0.22)]" : ""
      }`}
      style={{
        ...(isFirst ? { boxShadow: `0 0 42px ${slide.accent}33` } : {}),
        ...(tiltOn
          ? {
              rotateX: springX,
              rotateY: springY,
              transformPerspective: 900,
              transformStyle: "preserve-3d" as const,
            }
          : {}),
      }}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => {
        setHoverPaused(false);
        onTiltLeave();
      }}
      onMouseMove={onTiltMove}
      onFocusCapture={() => setHoverPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setHoverPaused(false);
        }
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id + "-header"}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.28 }}
          className="mb-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <motion.span
                  animate={
                    isFirst
                      ? {
                          boxShadow: [
                            `0 0 0 0 ${slide.accent}00`,
                            `0 0 0 6px ${slide.accent}22`,
                            `0 0 0 0 ${slide.accent}00`,
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="text-sm md:text-base font-bold font-heading px-2.5 py-1 rounded-lg"
                  style={{
                    color: slide.accent,
                    background: `${slide.accent}18`,
                  }}
                >
                  {slide.label}
                </motion.span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <Zap className="w-3 h-3" />
                  Running a real task
                </span>
              </div>
              <p className="text-xs md:text-sm text-text-primary/90 font-medium leading-snug">
                {slide.tagline}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative min-h-[320px] md:min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Demo onCycleComplete={onCycleComplete} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <Link
          href={slide.ctaHref}
          className="text-sm font-medium inline-flex items-center gap-1 hover:underline"
          style={{ color: slide.accent }}
        >
          See how it works
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <SliderControls
        count={count}
        index={index}
        paused={paused}
        accents={agentShowcaseSlides.map((s) => s.accent)}
        onPrev={prev}
        onNext={next}
        onDot={go}
        onTogglePause={() => setPaused((p) => !p)}
      />
    </motion.div>
  );
}
