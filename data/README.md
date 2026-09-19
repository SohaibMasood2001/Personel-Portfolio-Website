# Portfolio seed dump

`portfolio-seed.json` is the full personal portfolio catalog for **Sohaib Masood**: 5 projects, site settings, and CMS sections (services, process, FAQs, about, tech chips).

Use this file to load the same content into a local SQLite database or a hosted Neon Postgres database.

## What is in the JSON

- `projects`: title, slug, copy, tech stack (array), features (array), GitHub URL, live URL, architecture diagram object
- `settings`: portfolio owner name, hero, about, contact, GitHub, LinkedIn
- `siteContent`: homepage CMS blocks

## Import options

### This Next.js app (local)

```bash
npm run seed:export
npm run db:seed
```

`db:seed` reads `portfolio-seed.json` and upserts into Prisma.

### SQLite file (offline)

```bash
sqlite3 my-portfolio.db < data/portfolio-seed.sql
```

Tables match the Prisma names: `Project`, `Setting`, `SiteContent`.

### Neon Postgres (Vercel)

```bash
# Set DATABASE_URL + DIRECT_URL to Neon, then:
npm run db:neon:setup
```

That pushes the Postgres schema, seeds from `portfolio-seed.json`, and regenerates the local SQLite Prisma client afterward.

## After you edit copy

Change `prisma/portfolio-catalog.ts` (and architecture / content-defaults if needed), then run `npm run seed:export` so the JSON and SQL stay current.
