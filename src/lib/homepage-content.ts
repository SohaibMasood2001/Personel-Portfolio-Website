import type { LucideIcon } from "lucide-react";
import { resolveIcon } from "@/lib/icon-map";
import {
  defaultServices,
  defaultProcess,
  defaultWhyUs,
  defaultTestimonials,
  defaultFaqs,
} from "@/lib/content-defaults";

export type ServiceItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
};

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type WhyUsItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
  rating?: number;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const services: ServiceItem[] = defaultServices.map((s) => ({
  ...s,
  icon: resolveIcon(s.icon),
}));

export const processSteps: ProcessStep[] = defaultProcess.map((s) => ({
  ...s,
  icon: resolveIcon(s.icon),
}));

export const whyUsItems: WhyUsItem[] = defaultWhyUs.map((s) => ({
  ...s,
  icon: resolveIcon(s.icon),
}));

export const testimonials: Testimonial[] = defaultTestimonials;
export const faqs: FaqItem[] = defaultFaqs;

export const trustedByItems = [
  { name: "MCP", color: "#E8536A" },
  { name: "Google A2A", color: "#1B2A4A" },
  { name: "OpenRouter", color: "#FF6600" },
  { name: "Claude", color: "#D4A853" },
  { name: "Cursor", color: "#3B82F6" },
  { name: "Next.js", color: "#8B8BA3" },
  { name: "Django", color: "#10B981" },
  { name: ".NET", color: "#A855F7" },
];
