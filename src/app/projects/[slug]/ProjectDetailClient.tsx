"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageTransition } from "@/components/layout/PageTransition";
import {
  ArrowLeft,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ArchitectureDiagramView } from "@/components/projects/ArchitectureDiagramView";
import { resolveArchitecture } from "@/lib/architecture-diagrams";
import { ProjectThumbnail } from "@/components/ui/ProjectThumbnail";
import { SHOW_PROJECT_LIVE } from "@/lib/site-flags";
import { GuardrailBadges } from "@/components/ui/GuardrailBadges";

interface ProjectData {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tech: string[];
  accent: string;
  live: string | null;
  features: { title: string; description: string }[];
  architecture: string;
  highlights: { value: string; label: string }[];
  thumbnail?: string | null;
  screenshots?: string[];
  slug?: string;
  guardrails?: string[];
  demoVideoUrl?: string | null;
  proofAsset?: string | null;
}

export function ProjectDetailClient({ project }: { project: ProjectData }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const screenshots = project.screenshots ?? [];
  const gallery = [
    ...(project.thumbnail ? [project.thumbnail] : []),
    ...screenshots.filter((s) => s !== project.thumbnail),
  ];
  const diagram = resolveArchitecture(project.slug, project.architecture);

  return (
    <PageTransition>
      <section
        className="pt-32 pb-16 px-6 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.accent}08 0%, transparent 50%)`,
        }}
      >
        <div className="max-w-5xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-sm font-medium mb-2"
              style={{ color: project.accent }}
            >
              {project.subtitle}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-text-primary mb-6">
              {project.title.split("").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, type: "spring", stiffness: 300 }}
                  className="inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : undefined }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {(project.thumbnail || project.slug) && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative w-full mb-8 rounded-2xl overflow-hidden border border-border-custom"
                style={{
                  boxShadow: `0 20px 50px ${project.accent}22`,
                }}
              >
                <ProjectThumbnail
                  src={project.thumbnail}
                  title={project.title}
                  accentColor={project.accent}
                  slug={project.slug}
                  className="!h-[260px] sm:!h-[340px] !rounded-2xl"
                />
              </motion.div>
            )}

            <p className="text-text-secondary text-lg leading-relaxed max-w-3xl mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-sm px-3 py-1.5 rounded-lg glass text-text-primary font-medium"
                >
                  {t}
                </span>
              ))}
            </div>

            {project.guardrails && project.guardrails.length > 0 && (
              <div className="mb-8">
                <GuardrailBadges guardrails={project.guardrails} size="md" />
              </div>
            )}

            {SHOW_PROJECT_LIVE && project.live && (
              <div className="flex flex-wrap gap-4">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium hover:scale-105 transition-transform"
                  style={{ background: project.accent }}
                >
                  <ExternalLink className="w-5 h-5" />
                  Live product
                </a>
                {project.demoVideoUrl && (
                  <a
                    href={project.demoVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-text-primary font-medium hover:scale-105 transition-transform"
                  >
                    Watch video
                  </a>
                )}
              </div>
            )}
            {!project.live && project.demoVideoUrl && (
              <a
                href={project.demoVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-text-primary font-medium hover:scale-105 transition-transform"
              >
                Watch video
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {project.proofAsset && (
        <section className="pb-8 px-6">
          <div className="max-w-5xl mx-auto">
            <SectionReveal>
              <p className="text-accent-primary font-mono text-sm mb-3 uppercase tracking-widest font-semibold">
                Project Demonstration & Proof of Work
              </p>
              <div className="rounded-2xl overflow-hidden border border-border-custom">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.proofAsset}
                  alt={`${project.title} proof`}
                  className="w-full object-cover max-h-[420px]"
                />
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.highlights.map((h, i) => (
              <SectionReveal key={h.label} delay={i * 0.1}>
                <motion.div
                  initial={{ rotateX: 90 }}
                  whileInView={{ rotateX: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassCard className="p-6 text-center">
                    <div
                      className="text-2xl font-bold font-heading mb-1"
                      style={{ color: project.accent }}
                    >
                      {h.value}
                    </div>
                    <p className="text-text-secondary text-sm">{h.label}</p>
                  </GlassCard>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <GlassCard className="p-8 md:p-10">
              <h2 className="text-2xl font-bold font-heading text-text-primary mb-6">
                Overview
              </h2>
              <div className="space-y-4 mb-8">
                {project.longDescription
                  .split(/\n\n+/)
                  .map((para) => para.trim())
                  .filter(Boolean)
                  .map((para, i) => (
                    <p
                      key={i}
                      className="text-text-secondary leading-relaxed text-base md:text-lg"
                    >
                      {para}
                    </p>
                  ))}
              </div>
              {project.features.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-4">
                    What it delivers
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((f) => (
                      <li key={f.title} className="flex gap-3 items-start">
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: project.accent }}
                        />
                        <div>
                          <p className="text-text-primary font-medium">
                            {f.title}
                          </p>
                          <p className="text-text-secondary text-sm leading-relaxed">
                            {f.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <h2 className="text-2xl font-bold font-heading text-text-primary mb-6">
              Architecture
            </h2>
            <GlassCard className="p-6 md:p-8">
              {diagram ? (
                <ArchitectureDiagramView
                  diagram={diagram}
                  accent={project.accent}
                />
              ) : (
                <pre className="text-sm font-mono text-accent-secondary whitespace-pre leading-relaxed">
                  {project.architecture}
                </pre>
              )}
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <SectionReveal>
              <h2 className="text-3xl font-bold font-heading text-text-primary mb-8">
                Gallery
              </h2>
            </SectionReveal>
            <div className="columns-1 sm:columns-2 gap-4 space-y-4">
              {gallery.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="block w-full break-inside-avoid rounded-xl overflow-hidden border border-border-custom hover:opacity-90 transition-opacity"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${project.title} image ${i + 1}`}
                    className="w-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {lightbox !== null && gallery[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white p-2"
              onClick={() => setLightbox(null)}
            >
              <X className="w-6 h-6" />
            </button>
            {lightbox > 0 && (
              <button
                type="button"
                className="absolute left-4 text-white p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(lightbox - 1);
                }}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}
            {lightbox < gallery.length - 1 && (
              <button
                type="button"
                className="absolute right-4 text-white p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(lightbox + 1);
                }}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gallery[lightbox]}
              alt=""
              className="max-h-[90vh] max-w-full rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-16 px-6 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass text-text-primary font-semibold hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Projects
        </Link>
      </section>
    </PageTransition>
  );
}
