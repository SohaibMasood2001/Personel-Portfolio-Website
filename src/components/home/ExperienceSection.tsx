"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2, GraduationCap } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { GlassCard } from "@/components/ui/GlassCard";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: "work" | "education";
  badge: string;
  summary?: string;
  highlights: string[];
  techTags?: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "AI Automation Engineer",
    company: "Octathorn Technologies Private Limited",
    location: "Rawalpindi, Pakistan",
    period: "Feb 2026 – Present",
    type: "work",
    badge: "Current Role",
    summary:
      "Design and deploy agentic AI systems and intelligent automation solutions that reduce manual work and speed up decision-making.",
    highlights: [
      "Built real-time voice agents using OpenAI models and Vapi — handling live conversations, tool calling, and low-latency speech interactions.",
      "Developed multi-agent decision-making pipelines that coordinate AI agents, APIs, and business platforms with minimal human intervention.",
      "Integrated Claude with enterprise tools and data sources using the Model Context Protocol (MCP) for secure, standardised agent access.",
      "Delivered RPA solutions with UiPath to streamline business processes and eliminate repetitive manual tasks across departments.",
      "Designed low-code automation workflows in n8n connecting cloud services, APIs, and backend systems end-to-end.",
      "Combined deterministic RPA with LLM reasoning for intelligent document processing, classification, and exception handling.",
      "Applied RAG pipelines, structured outputs, and guardrails to keep agent responses accurate and production-safe.",
      "Currently fine-tuning PP-OCRv4 on a custom 24K-image dataset of specific font styles — running the full training pipeline from data preprocessing, model training, and evaluation to deployment-ready export.",
      "Set up logging, retry logic, and production monitoring so AI services stay reliable under real workloads.",
    ],
    techTags: ["Claude (MCP & Agents)", "Vapi Voice AI", "n8n Workflows", "PP-OCRv4 / Custom OCR", "UiPath RPA", "OpenAI", "Multi-Agent Pipelines", "PaddleOCR"],
  },
  {
    role: "Automation Engineer Intern",
    company: "Octathorn Technologies",
    location: "Rawalpindi, Pakistan",
    period: "Sep 2025 – Jan 2026",
    type: "work",
    badge: "Automation & Cloud",
    highlights: [
      "Developed and executed cross-browser web automation scripts using Playwright for functional and regression testing.",
      "Managed Ubuntu Linux cloud environments on AWS for deployment, configuration, and automation scheduling.",
      "Automated desktop workflows with UiPath via Remote Desktop Protocol (RDP) on AWS Windows/Linux instances.",
    ],
    techTags: ["Playwright", "UiPath", "Linux / Ubuntu", "AWS EC2"],
  },
  {
    role: "Python Developer Intern",
    company: "Eziline Software House",
    location: "Rawalpindi, Pakistan",
    period: "Jan 2025 – Apr 2025",
    type: "work",
    badge: "LLM & RAG",
    highlights: [
      "Built intelligent LLM applications and modern conversational systems using Claude, DeepSeek R1, FAISS vector search, and Hugging Face Transformers.",
      "Integrated RAG pipelines and FAISS vector search to power domain-specific document QA chatbots.",
      "Deployed deep learning inference models for NLP tasks (classification, NER, speech) via Flask REST APIs.",
      "Built disease detection classifiers using Keras/TensorFlow as part of applied ML experimentation.",
    ],
    techTags: ["Claude & DeepSeek", "RAG Systems", "Hugging Face", "FAISS", "Flask", "Transformers", "Keras"],
  },
  {
    role: "BS Software Engineering",
    company: "COMSATS University",
    location: "Wah Cantt, Pakistan",
    period: "March 2025",
    type: "education",
    badge: "CGPA 3.21",
    highlights: [
      "Majors: Artificial Intelligence, Machine Learning, Data Warehousing & Mining, Data Structures & Algorithms.",
      "Final Year Project: AgriConnect — digital agriculture marketplace with deep learning crop disease screening and multi-role backend.",
    ],
    techTags: ["Python", "Keras", "Django", "Deep Learning", "SQLite"],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-14">
            <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
              Career Timeline
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-3">
              Work Experience & <span className="gradient-text">Education</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto text-sm">
              Hands-on engineering track record across agentic AI, voice frameworks, cloud automation, and software engineering.
            </p>
          </div>
        </SectionReveal>

        <div className="space-y-6">
          {experiences.map((item, idx) => (
            <SectionReveal key={item.role + item.period} delay={idx * 0.1}>
              <GlassCard className="p-6 md:p-7 border border-border-custom hover:border-accent-primary/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      {item.type === "work" ? (
                        <Briefcase className="w-5 h-5 text-accent-primary" />
                      ) : (
                        <GraduationCap className="w-5 h-5 text-accent-emerald" />
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold font-heading text-text-primary">
                          {item.role}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium font-mono bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-text-primary/90">
                        {item.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap md:flex-col md:items-end gap-2 text-xs font-mono text-text-secondary shrink-0">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-accent-primary" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {item.summary && (
                  <div className="mb-4 p-3.5 rounded-xl bg-accent-primary/5 border border-accent-primary/15 text-xs sm:text-sm font-medium text-text-primary leading-relaxed">
                    {item.summary}
                  </div>
                )}

                <ul className="space-y-2.5 pt-3 border-t border-border-custom/50">
                  {item.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-primary/85 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {item.techTags && item.techTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 mt-1 border-t border-border-custom/30">
                    {item.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-accent-primary/8 text-accent-primary border border-accent-primary/15 hover:bg-accent-primary/15 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </GlassCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
