import type { LucideIcon } from "lucide-react";
import {
  Bot,
  GitBranch,
  Workflow,
  Compass,
  PlugZap,
  LifeBuoy,
  Search,
  PenTool,
  Hammer,
  ShieldCheck,
  Rocket,
  RefreshCw,
  Package,
  Network,
  Server,
  FileCheck,
  Code,
  Layers,
  TrendingUp,
  Brain,
  Cloud,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Bot,
  GitBranch,
  Workflow,
  Compass,
  PlugZap,
  LifeBuoy,
  Search,
  PenTool,
  Hammer,
  ShieldCheck,
  Rocket,
  RefreshCw,
  Package,
  Network,
  Server,
  FileCheck,
  Code,
  Layers,
  TrendingUp,
  Brain,
  Cloud,
  Sparkles,
};

export const ICON_KEYS = Object.keys(iconMap);

export function resolveIcon(key: string | undefined): LucideIcon {
  if (key && iconMap[key]) return iconMap[key];
  return Sparkles;
}
