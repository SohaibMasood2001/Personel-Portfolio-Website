import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdminOrApiKey } from "@/lib/auth-helpers";
import {
  clientIp,
  rateLimit,
  rateLimitResponse,
  safeErrorResponse,
  validateUpload,
} from "@/lib/security";

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
};

export async function POST(request: Request) {
  const { error } = await requireAdminOrApiKey(request);
  if (error) return error;

  const ip = clientIp(request);
  const rl = rateLimit(`upload:${ip}`, 20, 60_000);
  if (!rl.ok) return rateLimitResponse(rl.retryAfterSec);

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const invalid = validateUpload(file);
    if (invalid) {
      return NextResponse.json({ error: invalid }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const ext = EXT_BY_TYPE[file.type] || ".bin";
    const filename = `${Date.now()}-${crypto.randomUUID()}${ext}`;
    const filepath = path.join(uploadsDir, filename);

    await writeFile(filepath, buffer);

    return NextResponse.json({
      url: `/uploads/${filename}`,
      filename,
    });
  } catch (error) {
    return safeErrorResponse("Failed to upload file", 500, error);
  }
}
