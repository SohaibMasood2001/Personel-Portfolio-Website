import type { ComponentType } from "react";
import { DualHireDemo } from "@/components/home/agent-demos/DualHireDemo";
import { ModAgentDemo } from "@/components/home/agent-demos/ModAgentDemo";
import { AgriConnectDemo } from "@/components/home/agent-demos/AgriConnectDemo";
import { MedCareClinicDemo } from "@/components/home/agent-demos/MedCareClinicDemo";
import { ResumeBuilderDemo } from "@/components/home/agent-demos/ResumeBuilderDemo";

export type AgentDemoProps = {
  /** Fired once when the demo finishes a full run. Slider waits, then advances. */
  onCycleComplete?: () => void;
};

export type AgentShowcaseSlide = {
  id: string;
  productSlug: string;
  label: string;
  tagline: string;
  ctaHref: string;
  accent: string;
  Demo: ComponentType<AgentDemoProps>;
};

/** Rich agent previews only — LinkedIn / Voice / Makeup use real thumbnails instead. */
export const agentShowcaseSlides: AgentShowcaseSlide[] = [
  {
    id: "dualhire",
    productSlug: "dualhire",
    label: "DualHire",
    tagline: "Two hiring agents apply and book the interview",
    ctaHref: "/projects/dualhire",
    accent: "#3B82F6",
    Demo: DualHireDemo,
  },
  {
    id: "agriconnect",
    productSlug: "agriconnect",
    label: "AgriConnect",
    tagline: "Marketplace that buys crops and rents machines for you",
    ctaHref: "/projects/agriconnect",
    accent: "#10B981",
    Demo: AgriConnectDemo,
  },
  {
    id: "modagent",
    productSlug: "modagent",
    label: "ModAgent",
    tagline: "Drops a GTA mod in and installs it safely",
    ctaHref: "/projects/modagent",
    accent: "#A855F7",
    Demo: ModAgentDemo,
  },
  {
    id: "medcare",
    productSlug: "medcare-clinic-agent",
    label: "MedCare",
    tagline: "Clinic phone line for visits, meds, and refills",
    ctaHref: "/projects/medcare-clinic-agent",
    accent: "#0EA5E9",
    Demo: MedCareClinicDemo,
  },
  {
    id: "resume",
    productSlug: "resume-builder-agent",
    label: "Resume Studio",
    tagline: "Upload profile data and get a finished PDF resume",
    ctaHref: "/projects/resume-builder-agent",
    accent: "#F59E0B",
    Demo: ResumeBuilderDemo,
  },
];

/** Pause on the finished frame before moving to the next slide */
export const SHOWCASE_HOLD_AFTER_CYCLE_MS = 1200;

export function getShowcaseBySlug(slug: string | undefined | null) {
  if (!slug) return undefined;
  return agentShowcaseSlides.find((s) => s.productSlug === slug);
}
