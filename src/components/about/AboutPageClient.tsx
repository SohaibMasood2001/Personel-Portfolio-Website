"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageTransition } from "@/components/layout/PageTransition";
import { Code, Server, Brain, Cloud, GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import { resolveIcon } from "@/lib/icon-map";
import type { AboutStoryData, MilestoneData } from "@/lib/content-defaults";

const skillCategories = [
  {
    title: "Primary: AI & Agent Frameworks",
    icon: Brain,
    skills: [
      { name: "LangChain & RAG Pipelines", level: 94 },
      { name: "OpenAI Models & DeepSeek R1", level: 92 },
      { name: "Vapi Voice Agent Framework", level: 90 },
      { name: "Claude Model Context Protocol (MCP)", level: 88 },
      { name: "Hugging Face & Transformers", level: 86 },
    ],
  },
  {
    title: "Primary: Languages & Web Frameworks",
    icon: Code,
    skills: [
      { name: "Python & Django REST", level: 96 },
      { name: "FastAPI & Flask", level: 88 },
      { name: "JavaScript / TypeScript / Next.js", level: 88 },
      { name: "SQL & MySQL", level: 86 },
      { name: "C++ & PHP", level: 78 },
    ],
  },
  {
    title: "Intelligent Automation & RPA",
    icon: Server,
    skills: [
      { name: "Playwright Browser Automation", level: 94 },
      { name: "UiPath Robotic Process Automation", level: 92 },
      { name: "n8n Low-Code Workflows", level: 90 },
      { name: "Document Classification & LLM Reasoning", level: 88 },
      { name: "Guardrails & Structured Outputs", level: 86 },
    ],
  },
  {
    title: "Secondary: Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      { name: "Linux / Ubuntu Systemd & Bash", level: 90 },
      { name: "AWS EC2 & Amazon Bedrock", level: 85 },
      { name: "FAISS Vector Databases", level: 88 },
      { name: "Docker Containerization", level: 82 },
      { name: "Git, GitHub & CI/CD", level: 90 },
    ],
  },
];

function SkillBar({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  return (
    <div className="mb-3.5">
      <div className="flex justify-between mb-1">
        <span className="text-xs sm:text-sm font-medium text-text-primary">{name}</span>
        <span className="text-xs font-mono text-accent-primary font-semibold">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-surface-elevated overflow-hidden border border-border-custom/50">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-emerald"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

type Props = {
  story: AboutStoryData;
  milestones: MilestoneData[];
  companyName: string;
};

export function AboutPageClient({ story, milestones, companyName }: Props) {
  const timeline = milestones.map((m) => ({
    ...m,
    icon: resolveIcon(m.icon),
  }));

  return (
    <PageTransition>
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <SectionReveal>
            <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
              About Me
            </p>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-text-primary mb-6">
              My Background &{" "}
              <span className="gradient-text">Engineering Journey</span>
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <GlassCard className="p-8 md:p-10 text-left max-w-3xl mx-auto border border-border-custom shadow-xl">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 pb-6 border-b border-border-custom">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-accent-primary/40 shrink-0 bg-surface-elevated shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/sohaib-portrait.png"
                    alt="Sohaib Masood"
                    className="w-full h-full object-cover object-top scale-110"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent-primary/10 text-accent-primary border border-accent-primary/20 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
                    AI Engineer
                  </div>
                  <h2 className="text-2xl font-bold font-heading text-text-primary mb-1">
                    Sohaib Masood
                  </h2>
                  <p className="text-xs sm:text-sm text-text-secondary">
                    AI Automation Engineer @ Octathorn Technologies • Islamabad, Pakistan
                  </p>
                </div>
              </div>

              {story.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-text-primary/85 leading-relaxed text-sm md:text-base ${
                    i < story.paragraphs.length - 1 ? "mb-4" : ""
                  }`}
                >
                  {p}
                </p>
              ))}

              {/* Education Highlight Card */}
              <div className="mt-8 pt-6 border-t border-border-custom flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-accent-primary" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-base font-bold font-heading text-text-primary">
                      BS in Software Engineering
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/30">
                      CGPA 3.21
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-text-primary/90">
                    COMSATS University — Wah Cantt (March 2025)
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    Majors: Artificial Intelligence, Machine Learning, Data Mining, Data Structures & Algorithms.
                  </p>
                </div>
              </div>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
                Technical Toolkit
              </p>
              <h2 className="text-3xl font-bold font-heading text-text-primary">
                Skills & Technologies
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((cat, ci) => (
              <SectionReveal key={cat.title} delay={ci * 0.1}>
                <GlassCard className="p-6 h-full border border-border-custom">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                      <cat.icon className="w-5 h-5 text-accent-primary" />
                    </div>
                    <h3 className="text-lg font-semibold font-heading text-text-primary">
                      {cat.title}
                    </h3>
                  </div>
                  {cat.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={ci * 0.1 + si * 0.08}
                    />
                  ))}
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
                Experience & Milestones
              </p>
              <h2 className="text-3xl font-bold font-heading text-text-primary">
                Career History
              </h2>
            </div>
          </SectionReveal>

          <div className="relative">
            <motion.div
              className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-emerald"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />

            {timeline.map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.15}>
                <div className="relative pl-16 pb-12 last:pb-0">
                  <motion.div
                    className="absolute left-3.5 w-5 h-5 rounded-full border-2 border-background flex items-center justify-center"
                    style={{ background: item.accent }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2, type: "spring" }}
                  />

                  <GlassCard className="p-6 border border-border-custom">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <item.icon
                          className="w-5 h-5"
                          style={{ color: item.accent }}
                        />
                        <h3 className="text-base sm:text-lg font-bold font-heading text-text-primary">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-surface-elevated border border-border-custom text-text-secondary">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </GlassCard>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
