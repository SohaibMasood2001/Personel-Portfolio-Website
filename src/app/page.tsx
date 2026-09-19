import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TechMarquee } from "@/components/home/TechMarquee";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { GetInTouchSection } from "@/components/home/GetInTouchSection";
import { getSiteContent } from "@/lib/content";
import { getSettingsMap } from "@/lib/projects";
import type {
  ServiceData,
  TechItemData,
} from "@/lib/content-defaults";

export const metadata: Metadata = {
  title: "Sohaib Masood | AI Engineer & Generative AI Specialist",
  description:
    "Sohaib Masood — AI Engineer & Generative AI Specialist specializing in agentic AI systems, real-time voice agents, LLM pipelines, and intelligent workflow automation.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    services,
    techAdvanced,
    techShipping,
    heroTitles,
    settings,
  ] = await Promise.all([
    getSiteContent<ServiceData[]>("services"),
    getSiteContent<TechItemData[]>("tech_advanced"),
    getSiteContent<TechItemData[]>("tech_shipping"),
    getSiteContent<string[]>("hero_titles"),
    getSettingsMap().catch(() => ({}) as Record<string, string>),
  ]);

  const ownerName = settings.hero_title || settings.company_name || "Sohaib Masood";

  return (
    <>
      <HeroSection titles={heroTitles} ownerName={ownerName} />
      <AboutPreview />
      <FeaturedProjects />
      <ExperienceSection />
      <ServicesGrid items={services} />
      <TechMarquee advanced={techAdvanced} shipping={techShipping} />
      <GetInTouchSection />
    </>
  );
}
