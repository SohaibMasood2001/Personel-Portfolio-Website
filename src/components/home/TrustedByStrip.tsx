"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { trustedByItems } from "@/lib/homepage-content";

/** Honest "Works with / Built on" strip: protocol and platform badges, not fabricated clients. */
export function TrustedByStrip() {
  const items = [...trustedByItems, ...trustedByItems];

  return (
    <section className="py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <SectionReveal>
          <p className="text-accent-secondary font-mono text-sm uppercase tracking-widest text-center">
            Works with · Built on
          </p>
        </SectionReveal>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
          {items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex-shrink-0 glass rounded-xl px-5 py-2.5 flex items-center gap-2.5"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-text-primary whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
