"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { whyUsItems as defaultItems } from "@/lib/homepage-content";
import { resolveIcon } from "@/lib/icon-map";
import type { WhyUsData } from "@/lib/content-defaults";

type Props = { items?: WhyUsData[] };

export function WhyUsGrid({ items }: Props) {
  const whyUsItems = items?.length
    ? items.map((s) => ({ ...s, icon: resolveIcon(s.icon) }))
    : defaultItems;

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-14">
            <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
              Why Work With Me
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-4">
              What sets <span className="gradient-text">my engineering apart</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Direct communication, fast delivery cycles, and enterprise-grade code quality on every project.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsItems.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <SectionReveal key={item.title} delay={i * 0.08}>
                <GlassCard className="p-6 h-full flex flex-col items-center text-center glass-hover border border-border-custom transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-accent-primary" />
                  </div>
                  <h3 className="text-base font-bold font-heading text-text-primary mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </GlassCard>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
