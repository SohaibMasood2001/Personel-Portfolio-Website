import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdminOrApiKey } from "@/lib/auth-helpers";
import {
  clientIp,
  rateLimit,
  rateLimitResponse,
  safeErrorResponse,
} from "@/lib/security";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rl = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!rl.ok) return rateLimitResponse(rl.retryAfterSec);

  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim().slice(0, 200);
    const email = String(body?.email ?? "").trim().slice(0, 320);
    const subject = String(body?.subject ?? "").trim().slice(0, 300);
    const message = String(body?.message ?? "").trim().slice(0, 5000);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const created = await prisma.message.create({
      data: { name, email, subject, message },
    });

    // Do not echo PII back beyond confirmation
    return NextResponse.json(
      { success: true, id: created.id },
      { status: 201 }
    );
  } catch (error) {
    return safeErrorResponse("Failed to send message", 500, error);
  }
}

export async function GET(request: Request) {
  const { error } = await requireAdminOrApiKey(request);
  if (error) return error;

  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    return safeErrorResponse("Failed to fetch messages", 500, error);
  }
}
