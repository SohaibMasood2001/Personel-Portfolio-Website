"use client";

import { useState } from "react";
import { ContentSectionEditor } from "@/components/admin/ContentSectionEditor";

export default function AdminTechPage() {
  const [tab, setTab] = useState<"advanced" | "shipping">("advanced");

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold font-heading text-text-primary mb-2">
        Tech stack
      </h1>
      <p className="text-sm text-text-secondary mb-6">
        Advanced chips stay pinned; shipping list powers the marquee.
      </p>

      <div className="flex gap-2 mb-8">
        {(
          [
            { id: "advanced" as const, label: "Advanced (pinned)" },
            { id: "shipping" as const, label: "Shipping (marquee)" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              tab === t.id
                ? "bg-accent-primary/15 text-accent-primary"
                : "text-text-secondary hover:bg-surface-elevated"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "advanced" ? (
        <ContentSectionEditor
          section="tech_advanced"
          title="Advanced tech"
          kind="array"
          fields={[
            { key: "name", label: "Name" },
            { key: "color", label: "Color", type: "color" },
          ]}
        />
      ) : (
        <ContentSectionEditor
          section="tech_shipping"
          title="Shipping marquee"
          kind="array"
          fields={[
            { key: "name", label: "Name" },
            { key: "color", label: "Color", type: "color" },
          ]}
        />
      )}
    </div>
  );
}
