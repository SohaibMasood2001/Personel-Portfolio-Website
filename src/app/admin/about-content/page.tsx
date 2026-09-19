"use client";

import { useState } from "react";
import { ContentSectionEditor } from "@/components/admin/ContentSectionEditor";

export default function AdminAboutContentPage() {
  const [tab, setTab] = useState<"story" | "milestones">("story");

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold font-heading text-text-primary mb-2">
        About page
      </h1>
      <p className="text-sm text-text-secondary mb-6">
        Story paragraphs and journey milestones.
      </p>

      <div className="flex gap-2 mb-8">
        {(
          [
            { id: "story" as const, label: "Story" },
            { id: "milestones" as const, label: "Milestones" },
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

      {tab === "story" ? (
        <ContentSectionEditor
          section="about_story"
          title="My Story"
          kind="object"
          objectFields={[
            { key: "paragraphs", label: "Paragraphs", type: "textarea-list" },
          ]}
        />
      ) : (
        <ContentSectionEditor
          section="about_milestones"
          title="Milestones & Timeline"
          kind="array"
          fields={[
            { key: "year", label: "Year" },
            { key: "title", label: "Title" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "icon", label: "Icon", type: "icon" },
            { key: "accent", label: "Accent", type: "color" },
          ]}
        />
      )}
    </div>
  );
}
