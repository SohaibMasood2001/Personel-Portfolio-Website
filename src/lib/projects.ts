import prisma from "./prisma";
import { resolveGuardrails } from "./product-guardrails";

export type ProjectFeature = { title: string; description: string };

export function parseJsonArray<T>(value: string, fallback: T[] = []): T[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function serializeProject(project: {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  longDesc: string;
  techStack: string;
  features: string;
  screenshots: string;
  thumbnail: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  demoVideoUrl: string | null;
  proofAsset: string | null;
  guardrails: string;
  status: string;
  featured: boolean;
  accentColor: string;
  architecture: string | null;
  category: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}) {
  const guardrailsParsed = parseJsonArray<string>(project.guardrails);
  return {
    ...project,
    techStack: parseJsonArray<string>(project.techStack),
    features: parseJsonArray<ProjectFeature>(project.features),
    screenshots: parseJsonArray<string>(project.screenshots),
    guardrails: resolveGuardrails(project.slug, guardrailsParsed),
  };
}

export async function getAllProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
  return projects.map(serializeProject);
}

export async function getFeaturedProjects() {
  const projects = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
  });
  return projects.map(serializeProject);
}

export async function getProjectBySlug(slug: string) {
  const project = await prisma.project.findUnique({ where: { slug } });
  return project ? serializeProject(project) : null;
}

export async function getSettingsMap() {
  const settings = await prisma.setting.findMany();
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
}

export const categoryLabels: Record<string, string> = {
  "ai-agent": "AI Agent",
  desktop: "Desktop",
  web: "Web",
  automation: "Automation",
  ml: "ML",
};
