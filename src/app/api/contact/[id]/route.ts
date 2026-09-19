import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdminOrApiKey } from "@/lib/auth-helpers";
import { safeErrorResponse } from "@/lib/security";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminOrApiKey(request);
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();

    const message = await prisma.message.update({
      where: { id },
      data: { read: body.read ?? true },
    });

    return NextResponse.json(message);
  } catch (error) {
    return safeErrorResponse("Failed to update message", 500, error);
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
    await prisma.message.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return safeErrorResponse("Failed to delete message", 500, error);
  }
}
