import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { rateLimit } from "@/lib/security";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate-limit credential auth attempts
  if (pathname.startsWith("/api/auth/callback/credentials")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const rl = rateLimit(`login:${ip}`, 5, 60_000);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(rl.retryAfterSec) },
        }
      );
    }
  }

  const isAdminPage =
    pathname === "/admin" ||
    pathname.startsWith("/admin/projects") ||
    pathname.startsWith("/admin/messages") ||
    pathname.startsWith("/admin/settings") ||
    pathname.startsWith("/admin/homepage") ||
    pathname.startsWith("/admin/tech") ||
    pathname.startsWith("/admin/about-content") ||
    pathname.startsWith("/admin/mcp");

  if (!isAdminPage) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/projects/:path*",
    "/admin/messages/:path*",
    "/admin/settings/:path*",
    "/admin/homepage/:path*",
    "/admin/tech/:path*",
    "/admin/about-content/:path*",
    "/admin/mcp/:path*",
    "/api/auth/callback/credentials",
  ],
};
