import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdminOrApiKey } from "@/lib/auth-helpers";
import { PUBLIC_SETTING_KEYS, safeErrorResponse } from "@/lib/security";

export async function GET(request: Request) {
  try {
    const settings = await prisma.setting.findMany();
    const { error } = await requireAdminOrApiKey(request);

    // Unauthenticated clients only get public marketing fields
    if (error) {
      const map = Object.fromEntries(
        settings
          .filter((s) => PUBLIC_SETTING_KEYS.has(s.key))
          .map((s) => [s.key, s.value])
      );
      return NextResponse.json(map);
    }

    const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
    return NextResponse.json(map);
  } catch (error) {
    return safeErrorResponse("Failed to fetch settings", 500, error);
  }
}

export async function PUT(request: Request) {
  const { error } = await requireAdminOrApiKey(request);
  if (error) return error;

  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const entries = Object.entries(body as Record<string, string>).filter(
      ([key]) => typeof key === "string" && key.length > 0 && key.length < 100
    );

    await Promise.all(
      entries.map(([key, value]) =>
        prisma.setting.upsert({
          where: { key },
          update: { value: String(value ?? "").slice(0, 5000) },
          create: { key, value: String(value ?? "").slice(0, 5000) },
        })
      )
    );

    revalidatePath("/", "layout");
    revalidatePath("/contact");
    revalidatePath("/about");
    revalidatePath("/privacy");
    revalidatePath("/terms");
    revalidatePath("/projects");

    const settings = await prisma.setting.findMany();
    const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
    return NextResponse.json(map);
  } catch (error) {
    return safeErrorResponse("Failed to update settings", 500, error);
  }
}
