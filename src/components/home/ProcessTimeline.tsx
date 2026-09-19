"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { processSteps as defaultSteps } from "@/lib/homepage-content";
import { resolveIcon } from "@/lib/icon-map";
import type { ProcessData } from "@/lib/content-defaults";

type Props = { items?: ProcessData[] };

export function ProcessTimeline({ items }: Props) {
  const processSteps = (items?.length
    ? items.map((s) => ({ ...s, icon: resolveIcon(s.icon) }))
    : defaultSteps);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-14">
            <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
              My Workflow
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-4">
              How I ship{" "}
              <span className="gradient-text">reliable software</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              A transparent, iterative six-stage process keeping you informed at every milestone.
            </p>
          </div>
        </SectionReveal>

        {/* Desktop horizontal stepper */}
        <div ref={ref} className="hidden lg:block relative pt-4 pb-2">
          <motion.div
            className="absolute top-[28px] left-[8%] right-[8%] h-0.5 origin-left bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-emerald"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <div className="grid grid-cols-6 gap-3 relative">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.12, type: "spring" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{
                    delay: 0.2 + i * 0.12,
                    type: "spring",
                    stiffness: 380,
                  }}
                  className="w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-sm font-bold text-white mb-3 relative z-10"
                  style={{
                    background: `linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))`,
                  }}
                >
                  {step.step}
                </motion.div>
                <div className="glass rounded-xl p-3 w-full">
                  <step.icon className="w-4 h-4 text-accent-primary mx-auto mb-1.5" />
                  <p className="text-xs font-semibold font-heading text-text-primary mb-1 leading-snug">
                    {step.title}
                  </p>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet vertical timeline */}
        <div className="lg:hidden relative pl-8 max-w-xl mx-auto">
          <motion.div
            className="absolute left-[11px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-emerald"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          {processSteps.map((step, i) => (
            <SectionReveal key={step.step} delay={i * 0.1}>
              <div className="relative pb-8 last:pb-0">
                <motion.div
                  className="absolute -left-8 w-6 h-6 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, type: "spring" }}
                >
                  {step.step}
                </motion.div>
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <step.icon className="w-4 h-4 text-accent-primary" />
                    <h3 className="text-sm font-semibold font-heading text-text-primary">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
