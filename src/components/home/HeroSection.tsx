"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown, Download } from "lucide-react";
import Link from "next/link";
import { HeroVisual } from "./HeroVisual";
import { CursorSpotlight } from "./hero/CursorSpotlight";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  useParallax,
  useParallaxDepth,
  usePointerFine,
  usePrefersReducedMotion,
} from "@/lib/hooks/useParallax";
import { defaultHeroTitles } from "@/lib/content-defaults";

const ParticleField = dynamic(
  () =>
    import("@/components/ui/ParticleField").then((m) => ({
      default: m.ParticleField,
    })),
  { ssr: false }
);

const headlineVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    rotateX: 55,
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { type: "spring" as const, stiffness: 280, damping: 22 },
  },
};

type Props = {
  titles?: string[];
  ownerName?: string;
};

export function HeroSection({
  titles = defaultHeroTitles,
  ownerName = "Sohaib Masood",
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [displayText, setDisplayText] = useState("");
  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const titlesRef = useRef(titles);
  titlesRef.current = titles;

  const fine = usePointerFine();
  const parallaxOn = fine && !reduced;
  const parallax = useParallax({ strength: 12, enabled: parallaxOn });
  const particlesLayer = useParallaxDepth(parallax, 0.45);
  const auroraLayer = useParallaxDepth(parallax, 0.75);
  const panelLayer = useParallaxDepth(parallax, 1.15);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, reduced ? 1 : 0.2]
  );
  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, reduced ? 1 : 0.95]
  );
  const heroY = useTransform(
    scrollYProgress,
    [0, 0.85],
    [0, reduced ? 0 : 48]
  );

  // Stable typewriter: type → hold → delete → next
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let titleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const schedule = (fn: () => void, ms: number) => {
      timer = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const step = () => {
      if (cancelled) return;

      if (reducedRef.current) {
        setDisplayText(titlesRef.current[titleIndex]);
        schedule(() => {
          titleIndex = (titleIndex + 1) % titlesRef.current.length;
          step();
        }, 2800);
        return;
      }

      const full = titlesRef.current[titleIndex];

      if (!deleting) {
        charIndex += 1;
        setDisplayText(full.slice(0, charIndex));
        if (charIndex >= full.length) {
          deleting = true;
          schedule(step, 2400);
        } else {
          schedule(step, 55);
        }
        return;
      }

      charIndex -= 1;
      setDisplayText(full.slice(0, Math.max(0, charIndex)));
      if (charIndex <= 0) {
        deleting = false;
        titleIndex = (titleIndex + 1) % titlesRef.current.length;
        schedule(step, 350);
      } else {
        schedule(step, 28);
      }
    };

    schedule(step, 500);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={parallaxOn ? { x: particlesLayer.x, y: particlesLayer.y } : undefined}
      >
        <ParticleField className="opacity-60" />
      </motion.div>

      <CursorSpotlight />

      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={parallaxOn ? { x: auroraLayer.x, y: auroraLayer.y } : undefined}
      >
        {/* Gradient background instead of company hero image */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-accent-emerald/5 to-accent-secondary/10 dark:from-accent-primary/8 dark:via-accent-emerald/5 dark:to-accent-secondary/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/25 dark:from-background/90 dark:via-background/55 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/70" />
        <div className="aurora-blob w-[28rem] h-[28rem] bg-accent-primary/25 -top-10 -left-20" />
        <div className="aurora-blob aurora-blob-2 w-[24rem] h-[24rem] bg-accent-emerald/20 bottom-0 -right-16" />
        <div className="aurora-blob aurora-blob-3 w-[20rem] h-[20rem] bg-accent-secondary/15 top-1/3 left-1/3" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.15fr] gap-8 lg:gap-10 items-center">
          <div className="text-center lg:text-left relative">
            {/* Soft local read wash */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-4 -inset-y-3 sm:-inset-x-8 sm:-inset-y-6 rounded-[2rem] bg-gradient-to-r from-background/85 via-background/55 to-transparent dark:from-background/70 dark:via-background/35 dark:to-transparent blur-[1px]"
            />
            <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full glass border border-border-custom shadow-md mb-6"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-accent-primary/40 shrink-0 bg-surface-elevated">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sohaib-portrait.png"
                  alt={ownerName}
                  className="w-full h-full object-cover object-top scale-110"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-background" />
              </div>
              <div className="flex items-center gap-2 pr-1">
                <span className="text-xs font-mono font-semibold text-accent-primary uppercase tracking-wider">
                  AI Engineer
                </span>
                <span className="text-text-secondary/40">•</span>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Available</span>
              </div>
            </motion.div>

            <motion.h1
              variants={headlineVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 text-text-primary flex flex-wrap justify-center lg:justify-start gap-x-3 drop-shadow-sm"
              style={{ perspective: 800 }}
            >
              <motion.span
                variants={wordVariants}
                className="inline-block origin-bottom text-text-primary"
                style={{ transformStyle: "preserve-3d" }}
              >
                Hi, I&apos;m
              </motion.span>
              {ownerName.trim().split(/\s+/).filter(Boolean).map((word) => (
                <motion.span
                  key={word}
                  variants={wordVariants}
                  className="gradient-text inline-block origin-bottom"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <div className="h-12 md:h-14 flex items-center justify-center lg:justify-start mb-6">
              <span className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-text-primary">
                {displayText}
                <span className="animate-pulse text-accent-primary">|</span>
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-text-primary/90 text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-normal"
            >
              Designing and deploying agentic AI systems, real-time voice agents, and intelligent automation pipelines with OpenAI, Claude MCP, Vapi, LangChain, and Python.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <MagneticButton>
                <Link
                  href="/projects"
                  className="inline-flex px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-emerald text-white font-semibold shadow-lg hover:shadow-accent-primary/25 transition-all"
                >
                  View My Projects
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass text-text-primary font-semibold hover:border-accent-primary/50 transition-colors"
                >
                  <Download className="w-4 h-4 text-accent-primary" />
                  Contact & Hire
                </Link>
              </MagneticButton>
            </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={parallaxOn ? { x: panelLayer.x, y: panelLayer.y } : undefined}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-text-secondary" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
