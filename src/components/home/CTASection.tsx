"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-accent-secondary/5 to-accent-emerald/5" />

      <div className="max-w-4xl mx-auto relative text-center">
        <SectionReveal>
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Send className="w-12 h-12 text-accent-primary mx-auto mb-6 opacity-60" />
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-text-primary mb-6">
              Got something you want{" "}
              <span className="gradient-text">built</span>?
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              If you need an agent that can act on a real product — not just chat —
              send a note. We will tell you straight if it is a fit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold hover:scale-105 transition-transform shadow-lg"
              >
                Write to us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass text-text-primary font-semibold hover:scale-105 transition-transform"
              >
                Browse projects
              </Link>
            </div>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}
