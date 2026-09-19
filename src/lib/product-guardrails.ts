/**
 * Shared guardrail ids used on product cards. Catalog/DB can override per project.
 */
export const GUARDRAIL_IDS = [
  "staged-write",
  "human-confirm",
  "audit-ledger",
  "resumable",
] as const;

export type GuardrailId = (typeof GUARDRAIL_IDS)[number];

/** Defaults by slug — used when DB/catalog has no guardrails yet. */
export const DEFAULT_GUARDRAILS_BY_SLUG: Record<string, GuardrailId[]> = {
  agriconnect: ["staged-write", "human-confirm", "audit-ledger"],
  dualhire: ["staged-write", "human-confirm", "audit-ledger", "resumable"],
  modagent: ["staged-write", "human-confirm", "audit-ledger", "resumable"],
  "medcare-clinic-agent": ["staged-write", "human-confirm", "audit-ledger"],
  "resume-builder-agent": ["staged-write", "audit-ledger"],
  "linkedin-content-agent": ["staged-write", "audit-ledger"],
  "voice-content-pipeline": ["staged-write", "audit-ledger", "resumable"],
  "online-makeup-store": ["staged-write", "human-confirm", "audit-ledger"],
  "airline-reservation-system": [],
};

export function resolveGuardrails(
  slug: string | undefined | null,
  fromDb?: string[] | null
): string[] {
  if (fromDb && fromDb.length > 0) return fromDb;
  if (!slug) return [];
  return DEFAULT_GUARDRAILS_BY_SLUG[slug] ?? [];
}
