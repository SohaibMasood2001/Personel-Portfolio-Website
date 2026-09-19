import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { ProjectDetailClient } from "./ProjectDetailClient";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const projects = await getAllProjects();
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [
      { slug: "agriconnect" },
      { slug: "smart-ai-doctor" },
      { slug: "smart-islamic-guider" },
      { slug: "ai-automation-suite" },
      { slug: "dualhire" },
    ];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found | Portfolio" };
  }

  const title = `${project.title} | Portfolio`;
  const description = project.shortDesc;
  const ogImage = project.thumbnail || "/og-portfolio.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const highlights = [
    { value: String(project.techStack.length), label: "Technologies" },
    { value: String(project.features.length), label: "Key Features" },
    {
      value: project.status === "live" ? "Live" : "Dev",
      label: "Status",
    },
    {
      value:
        project.category === "ai-agent"
          ? "Agent product"
          : project.category,

      label: "Category",
    },
  ];

  return (
    <ProjectDetailClient
      project={{
        title: project.title,
        subtitle: project.shortDesc.slice(0, 60),
        description: project.shortDesc,
        longDescription: project.longDesc,
        tech: project.techStack,
        accent: project.accentColor,
        live: project.liveUrl,
        features: project.features,
        architecture:
          project.architecture ?? "Architecture overview for this product.",
        highlights,
        thumbnail: project.thumbnail,
        screenshots: project.screenshots,
        slug: project.slug,
        guardrails: project.guardrails,
        demoVideoUrl: project.demoVideoUrl,
        proofAsset: project.proofAsset,
      }}
    />
  );
}
