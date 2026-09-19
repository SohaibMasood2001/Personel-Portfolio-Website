import { getAllProjects, categoryLabels } from "@/lib/projects";
import { ProjectsPageClient } from "./ProjectsPageClient";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let projects: Awaited<ReturnType<typeof getAllProjects>> = [];

  try {
    projects = await getAllProjects();
  } catch {
    projects = [];
  }

  const mapped = projects.map((p) => ({
    title: p.title,
    slug: p.slug,
    shortDesc: p.shortDesc,
    tech: p.techStack,
    category: categoryLabels[p.category] ?? p.category,
    categoryKey: p.category,
    status: p.status === "live" ? "Live" : "In Development",
    accent: p.accentColor,
    live: p.liveUrl,
    thumbnail: p.thumbnail,
    guardrails: p.guardrails,
  }));

  return <ProjectsPageClient projects={mapped} />;
}
