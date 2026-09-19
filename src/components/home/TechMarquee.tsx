"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import {
  defaultTechAdvanced,
  defaultTechShipping,
  type TechItemData,
} from "@/lib/content-defaults";

function TechChip({
  name,
  color,
  featured = false,
}: {
  name: string;
  color: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex-shrink-0 glass rounded-xl flex items-center gap-3 hover:scale-105 transition-transform cursor-default group ${
        featured ? "px-5 py-2.5 border border-accent-primary/25" : "px-6 py-3"
      }`}
    >
      <div
        className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm font-medium text-text-primary whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

type Props = {
  advanced?: TechItemData[];
  shipping?: TechItemData[];
};

export function TechMarquee({ advanced, shipping }: Props) {
  const advancedTech = advanced?.length ? advanced : defaultTechAdvanced;
  const shippingTech = shipping?.length ? shipping : defaultTechShipping;
  const loop = [...shippingTech, ...shippingTech];

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <SectionReveal>
          <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest text-center font-semibold">
            Tech Stack
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary text-center">
            Core Frameworks & <span className="gradient-text">Automation Tools</span>
          </h2>
          <p className="text-text-secondary text-center text-sm mt-3 max-w-xl mx-auto">
            Primary libraries, agent orchestration frameworks, and automation platforms I engineer with daily.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <ul className="mt-8 flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {advancedTech.map((tech) => (
              <li key={tech.name}>
                <TechChip name={tech.name} color={tech.color} featured />
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
          {loop.map((tech, i) => (
            <TechChip
              key={`${tech.name}-${i}`}
              name={tech.name}
              color={tech.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
