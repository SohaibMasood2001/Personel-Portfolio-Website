import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "https://yourportfolio.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const projects = await getAllProjects();
    projectPages = projects.map((p) => ({
      url: `${BASE}/projects/${p.slug}`,
      lastModified: p.updatedAt ?? now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    projectPages = [];
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    {
      url: `${BASE}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...staticPages, ...projectPages];
}
