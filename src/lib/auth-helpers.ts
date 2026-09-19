import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { NextResponse } from "next/server";
import { safeEqual } from "./security";

async function apiKeyValid(request: Request): Promise<boolean> {
  const key = process.env.MCP_ADMIN_API_KEY;
  if (!key || key.length < 16) return false;
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return false;
  return safeEqual(header.slice(7), key);
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return {
      session: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { session, error: null };
}

/** NextAuth session OR Bearer MCP_ADMIN_API_KEY */
export async function requireAdminOrApiKey(request: Request) {
  if (await apiKeyValid(request)) {
    return { session: null, viaApiKey: true as const, error: null };
  }
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return {
      session: null,
      viaApiKey: false as const,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { session, viaApiKey: false as const, error: null };
}
