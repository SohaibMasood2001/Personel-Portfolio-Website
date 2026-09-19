import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdminOrApiKey } from "@/lib/auth-helpers";
import { serializeProject } from "@/lib/projects";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const projects = await prisma.project.findMany({
      where: featured === "true" ? { featured: true } : undefined,
      orderBy: { order: "asc" },
    });

    return NextResponse.json(projects.map(serializeProject));
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { error } = await requireAdminOrApiKey(request);
  if (error) return error;

  try {
    const body = await request.json();
    const {
      title,
      slug,
      shortDesc,
      longDesc,
      techStack,
      features,
      screenshots,
      thumbnail,
      githubUrl,
      liveUrl,
      demoVideoUrl,
      proofAsset,
      guardrails,
      status,
      featured,
      accentColor,
      architecture,
      category,
      order,
    } = body;

    if (!title || !slug || !shortDesc || !longDesc) {
      return NextResponse.json(
        { error: "title, slug, shortDesc, and longDesc are required" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        shortDesc,
        longDesc,
        techStack: JSON.stringify(techStack ?? []),
        features: JSON.stringify(features ?? []),
        screenshots: JSON.stringify(screenshots ?? []),
        thumbnail: thumbnail || null,
        githubUrl: githubUrl || null,
        liveUrl: liveUrl || null,
        demoVideoUrl: demoVideoUrl || null,
        proofAsset: proofAsset || null,
        guardrails: JSON.stringify(guardrails ?? []),
        status: status || "live",
        featured: featured ?? false,
        accentColor: accentColor || "#7C3AED",
        architecture: architecture || null,
        category: category || "ai-agent",
        order: order ?? 0,
      },
    });

    return NextResponse.json(serializeProject(project), { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
