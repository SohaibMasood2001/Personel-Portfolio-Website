import { getSettingsMap } from "@/lib/projects";
import {
  DEFAULT_CONTACT,
  resolvePublicContact,
  type PublicContactSettings,
} from "@/lib/site-contact";

export type { PublicContactSettings };

/** Always reads fresh settings from the DB (use on force-dynamic routes). */
export async function getPublicContactSettings(): Promise<PublicContactSettings> {
  try {
    const settings = await getSettingsMap();
    return resolvePublicContact(settings);
  } catch {
    return { ...DEFAULT_CONTACT };
  }
}
