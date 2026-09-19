import prisma from "@/lib/prisma";
import {
  CONTENT_SECTIONS,
  DEFAULT_CONTENT,
  type ContentSection,
  type ServiceData,
  type ProcessData,
  type WhyUsData,
  type TestimonialData,
  type FaqData,
  type TechItemData,
  type AboutStoryData,
  type MilestoneData,
} from "@/lib/content-defaults";

export function isContentSection(value: string): value is ContentSection {
  return (CONTENT_SECTIONS as readonly string[]).includes(value);
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export function validateSectionData(
  section: ContentSection,
  data: unknown
): { ok: true; data: unknown } | { ok: false; error: string } {
  switch (section) {
    case "services": {
      if (!Array.isArray(data) || data.length === 0)
        return { ok: false, error: "services must be a non-empty array" };
      for (const item of data) {
        if (
          !isObject(item) ||
          !isNonEmptyString(item.title) ||
          !isNonEmptyString(item.description) ||
          !isNonEmptyString(item.icon) ||
          !isNonEmptyString(item.accent)
        ) {
          return {
            ok: false,
            error: "each service needs icon, title, description, accent",
          };
        }
      }
      return { ok: true, data };
    }
    case "process": {
      if (!Array.isArray(data) || data.length === 0)
        return { ok: false, error: "process must be a non-empty array" };
      for (const item of data) {
        if (
          !isObject(item) ||
          typeof item.step !== "number" ||
          !isNonEmptyString(item.title) ||
          !isNonEmptyString(item.description) ||
          !isNonEmptyString(item.icon)
        ) {
          return {
            ok: false,
            error: "each process step needs step, title, description, icon",
          };
        }
      }
      return { ok: true, data };
    }
    case "why_us": {
      if (!Array.isArray(data) || data.length === 0)
        return { ok: false, error: "why_us must be a non-empty array" };
      for (const item of data) {
        if (
          !isObject(item) ||
          !isNonEmptyString(item.title) ||
          !isNonEmptyString(item.description) ||
          !isNonEmptyString(item.icon)
        ) {
          return {
            ok: false,
            error: "each why_us item needs icon, title, description",
          };
        }
      }
      return { ok: true, data };
    }
    case "testimonials": {
      if (!Array.isArray(data))
        return { ok: false, error: "testimonials must be an array" };
      for (const item of data) {
        if (
          !isObject(item) ||
          !isNonEmptyString(item.quote) ||
          !isNonEmptyString(item.name) ||
          !isNonEmptyString(item.role)
        ) {
          return {
            ok: false,
            error: "each testimonial needs quote, name, role",
          };
        }
      }
      return { ok: true, data };
    }
    case "faqs": {
      if (!Array.isArray(data) || data.length === 0)
        return { ok: false, error: "faqs must be a non-empty array" };
      for (const item of data) {
        if (
          !isObject(item) ||
          !isNonEmptyString(item.question) ||
          !isNonEmptyString(item.answer)
        ) {
          return { ok: false, error: "each faq needs question and answer" };
        }
      }
      return { ok: true, data };
    }
    case "tech_advanced":
    case "tech_shipping": {
      if (!Array.isArray(data) || data.length === 0)
        return { ok: false, error: `${section} must be a non-empty array` };
      for (const item of data) {
        if (
          !isObject(item) ||
          !isNonEmptyString(item.name) ||
          !isNonEmptyString(item.color)
        ) {
          return { ok: false, error: "each tech item needs name and color" };
        }
      }
      return { ok: true, data };
    }
    case "hero_titles": {
      if (!Array.isArray(data) || data.length === 0)
        return { ok: false, error: "hero_titles must be a non-empty string array" };
      if (!data.every((t) => isNonEmptyString(t)))
        return { ok: false, error: "hero_titles must be non-empty strings" };
      return { ok: true, data };
    }
    case "about_story": {
      if (!isObject(data) || !Array.isArray(data.paragraphs))
        return { ok: false, error: "about_story needs paragraphs: string[]" };
      if (!data.paragraphs.every((p) => isNonEmptyString(p)))
        return { ok: false, error: "paragraphs must be non-empty strings" };
      return { ok: true, data };
    }
    case "about_milestones": {
      if (!Array.isArray(data) || data.length === 0)
        return { ok: false, error: "about_milestones must be a non-empty array" };
      for (const item of data) {
        if (
          !isObject(item) ||
          !isNonEmptyString(item.year) ||
          !isNonEmptyString(item.title) ||
          !isNonEmptyString(item.description) ||
          !isNonEmptyString(item.icon) ||
          !isNonEmptyString(item.accent)
        ) {
          return {
            ok: false,
            error:
              "each milestone needs year, title, description, icon, accent",
          };
        }
      }
      return { ok: true, data };
    }
    default:
      return { ok: false, error: "Unknown section" };
  }
}

function parseOrDefault<T>(section: ContentSection, raw: string | null): T {
  if (!raw) return DEFAULT_CONTENT[section] as T;
  try {
    const parsed = JSON.parse(raw);
    const result = validateSectionData(section, parsed);
    if (result.ok) return result.data as T;
  } catch {
    // fall through
  }
  return DEFAULT_CONTENT[section] as T;
}

export async function getSiteContent<T = unknown>(
  section: ContentSection
): Promise<T> {
  try {
    const row = await prisma.siteContent.findUnique({ where: { section } });
    return parseOrDefault<T>(section, row?.data ?? null);
  } catch {
    return DEFAULT_CONTENT[section] as T;
  }
}

export async function getAllSiteContent() {
  const map: Record<string, unknown> = {};
  try {
    const rows = await prisma.siteContent.findMany();
    const bySection = Object.fromEntries(rows.map((r) => [r.section, r.data]));
    for (const section of CONTENT_SECTIONS) {
      map[section] = parseOrDefault(section, bySection[section] ?? null);
    }
  } catch {
    for (const section of CONTENT_SECTIONS) {
      map[section] = DEFAULT_CONTENT[section];
    }
  }
  return map;
}

export async function upsertSiteContent(
  section: ContentSection,
  data: unknown
) {
  const validated = validateSectionData(section, data);
  if (!validated.ok) throw new Error(validated.error);

  const json = JSON.stringify(validated.data);
  return prisma.siteContent.upsert({
    where: { section },
    update: { data: json },
    create: { section, data: json },
  });
}

export type {
  ServiceData,
  ProcessData,
  WhyUsData,
  TestimonialData,
  FaqData,
  TechItemData,
  AboutStoryData,
  MilestoneData,
};
