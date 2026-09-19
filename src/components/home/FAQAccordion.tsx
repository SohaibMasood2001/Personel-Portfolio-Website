"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { faqs as defaultFaqs } from "@/lib/homepage-content";
import type { FaqData } from "@/lib/content-defaults";

type Props = { items?: FaqData[] };

export function FAQAccordion({ items }: Props) {
  const faqs = items?.length ? items : defaultFaqs;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-12">
            <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-4">
              Frequently Asked{" "}
              <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-text-secondary">
              Direct answers about my availability, stack, pricing, and communication.
            </p>
          </div>
        </SectionReveal>

        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <SectionReveal key={faq.question} delay={i * 0.04}>
                <div className="glass rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm md:text-base font-medium text-text-primary">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 text-accent-primary"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm text-text-secondary leading-relaxed border-t border-border-custom pt-3">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
