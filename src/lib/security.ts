import { NextResponse } from "next/server";

/** In-memory sliding-window rate limiter (per-process). */
const buckets = new Map<string, number[]>();

export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

/**
 * Returns true if the request is allowed.
 * @param limit max events in the window
 * @param windowMs window length in ms
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const cutoff = now - windowMs;
  const prev = (buckets.get(key) ?? []).filter((t) => t > cutoff);
  if (prev.length >= limit) {
    const oldest = prev[0] ?? now;
    buckets.set(key, prev);
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }
  prev.push(now);
  buckets.set(key, prev);
  return { ok: true, retryAfterSec: 0 };
}

export function rateLimitResponse(retryAfterSec: number) {
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSec) },
    }
  );
}

export function safeErrorResponse(
  publicMessage: string,
  status = 500,
  err?: unknown
) {
  const correlationId = crypto.randomUUID();
  if (err) {
    const detail = err instanceof Error ? err.message : "unknown";
    console.error(`[${correlationId}] ${publicMessage}:`, detail);
  } else {
    console.error(`[${correlationId}] ${publicMessage}`);
  }
  return NextResponse.json(
    { error: publicMessage, correlationId },
    { status }
  );
}

/** Constant-time string compare (hashes both sides to equal length). */
export async function safeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const ha = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(a)));
  const hb = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(b)));
  if (ha.length !== hb.length) return false;
  let result = 0;
  for (let i = 0; i < ha.length; i++) {
    result |= ha[i]! ^ hb[i]!;
  }
  return result === 0;
}

/** Public CMS settings safe to expose without auth. */
export const PUBLIC_SETTING_KEYS = new Set([
  "company_name",
  "hero_title",
  "hero_subtitle",
  "about_text",
  "email",
  "github_url",
  "linkedin_url",
  "x_url",
  "location",
  "resume_url",
]);

const ALLOWED_UPLOAD_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB

export function validateUpload(file: File): string | null {
  if (!ALLOWED_UPLOAD_TYPES.has(file.type)) {
    return "Only JPEG, PNG, WebP, GIF, or SVG images are allowed";
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return "File must be 5MB or smaller";
  }
  return null;
}

export function assertCriticalEnv(): void {
  const required = ["NEXTAUTH_SECRET", "ADMIN_EMAIL"] as const;
  const missing = required.filter((k) => !process.env[k]?.trim());
  const hasPassword =
    Boolean(process.env.ADMIN_PASSWORD_HASH?.trim()) ||
    Boolean(process.env.ADMIN_PASSWORD?.trim());
  if (!hasPassword) missing.push("ADMIN_PASSWORD_HASH" as typeof required[number]);
  if (missing.length) {
    throw new Error(
      `Missing critical environment variables: ${missing.join(", ")}. Refusing to start insecurely.`
    );
  }
  const secret = process.env.NEXTAUTH_SECRET || "";
  const weakSecretMarkers = [
    "change-this",
    "change-me",
    "local-dev",
    "generate-with-openssl",
    "replacewithyourown",
    "your-secret",
  ];
  const secretLooksWeak =
    secret.length < 32 ||
    weakSecretMarkers.some((m) => secret.toLowerCase().includes(m));
  if (secretLooksWeak) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "NEXTAUTH_SECRET must be a strong random value (32+ chars) in production."
      );
    }
    console.warn(
      "[security] NEXTAUTH_SECRET is weak or a placeholder — set a strong secret before deploy."
    );
  }

  const mcpKey = process.env.MCP_ADMIN_API_KEY?.trim() || "";
  if (mcpKey) {
    const weakMcp =
      mcpKey.length < 16 ||
      /local-mcp|dev-key|change-in-prod|your-long-random|replace-with/i.test(
        mcpKey
      );
    if (weakMcp) {
      if (process.env.NODE_ENV === "production") {
        throw new Error(
          "MCP_ADMIN_API_KEY must be a strong random value (16+ chars) in production."
        );
      }
      console.warn(
        "[security] MCP_ADMIN_API_KEY looks like a placeholder — generate a real key before deploy."
      );
    }
  }
}
