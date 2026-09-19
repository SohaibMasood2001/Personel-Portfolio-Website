import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdminOrApiKey } from "@/lib/auth-helpers";
import { serializeProject } from "@/lib/projects";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(serializeProject(project));
  } catch (error) {
    console.error("Fetch project error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminOrApiKey(request);
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();

    const data: Record<string, unknown> = {};
    const fields = [
      "title",
      "slug",
      "shortDesc",
      "longDesc",
      "githubUrl",
      "liveUrl",
      "demoVideoUrl",
      "proofAsset",
      "status",
      "featured",
      "accentColor",
      "architecture",
      "category",
      "order",
      "thumbnail",
    ] as const;

    for (const field of fields) {
      if (body[field] !== undefined) data[field] = body[field];
    }

    if (body.techStack !== undefined) data.techStack = JSON.stringify(body.techStack);
    if (body.features !== undefined) data.features = JSON.stringify(body.features);
    if (body.screenshots !== undefined) data.screenshots = JSON.stringify(body.screenshots);
    if (body.guardrails !== undefined) data.guardrails = JSON.stringify(body.guardrails);
    if (body.thumbnail === "") data.thumbnail = null;
    if (body.demoVideoUrl === "") data.demoVideoUrl = null;
    if (body.proofAsset === "") data.proofAsset = null;
    if (body.githubUrl === "") data.githubUrl = null;
    if (body.liveUrl === "") data.liveUrl = null;

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    return NextResponse.json(serializeProject(project));
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminOrApiKey(request);
  if (error) return error;

  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
