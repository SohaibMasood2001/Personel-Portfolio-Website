import { NextResponse } from "next/server";
import {
  CONTENT_SECTIONS,
  type ContentSection,
} from "@/lib/content-defaults";
import {
  getAllSiteContent,
  getSiteContent,
  isContentSection,
  upsertSiteContent,
  validateSectionData,
} from "@/lib/content";
import { requireAdminOrApiKey } from "@/lib/auth-helpers";

export async function GET() {
  try {
    const content = await getAllSiteContent();
    return NextResponse.json({
      sections: CONTENT_SECTIONS,
      content,
    });
  } catch (error) {
    console.error("Fetch content error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { error } = await requireAdminOrApiKey(request);
  if (error) return error;

  try {
    const body = await request.json();
    const section = body?.section as string | undefined;
    const data = body?.data;

    if (!section || !isContentSection(section)) {
      return NextResponse.json(
        {
          error: `Invalid section. Allowed: ${CONTENT_SECTIONS.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const validated = validateSectionData(section as ContentSection, data);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    await upsertSiteContent(section, validated.data);
    const saved = await getSiteContent(section);
    return NextResponse.json({ section, data: saved });
  } catch (error) {
    console.error("Update content error:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
