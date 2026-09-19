import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { FeaturedProjectsClient } from "./FeaturedProjectsClient";

export async function FeaturedProjects() {
  let projects: Awaited<ReturnType<typeof getFeaturedProjects>> = [];

  try {
    projects = await getFeaturedProjects();
  } catch {
    projects = [];
  }

  if (projects.length === 0) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-heading text-text-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-text-secondary mb-6">
            No featured projects yet. Add some in the{" "}
            <Link href="/admin" className="text-accent-primary hover:underline">
              admin panel
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }

  const mapped = projects.map((p) => ({
    title: p.title,
    slug: p.slug,
    shortDesc: p.shortDesc,
    techStack: p.techStack,
    accentColor: p.accentColor,
    liveUrl: p.liveUrl,
    thumbnail: p.thumbnail,
    guardrails: p.guardrails,
  }));

  return <FeaturedProjectsClient projects={mapped} />;
}
