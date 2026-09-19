# Sohaib Masood — AI Engineer & Generative AI Specialist Portfolio

Personal portfolio website for **Sohaib Masood** — *AI Engineer specializing in Agentic AI Systems, Real-Time Voice Agents, LLMs & Intelligent Automation.*

Showcases engineering case studies, interactive agent visualizers, career timeline, services, tech stack, and a Next.js admin CMS. Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Prisma, and NextAuth.

**Key Projects:** AgriConnect · Smart AI Doctor · Smart Islamic Guider · AI Automation Suite · DualHire

## Database split

| Environment | Database | Schema file |
|-------------|----------|-------------|
| Local (`npm run dev`) | SQLite (`prisma/dev.db`) | `prisma/schema.prisma` |
| Vercel production | Neon Postgres | `prisma/schema.postgres.prisma` |

Local `.env` keeps `DATABASE_URL="file:./dev.db"`. Neon URLs go in the **Vercel** project env only (or temporarily in your shell when seeding Neon).

## Setup (local)

```bash
npm install
cp .env.example .env
# Fill NEXTAUTH_SECRET, ADMIN_PASSWORD_HASH (see .env.example)
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin: `/admin/login` (credentials from `.env`). Never commit real secrets.

## Deploy (Vercel + Neon)

1. Create a Neon project and copy **pooled** + **direct** connection strings.
2. Import the GitHub repo into Vercel.
3. Set Vercel env vars (see below).
4. Seed Neon once from your machine:

```bash
# PowerShell — paste your Neon URLs
$env:DATABASE_URL="postgresql://..."
$env:DIRECT_URL="postgresql://..."
npm run db:neon:setup
```

5. Redeploy on Vercel. `npm run build` generates the Postgres client and pushes the schema.

### Vercel environment variables

| Name | Value |
|------|--------|
| `DATABASE_URL` | Neon **pooled** URL |
| `DIRECT_URL` | Neon **direct** URL |
| `NEXTAUTH_URL` | `https://YOUR_APP.vercel.app` (or custom domain) |
| `NEXTAUTH_SECRET` | Same strong secret as local (or a new prod secret) |
| `ADMIN_EMAIL` | Your admin email |
| `ADMIN_PASSWORD_HASH` | Your bcrypt hash |
| `MCP_ADMIN_API_KEY` | Strong random key (optional unless using MCP) |

## Scripts

| Command | What it does |
|---------|----------------|
| `npm run dev` | Local site (SQLite) |
| `npm run build` | Production build (Postgres / Vercel) |
| `npm run db:setup` | Local push schema + seed |
| `npm run db:seed` | Reseed current DB from `data/portfolio-seed.json` |
| `npm run db:neon:setup` | Push + seed **Neon**, then restore SQLite client |
| `npm run db:local:generate` | Prisma client for local SQLite |
| `npm run seed:export` | Rebuild seed JSON/SQL from catalog |
| `npm run mcp:build` | Build admin MCP server |

## Content & seed

Project copy lives in `prisma/portfolio-catalog.ts`. Portable dumps: `data/portfolio-seed.json` / `.sql`. Edit catalog → `npm run seed:export` → `npm run db:seed` (local) or `npm run db:neon:setup` (Neon).

## Admin CMS

Signed-in admin can manage projects, homepage content, tech chips, about, settings, and contact messages. Optional MCP server under `mcp/` (see `mcp/README.md`).

## Notes

Keep `.env` out of git. Set strong `NEXTAUTH_SECRET` and MCP key before a public deploy.
