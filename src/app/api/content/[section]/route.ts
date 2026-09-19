import { NextResponse } from "next/server";
import {
  getSiteContent,
  isContentSection,
  upsertSiteContent,
  validateSectionData,
} from "@/lib/content";
import { requireAdminOrApiKey } from "@/lib/auth-helpers";
import type { ContentSection } from "@/lib/content-defaults";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await params;
    if (!isContentSection(section)) {
      return NextResponse.json({ error: "Unknown section" }, { status: 404 });
    }
    const data = await getSiteContent(section);
    return NextResponse.json({ section, data });
  } catch (error) {
    console.error("Fetch content section error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { error } = await requireAdminOrApiKey(request);
  if (error) return error;

  try {
    const { section } = await params;
    if (!isContentSection(section)) {
      return NextResponse.json({ error: "Unknown section" }, { status: 404 });
    }

    const body = await request.json();
    const data = body?.data !== undefined ? body.data : body;

    const validated = validateSectionData(section as ContentSection, data);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    await upsertSiteContent(section, validated.data);
    const saved = await getSiteContent(section);
    return NextResponse.json({ section, data: saved });
  } catch (error) {
    console.error("Update content section error:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
