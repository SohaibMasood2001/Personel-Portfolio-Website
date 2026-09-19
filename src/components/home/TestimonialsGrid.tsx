"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { testimonials as defaultTestimonials } from "@/lib/homepage-content";
import type { TestimonialData } from "@/lib/content-defaults";

function InitialsAvatar({ name, accent }: { name: string; accent: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-md"
      style={{
        background: `linear-gradient(135deg, ${accent}, #D4A853)`,
      }}
    >
      {initials}
    </div>
  );
}

const accents = ["#E8536A", "#D4A853", "#FF7B8A"];

type Props = { items?: TestimonialData[] };

export function TestimonialsGrid({ items }: Props) {
  const testimonials = items?.length ? items : defaultTestimonials;
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-14">
            <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
              Recommendations & Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary">
              What clients & collaborators{" "}
              <span className="gradient-text">say about my work</span>
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <SectionReveal key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass glass-hover rounded-2xl p-7 h-full flex flex-col justify-between border border-border-custom relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {typeof t.rating === "number" && (
                      <div className="flex gap-1">
                        {Array.from({ length: t.rating }).map((_, s) => (
                          <Star
                            key={s}
                            className="w-4 h-4 fill-accent-gold text-accent-gold"
                          />
                        ))}
                      </div>
                    )}
                    <Quote className="w-5 h-5 text-accent-primary/30" />
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border-custom/50">
                  <InitialsAvatar
                    name={t.name}
                    accent={accents[i % accents.length]}
                  />
                  <div>
                    <div className="font-semibold font-heading text-sm text-text-primary">
                      {t.name}
                    </div>
                    <div className="text-xs text-text-secondary">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
