import { readFileSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";
import { DEFAULT_GUARDRAILS_BY_SLUG } from "../src/lib/product-guardrails";

const prisma = new PrismaClient();

type SeedProject = {
  title: string;
  slug: string;
  shortDesc: string;
  longDesc: string;
  techStack: string[] | string;
  features: unknown[] | string;
  screenshots: string[] | string;
  thumbnail: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  demoVideoUrl?: string | null;
  proofAsset?: string | null;
  guardrails?: string[] | string;
  status: string;
  featured: boolean;
  accentColor: string;
  architecture: unknown;
  category: string;
  order: number;
};

type SeedDump = {
  projects: SeedProject[];
  settings: { key: string; value: string }[];
  siteContent: { section: string; data: unknown }[];
};

function asJsonString(value: unknown): string {
  return typeof value === "string" ? value : JSON.stringify(value);
}

function loadDump(): SeedDump {
  const path = join(__dirname, "..", "data", "portfolio-seed.json");
  return JSON.parse(readFileSync(path, "utf8")) as SeedDump;
}

async function main() {
  const dump = loadDump();
  console.log(
    "Seeding personal portfolio database from data/portfolio-seed.json..."
  );

  const dumpSlugs = dump.projects.map((p) => p.slug);
  const deletedStale = await prisma.project.deleteMany({
    where: { slug: { notIn: dumpSlugs } },
  });
  if (deletedStale.count > 0) {
    console.log(`  Cleaned up ${deletedStale.count} stale project(s) not in catalog.`);
  }

  for (const project of dump.projects) {
    const guardrails =
      project.guardrails ??
      DEFAULT_GUARDRAILS_BY_SLUG[project.slug] ??
      [];
    const row = {
      title: project.title,
      slug: project.slug,
      shortDesc: project.shortDesc,
      longDesc: project.longDesc,
      techStack: asJsonString(project.techStack),
      features: asJsonString(project.features),
      screenshots: asJsonString(project.screenshots ?? []),
      thumbnail: project.thumbnail,
      githubUrl: null as string | null,
      liveUrl: project.liveUrl,
      demoVideoUrl: project.demoVideoUrl ?? null,
      proofAsset: project.proofAsset ?? null,
      guardrails: asJsonString(guardrails),
      status: project.status,
      featured: project.featured,
      accentColor: project.accentColor,
      architecture: asJsonString(project.architecture),
      category: project.category,
      order: project.order,
    };
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: row,
      create: row,
    });
    console.log(`  Project: ${project.title}`);
  }

  for (const setting of dump.settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log(`  ${dump.settings.length} settings`);

  for (const row of dump.siteContent) {
    const data = asJsonString(row.data);
    await prisma.siteContent.upsert({
      where: { section: row.section },
      update: { data },
      create: { section: row.section, data },
    });
  }
  console.log(`  ${dump.siteContent.length} content sections`);
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
