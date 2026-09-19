"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { services as defaultServices } from "@/lib/homepage-content";
import { resolveIcon } from "@/lib/icon-map";
import type { ServiceData } from "@/lib/content-defaults";

type Props = { items?: ServiceData[] };

export function ServicesGrid({ items }: Props) {
  const services = (items ?? []).map((s) => ({
    ...s,
    icon: resolveIcon(s.icon),
  }));
  const list = services.length ? services : defaultServices;

  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-14">
            <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
              Services & Expertise
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-4">
              What I can <span className="gradient-text">build for you</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              High-impact digital products, scalable full-stack applications, and intelligent automated workflows.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((service, i) => {
            const IconComponent = service.icon;
            return (
              <SectionReveal key={service.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 320 }}
                  className="glass glass-hover rounded-2xl p-7 h-full flex flex-col justify-between group relative overflow-hidden transition-all duration-300 border border-border-custom"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${service.accent}25`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${service.accent}66`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                  }}
                >
                  <div>
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.08 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative overflow-hidden transition-transform"
                      style={{
                        background: `${service.accent}18`,
                        border: `1px solid ${service.accent}44`,
                      }}
                    >
                      <IconComponent
                        className="w-6 h-6"
                        style={{ color: service.accent }}
                      />
                    </motion.div>
                    <h3 className="text-lg font-bold font-heading text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border-custom/50 flex items-center justify-between">
                    <span className="text-xs font-mono text-text-secondary/70">
                      0{i + 1}
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-primary group-hover:text-accent-primary transition-colors"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
