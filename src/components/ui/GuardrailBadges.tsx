"use client";

import { motion } from "framer-motion";
import { Shield, UserCheck, ClipboardList, RefreshCw } from "lucide-react";

const GUARDRAIL_CONFIG = {
  "staged-write": {
    icon: Shield,
    label: "Prepare first",
    color: "bg-accent-primary/10 text-accent-primary",
  },
  "human-confirm": {
    icon: UserCheck,
    label: "You approve",
    color: "bg-accent-secondary/10 text-accent-secondary",
  },
  "audit-ledger": {
    icon: ClipboardList,
    label: "Full history",
    color: "bg-accent-emerald/10 text-accent-emerald",
  },
  resumable: {
    icon: RefreshCw,
    label: "Can resume",
    color: "bg-accent-gold/10 text-accent-gold",
  },
} as const;

interface GuardrailBadgesProps {
  guardrails: string[];
  size?: "sm" | "md";
}

export function GuardrailBadges({
  guardrails,
  size = "sm",
}: GuardrailBadgesProps) {
  if (!guardrails.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {guardrails.map((guardrail) => {
        const config =
          GUARDRAIL_CONFIG[guardrail as keyof typeof GUARDRAIL_CONFIG];
        if (!config) return null;

        const Icon = config.icon;
        const sizeClasses =
          size === "sm" ? "text-xs px-2 py-1" : "text-sm px-3 py-1.5";
        const iconSize = size === "sm" ? 12 : 14;

        return (
          <motion.div
            key={guardrail}
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-1.5 rounded-full ${config.color} ${sizeClasses} font-medium transition-colors`}
          >
            <Icon size={iconSize} />
            <span>{config.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
