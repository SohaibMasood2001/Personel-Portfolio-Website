import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  catalogProjects,
  catalogSettings,
} from "../prisma/portfolio-catalog";
import {
  CONTENT_SECTIONS,
  DEFAULT_CONTENT,
} from "../src/lib/content-defaults";
import { architectureBySlug } from "../src/lib/architecture-diagrams";
import { DEFAULT_GUARDRAILS_BY_SLUG } from "../src/lib/product-guardrails";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "data");

function sqlString(value: string): string {
  return "'" + value.replace(/'/g, "''") + "'";
}

function main() {
  const projects = catalogProjects.map((project) => ({
    ...project,
    // Public GitHub CTAs stay off until repos are ready; Admin can set URLs later.
    githubUrl: null as string | null,
    demoVideoUrl: project.demoVideoUrl ?? null,
    proofAsset: project.proofAsset ?? null,
    guardrails:
      project.guardrails ??
      DEFAULT_GUARDRAILS_BY_SLUG[project.slug] ??
      [],
    architecture:
      architectureBySlug[project.slug] ?? project.architectureFallback,
  }));

  const siteContent = CONTENT_SECTIONS.map((section) => ({
    section,
    data: DEFAULT_CONTENT[section],
  }));

  const dump = {
    version: 2,
    name: "brenthix-labs-portfolio",
    exportedAt: new Date().toISOString(),
    note: "Import this JSON into any database. projects.techStack, features, screenshots, and guardrails are arrays. siteContent.data is already parsed JSON. For the Prisma SQLite schema, stringify techStack, features, screenshots, guardrails, and architecture, and stringify siteContent.data.",
    projects,
    settings: catalogSettings,
    siteContent,
  };

  mkdirSync(outDir, { recursive: true });
  const jsonPath = join(outDir, "portfolio-seed.json");
  writeFileSync(jsonPath, JSON.stringify(dump, null, 2) + "\n", "utf8");

  const sql: string[] = [
    "-- Brenthix Labs portfolio dump. SQLite first.",
    "BEGIN;",
    `CREATE TABLE IF NOT EXISTS "Project" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "shortDesc" TEXT NOT NULL,
  "longDesc" TEXT NOT NULL,
  "techStack" TEXT NOT NULL,
  "features" TEXT NOT NULL,
  "screenshots" TEXT NOT NULL DEFAULT '[]',
  "thumbnail" TEXT,
  "githubUrl" TEXT,
  "liveUrl" TEXT,
  "demoVideoUrl" TEXT,
  "proofAsset" TEXT,
  "guardrails" TEXT NOT NULL DEFAULT '[]',
  "status" TEXT NOT NULL DEFAULT 'live',
  "featured" INTEGER NOT NULL DEFAULT 0,
  "accentColor" TEXT NOT NULL DEFAULT '#7C3AED',
  "architecture" TEXT,
  "category" TEXT NOT NULL DEFAULT 'ai-agent',
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);`,
    `CREATE TABLE IF NOT EXISTS "Setting" (
  "id" TEXT PRIMARY KEY,
  "key" TEXT NOT NULL UNIQUE,
  "value" TEXT NOT NULL
);`,
    `CREATE TABLE IF NOT EXISTS "SiteContent" (
  "id" TEXT PRIMARY KEY,
  "section" TEXT NOT NULL UNIQUE,
  "data" TEXT NOT NULL,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);`,
  ];

  for (const project of projects) {
    const id = `proj_${project.slug}`;
    sql.push(
      `INSERT OR REPLACE INTO "Project" ("id","title","slug","shortDesc","longDesc","techStack","features","screenshots","thumbnail","githubUrl","liveUrl","demoVideoUrl","proofAsset","guardrails","status","featured","accentColor","architecture","category","order","updatedAt") VALUES (${[
        sqlString(id),
        sqlString(project.title),
        sqlString(project.slug),
        sqlString(project.shortDesc),
        sqlString(project.longDesc),
        sqlString(JSON.stringify(project.techStack)),
        sqlString(JSON.stringify(project.features)),
        sqlString(JSON.stringify(project.screenshots)),
        sqlString(project.thumbnail),
        "NULL",
        project.liveUrl ? sqlString(project.liveUrl) : "NULL",
        project.demoVideoUrl ? sqlString(project.demoVideoUrl) : "NULL",
        project.proofAsset ? sqlString(project.proofAsset) : "NULL",
        sqlString(JSON.stringify(project.guardrails)),
        sqlString(project.status),
        project.featured ? "1" : "0",
        sqlString(project.accentColor),
        sqlString(JSON.stringify(project.architecture)),
        sqlString(project.category),
        String(project.order),
        "CURRENT_TIMESTAMP",
      ].join(",")});`
    );
  }

  for (const setting of catalogSettings) {
    sql.push(
      `INSERT OR REPLACE INTO "Setting" ("id","key","value") VALUES (${sqlString(
        `set_${setting.key}`
      )},${sqlString(setting.key)},${sqlString(setting.value)});`
    );
  }

  for (const row of siteContent) {
    sql.push(
      `INSERT OR REPLACE INTO "SiteContent" ("id","section","data","updatedAt") VALUES (${sqlString(
        `content_${row.section}`
      )},${sqlString(row.section)},${sqlString(
        JSON.stringify(row.data)
      )},CURRENT_TIMESTAMP);`
    );
  }

  sql.push("COMMIT;");
  const sqlPath = join(outDir, "portfolio-seed.sql");
  writeFileSync(sqlPath, sql.join("\n") + "\n", "utf8");

  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${sqlPath}`);
  console.log(
    `  ${projects.length} projects, ${catalogSettings.length} settings, ${siteContent.length} content sections`
  );
}

main();
