"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ProjectThumbnail } from "@/components/ui/ProjectThumbnail";
import { ExternalLink } from "lucide-react";
import { GuardrailBadges } from "@/components/ui/GuardrailBadges";

interface Project {
  title: string;
  slug: string;
  shortDesc: string;
  techStack: string[];
  accentColor: string;
  liveUrl: string | null;
  thumbnail: string | null;
  guardrails: string[];
}

const glowMap: Record<string, string> = {
  "#10B981": "glow-emerald",
  "#3B82F6": "glow-cyan",
  "#A855F7": "glow-purple",
};

export function FeaturedProjectsClient({ projects }: { projects: Project[] }) {
  return (
    <section className="py-24 px-6 relative">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--text-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--text-secondary) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <SectionReveal>
          <div className="text-center mb-14">
            <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
              Featured Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-3">
              Selected <span className="gradient-text">AI Projects</span>
            </h2>
            <p className="text-text-secondary text-sm max-w-xl mx-auto">
              Production-ready agentic systems, healthcare triage engines, RAG assistants, and intelligent automation suites.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <SectionReveal key={project.slug} delay={Math.min(i * 0.08, 0.4)}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group"
              >
                <div
                  className={`glass rounded-2xl overflow-hidden h-full flex flex-col relative glass-hover ${
                    glowMap[project.accentColor] ?? ""
                  }`}
                >
                  <ProjectThumbnail
                    src={project.thumbnail}
                    title={project.title}
                    accentColor={project.accentColor}
                    slug={project.slug}
                    variant="wide"
                  />

                  <div
                    className="h-1 w-full opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ background: project.accentColor }}
                  />

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold font-heading text-text-primary mb-1">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                      {project.shortDesc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-1 rounded-md bg-surface-elevated text-text-primary/85 border border-border-custom font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.guardrails?.length > 0 && (
                      <div className="mb-5">
                        <GuardrailBadges guardrails={project.guardrails} />
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-4 border-t border-border-custom">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-white shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}CC)`,
                          boxShadow: `0 4px 14px ${project.accentColor}33`,
                        }}
                      >
                        View Case Study
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
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
