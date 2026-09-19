"use client";

import { useState } from "react";
import { ContentSectionEditor } from "@/components/admin/ContentSectionEditor";

const tabs = [
  { id: "services", label: "Services & Skills" },
  { id: "process", label: "Workflow Process" },
  { id: "why_us", label: "Why Hire Me" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faqs", label: "FAQs" },
  { id: "hero_titles", label: "Hero Rotating Titles" },
] as const;

export default function AdminHomepagePage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("services");

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold font-heading text-text-primary mb-2">
        Homepage content
      </h1>
      <p className="text-sm text-text-secondary mb-6">
        Edit public homepage sections. Changes appear after refresh.
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id
                ? "bg-accent-primary/15 text-accent-primary"
                : "text-text-secondary hover:bg-surface-elevated"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "services" && (
        <ContentSectionEditor
          section="services"
          title="Services"
          kind="array"
          fields={[
            { key: "icon", label: "Icon", type: "icon" },
            { key: "title", label: "Title" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "accent", label: "Accent color", type: "color" },
          ]}
        />
      )}
      {tab === "process" && (
        <ContentSectionEditor
          section="process"
          title="Process steps"
          kind="array"
          fields={[
            { key: "step", label: "Step #", type: "number" },
            { key: "icon", label: "Icon", type: "icon" },
            { key: "title", label: "Title" },
            { key: "description", label: "Description", type: "textarea" },
          ]}
        />
      )}
      {tab === "why_us" && (
        <ContentSectionEditor
          section="why_us"
          title="Why Hire Me"
          kind="array"
          fields={[
            { key: "icon", label: "Icon", type: "icon" },
            { key: "title", label: "Title" },
            { key: "description", label: "Description", type: "textarea" },
          ]}
        />
      )}
      {tab === "testimonials" && (
        <ContentSectionEditor
          section="testimonials"
          title="Testimonials"
          kind="array"
          fields={[
            { key: "quote", label: "Quote", type: "textarea" },
            { key: "name", label: "Name" },
            { key: "role", label: "Role" },
            { key: "rating", label: "Rating", type: "number" },
          ]}
        />
      )}
      {tab === "faqs" && (
        <ContentSectionEditor
          section="faqs"
          title="FAQs"
          kind="array"
          fields={[
            { key: "question", label: "Question" },
            { key: "answer", label: "Answer", type: "textarea" },
          ]}
        />
      )}
      {tab === "hero_titles" && (
        <ContentSectionEditor
          section="hero_titles"
          title="Hero rotating titles"
          description="Typewriter lines under the brand name"
          kind="strings"
        />
      )}
    </div>
  );
}
