"use client";

import Link from "next/link";
import { ArrowRight, Bot, Code, Terminal, CheckCircle2, GraduationCap, Briefcase } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GlassCard } from "@/components/ui/GlassCard";

const highlights = [
  "Agentic AI systems & real-time voice agents using Vapi and OpenAI",
  "Automated decision pipelines & Claude Model Context Protocol (MCP)",
  "Full model fine-tuning (PP-OCRv4 on 24K font images, DeepSeek R1)",
  "Robotic process automation with UiPath and low-code n8n workflows",
];

const stats = [
  { value: 3.21, suffix: "", label: "COMSATS BSSE CGPA", isDecimal: true, icon: GraduationCap },
  { value: 5, suffix: "+", label: "Core AI Projects", isDecimal: false, icon: Code },
  { value: 15, suffix: "+", label: "Frameworks & Tools", isDecimal: false, icon: Terminal },
];

export function AboutPreview() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Bio & Highlights */}
            <div className="lg:col-span-7">
              <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
                About Me
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-4 leading-tight">
                AI Engineer & <span className="gradient-text">Generative AI Specialist</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4 text-sm md:text-base">
                Based in Islamabad, Pakistan, I am an AI Engineer specializing in production-grade agentic systems, LLM architectures, and intelligent automation solutions. Currently at Octathorn Technologies as an AI Automation Engineer, I design and deploy autonomous agent pipelines, voice agents, and enterprise Claude MCP integrations.
              </p>
              <p className="text-text-secondary leading-relaxed mb-6 text-sm md:text-base">
                Graduated with a BS in Software Engineering from COMSATS University Wah Cantt (CGPA 3.21). I combine machine learning reasoning, real-time voice synthesis, model fine-tuning, and scalable Python engineering.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {highlights.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm text-text-primary/90 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent-primary hover:text-accent-glow transition-colors group"
                >
                  <span>Explore full experience & skills</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Key Credentials Card */}
            <div className="lg:col-span-5 space-y-4">
              <GlassCard className="p-6 border border-border-custom shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-accent-primary/40 shrink-0 bg-surface-elevated shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/sohaib-portrait.png"
                      alt="Sohaib Masood"
                      className="w-full h-full object-cover object-top scale-110"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-accent-primary/10 text-accent-primary border border-accent-primary/20 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
                      Active Engineering Role
                    </div>
                    <h3 className="text-base font-bold font-heading text-text-primary">
                      Sohaib Masood
                    </h3>
                    <p className="text-text-secondary text-xs">AI Automation Engineer @ Octathorn</p>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-border-custom text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-text-secondary font-mono">Location</span>
                    <span className="font-semibold text-text-primary">Islamabad / Rawalpindi, PK</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-text-secondary font-mono">Primary Tech</span>
                    <span className="font-semibold text-text-primary">Claude (MCP), PP-OCRv4, Vapi, n8n</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-text-secondary font-mono">Education</span>
                    <span className="font-semibold text-text-primary">BS Software Engineering (COMSATS)</span>
                  </div>
                </div>
              </GlassCard>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, i) => (
                  <GlassCard key={stat.label} className="p-4 text-center border border-border-custom">
                    <stat.icon className="w-5 h-5 text-accent-primary mx-auto mb-1.5" />
                    <div className="text-xl font-bold font-heading text-text-primary mb-0.5">
                      {stat.isDecimal ? (
                        <span>3.21</span>
                      ) : (
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      )}
                    </div>
                    <p className="text-[11px] text-text-secondary font-medium leading-tight">{stat.label}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
