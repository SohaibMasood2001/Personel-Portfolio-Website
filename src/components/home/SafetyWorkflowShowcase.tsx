"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { GitBranch, UserCheck, CheckCircle2 } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks/useParallax";

export function SafetyWorkflowShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion =
    typeof usePrefersReducedMotion === "function"
      ? usePrefersReducedMotion()
      : false;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const lineVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-24 px-6 w-full relative overflow-hidden">
      <SectionReveal>
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16">
            <h3 className="font-mono text-accent-secondary mb-4 uppercase tracking-wider text-sm font-semibold">
              How agents stay careful
            </h3>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-text-primary">
              Before anything changes, a person{" "}
              <br className="hidden md:block" />
              <span className="gradient-text">says yes</span>
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
              Agents prepare the work. You approve it. Then it runs — and we keep
              a clear record of what happened.
            </p>
          </div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full relative"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <motion.div
                variants={itemVariants}
                className="glass glass-hover p-6 rounded-2xl w-full lg:w-1/3 relative glow-purple border-border-custom"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-primary/10 rounded-lg text-accent-primary">
                      <GitBranch size={24} />
                    </div>
                    <h4 className="font-heading font-bold text-xl text-text-primary">
                      Prepare
                    </h4>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent-gold/10 text-accent-gold border border-accent-gold/20">
                    Waiting for you
                  </span>
                </div>
                <div className="bg-background rounded-xl p-4 text-sm border border-border-custom space-y-2">
                  <p className="text-text-primary font-medium">
                    Suggested payment
                  </p>
                  <p className="text-accent-emerald">
                    Charge ₨4,200 from the buyer wallet
                  </p>
                  <p className="text-text-secondary text-xs">
                    Nothing has been charged yet
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={lineVariants}
                className="hidden lg:block flex-1 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary origin-left"
              />
              <motion.div
                variants={itemVariants}
                className="block lg:hidden w-0.5 h-12 bg-gradient-to-b from-accent-primary to-accent-secondary"
              />

              <motion.div
                variants={itemVariants}
                className="glass glass-hover p-6 rounded-2xl w-full lg:w-1/3 relative glow-cyan border-border-custom"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-secondary/10 rounded-lg text-accent-secondary">
                      <UserCheck size={24} />
                    </div>
                    <h4 className="font-heading font-bold text-xl text-text-primary">
                      You decide
                    </h4>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/20">
                    Your choice
                  </span>
                </div>
                <div className="bg-background rounded-xl p-4 border border-border-custom text-sm">
                  <p className="text-text-primary mb-4">
                    The agent wants to take ₨4,200 from the buyer wallet. Allow
                    this?
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex-1 bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      ✓ Approve
                    </button>
                    <button
                      type="button"
                      className="flex-1 bg-accent-pink/10 text-accent-pink border border-accent-pink/20 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      ✗ Reject
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={lineVariants}
                className="hidden lg:block flex-1 h-0.5 bg-gradient-to-r from-accent-secondary to-accent-emerald origin-left"
              />
              <motion.div
                variants={itemVariants}
                className="block lg:hidden w-0.5 h-12 bg-gradient-to-b from-accent-secondary to-accent-emerald"
              />

              <motion.div
                variants={itemVariants}
                className="glass glass-hover p-6 rounded-2xl w-full lg:w-1/3 relative glow-emerald border-border-custom"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-emerald/10 rounded-lg text-accent-emerald">
                      <CheckCircle2 size={24} />
                    </div>
                    <h4 className="font-heading font-bold text-xl text-text-primary">
                      Done
                    </h4>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
                    Saved in history
                  </span>
                </div>
                <div className="bg-background rounded-xl p-4 text-sm border border-border-custom space-y-2">
                  <p className="text-accent-emerald font-medium">
                    Payment completed
                  </p>
                  <p className="text-text-secondary text-xs">
                    Receipt #TXN-2847
                  </p>
                  <p className="text-text-secondary text-xs opacity-70">
                    15 Aug 2026 · 10:24 AM
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-center mt-12 text-text-secondary max-w-2xl mx-auto"
            >
              Save a backup first. Wait for a person. Keep a clear record after.
              Every product in the lineup follows this pattern.
            </motion.p>
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  );
}
