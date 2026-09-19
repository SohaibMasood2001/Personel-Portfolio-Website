"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Upload } from "lucide-react";

interface SettingsForm {
  company_name: string;
  hero_title: string;
  hero_subtitle: string;
  about_text: string;
  github_url: string;
  linkedin_url: string;
  x_url: string;
  email: string;
  location: string;
  resume_url: string;
}

const defaults: SettingsForm = {
  company_name: "",
  hero_title: "",
  hero_subtitle: "",
  about_text: "",
  github_url: "",
  linkedin_url: "",
  x_url: "",
  email: "",
  location: "",
  resume_url: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsForm>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setForm({ ...defaults, ...data });
      })
      .finally(() => setLoading(false));
  }, []);

  const update = (key: keyof SettingsForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) update("resume_url", data.url);
    setUploading(false);
  };

  if (loading) {
    return <p className="text-text-secondary text-sm">Loading...</p>;
  }

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg bg-surface-elevated border border-border-custom text-text-primary text-sm focus:outline-none focus:border-accent-primary";

  return (
    <div>
      <h1 className="text-2xl font-bold font-heading text-text-primary mb-1">
        Personal Profile & Settings
      </h1>
      <p className="text-text-secondary text-sm mb-8">
        Manage your profile name, elevator pitch, social links, resume PDF, and contact details. These values dynamically power the entire portfolio.
      </p>

      <form onSubmit={handleSave} className="space-y-5 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Full Name / Display Name
          </label>
          <input
            className={inputClass}
            value={form.company_name}
            onChange={(e) => update("company_name", e.target.value)}
            placeholder="e.g. Your Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Hero Heading Name
          </label>
          <input
            className={inputClass}
            value={form.hero_title}
            onChange={(e) => update("hero_title", e.target.value)}
            placeholder="e.g. Your Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Headline / Primary Specialization
          </label>
          <textarea
            rows={2}
            className={inputClass}
            value={form.hero_subtitle}
            onChange={(e) => update("hero_subtitle", e.target.value)}
            placeholder="e.g. Full-Stack Developer & Autonomous AI Engineer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Short Bio / Elevator Pitch
          </label>
          <textarea
            rows={4}
            className={inputClass}
            value={form.about_text}
            onChange={(e) => update("about_text", e.target.value)}
            placeholder="Brief bio describing your engineering background and what you build..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              GitHub Profile URL
            </label>
            <input
              className={inputClass}
              value={form.github_url}
              onChange={(e) => update("github_url", e.target.value)}
              placeholder="https://github.com/yourusername"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              LinkedIn Profile URL
            </label>
            <input
              className={inputClass}
              value={form.linkedin_url}
              onChange={(e) => update("linkedin_url", e.target.value)}
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              X / Twitter URL (optional)
            </label>
            <input
              className={inputClass}
              value={form.x_url}
              onChange={(e) => update("x_url", e.target.value)}
              placeholder="https://x.com/yourusername"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Primary Contact Email
            </label>
            <input
              className={inputClass}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="your.email@gmail.com"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Location & Availability
            </label>
            <input
              className={inputClass}
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="Islamabad, Pakistan · Available Worldwide"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Resume / CV (PDF)
          </label>
          <div className="flex items-center gap-3">
            <input
              className={inputClass}
              value={form.resume_url}
              onChange={(e) => update("resume_url", e.target.value)}
              placeholder="/uploads/resume.pdf"
            />
            <label className="shrink-0 inline-flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border-custom text-sm text-text-secondary hover:text-text-primary cursor-pointer">
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              Upload PDF
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleResumeUpload}
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-emerald text-white font-medium disabled:opacity-70 shadow-md hover:shadow-accent-primary/20 transition-all"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? "Saved Successfully!" : "Save Profile Settings"}
        </button>
      </form>
    </div>
  );
}
