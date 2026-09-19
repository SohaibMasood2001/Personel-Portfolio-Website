"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ProjectThumbnail } from "@/components/ui/ProjectThumbnail";
import { ExternalLink, Filter, Search } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { GuardrailBadges } from "@/components/ui/GuardrailBadges";

const categories = ["All", "AI Agent", "Desktop", "Web", "Automation", "ML"];

interface ProjectCard {
  title: string;
  slug: string;
  shortDesc: string;
  tech: string[];
  category: string;
  categoryKey?: string;
  status: string;
  accent: string;
  live: string | null;
  thumbnail: string | null;
  guardrails: string[];
}

function ProjectGridCard({ project }: { project: ProjectCard }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        whileHover={{ y: -6, rotateY: 2, rotateX: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="glass rounded-2xl overflow-hidden h-full flex flex-col glass-hover group"
        style={{ perspective: "1000px" }}
      >
        <ProjectThumbnail
          src={project.thumbnail}
          title={project.title}
          accentColor={project.accent}
          slug={project.slug}
          variant="wide"
        />

        <div className="h-1 w-full" style={{ background: project.accent }} />

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{
                color: project.accent,
                background: `${project.accent}15`,
              }}
            >
              {project.status}
            </span>
            <span className="text-xs text-text-secondary px-2 py-0.5 rounded bg-surface-elevated">
              {project.category}
            </span>
          </div>

          <h3 className="text-xl font-bold font-heading text-text-primary mb-2">
            {project.title}
          </h3>

          <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
            {project.shortDesc}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-md bg-surface-elevated text-text-secondary border border-border-custom"
              >
                {t}
              </span>
            ))}
          </div>

          {project.guardrails?.length > 0 && (
            <div className="mb-4">
              <GuardrailBadges guardrails={project.guardrails} />
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-border-custom">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${project.accent}, ${project.accent}CC)`,
                boxShadow: `0 4px 14px ${project.accent}33`,
              }}
            >
              View Case Study
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsPageClient({ projects }: { projects: ProjectCard[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <PageTransition>
      <section className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
                Portfolio
              </p>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-text-primary mb-6">
                Selected Works &{" "}
                <span className="gradient-text">Featured Projects</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Explore recent full-stack web applications, autonomous AI agents, and production software I&apos;ve engineered.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
              <Filter className="w-4 h-4 text-text-secondary mr-2" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/25"
                      : "glass text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectGridCard key={project.slug} project={project} />
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-20 h-20 rounded-2xl bg-surface-elevated flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-text-secondary/50" />
              </div>
              <h3 className="text-xl font-semibold font-heading text-text-primary mb-2">
                Nothing here yet
              </h3>
              <p className="text-text-secondary text-sm mb-6 max-w-md text-center">
                No projects match this filter. Try selecting a different
                category.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold text-sm hover:scale-105 transition-transform"
              >
                View all projects
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
