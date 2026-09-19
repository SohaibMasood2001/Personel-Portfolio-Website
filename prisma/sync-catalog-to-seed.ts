/**
 * One-shot script: reads portfolio-catalog.ts + content-defaults.ts,
 * then rewrites data/portfolio-seed.json so the DB seed stays in sync.
 */
import { writeFileSync, readFileSync } from "fs";
import { join } from "path";
import { catalogProjects, catalogSettings } from "./portfolio-catalog";
import { DEFAULT_CONTENT } from "../src/lib/content-defaults";

const root = join(__dirname, "..");
const seedPath = join(root, "data", "portfolio-seed.json");

// Read existing seed to preserve guardrails and architecture fields
const existing = JSON.parse(readFileSync(seedPath, "utf8"));
const existingBySlug: Record<string, unknown> = {};
for (const p of existing.projects) {
  existingBySlug[p.slug] = p;
}

const projects = catalogProjects.map((p) => {
  const ex = (existingBySlug[p.slug] ?? {}) as Record<string, unknown>;
  return {
    title: p.title,
    slug: p.slug,
    shortDesc: p.shortDesc,
    longDesc: p.longDesc,
    techStack: p.techStack,
    features: p.features,
    screenshots: p.screenshots ?? [],
    thumbnail: p.thumbnail,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    demoVideoUrl: p.demoVideoUrl ?? null,
    proofAsset: p.proofAsset ?? null,
    guardrails: (ex.guardrails as string[] | undefined) ?? [],
    status: p.status,
    featured: p.featured,
    accentColor: p.accentColor,
    architecture: p.architectureFallback,
    category: p.category,
    order: p.order,
  };
});

const siteContent = Object.entries(DEFAULT_CONTENT).map(([section, data]) => ({
  section,
  data,
}));

const dump = {
  projects,
  settings: catalogSettings,
  siteContent,
};

writeFileSync(seedPath, JSON.stringify(dump, null, 2), "utf8");
console.log(`✅  Wrote ${projects.length} projects, ${catalogSettings.length} settings, ${siteContent.length} content sections to portfolio-seed.json`);
