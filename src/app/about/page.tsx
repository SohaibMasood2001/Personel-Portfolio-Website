import { AboutPageClient } from "@/components/about/AboutPageClient";
import { getSiteContent } from "@/lib/content";
import { getSettingsMap } from "@/lib/projects";
import type { AboutStoryData, MilestoneData } from "@/lib/content-defaults";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [story, milestones, settings] = await Promise.all([
    getSiteContent<AboutStoryData>("about_story"),
    getSiteContent<MilestoneData[]>("about_milestones"),
    getSettingsMap().catch(() => ({}) as Record<string, string>),
  ]);

  const ownerName = settings.hero_title || settings.company_name || "Your Name";

  return (
    <AboutPageClient
      story={story}
      milestones={milestones}
      companyName={ownerName}
    />
  );
}
