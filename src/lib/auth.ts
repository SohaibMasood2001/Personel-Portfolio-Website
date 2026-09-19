import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { safeEqual } from "./security";

async function passwordMatches(input: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (hash) {
    return bcrypt.compare(input, hash);
  }
  // Legacy plaintext env fallback (local only). Prefer ADMIN_PASSWORD_HASH.
  const legacy = process.env.ADMIN_PASSWORD;
  if (!legacy) return false;
  if (process.env.NODE_ENV === "production") {
    console.error(
      "[security] ADMIN_PASSWORD plaintext is not allowed in production. Use ADMIN_PASSWORD_HASH."
    );
    return false;
  }
  return safeEqual(input, legacy);
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        if (!adminEmail || !credentials?.email || !credentials?.password) {
          return null;
        }
        if (!(await safeEqual(credentials.email, adminEmail))) {
          return null;
        }
        const ok = await passwordMatches(credentials.password);
        if (!ok) return null;
        return {
          id: "1",
          email: adminEmail,
          name: "Admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  pages: {
    signIn: "/admin/login",
    signOut: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
