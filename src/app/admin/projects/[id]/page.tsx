"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save, Upload, X } from "lucide-react";

interface FormState {
  title: string;
  slug: string;
  shortDesc: string;
  longDesc: string;
  techStack: string;
  features: string;
  screenshots: string[];
  thumbnail: string;
  githubUrl: string;
  liveUrl: string;
  demoVideoUrl: string;
  proofAsset: string;
  guardrails: string;
  status: string;
  featured: boolean;
  accentColor: string;
  architecture: string;
  category: string;
  order: number;
}

const emptyForm: FormState = {
  title: "",
  slug: "",
  shortDesc: "",
  longDesc: "",
  techStack: "",
  features: '[\n  { "title": "Feature", "description": "Description" }\n]',
  screenshots: [],
  thumbnail: "",
  githubUrl: "",
  liveUrl: "",
  demoVideoUrl: "",
  proofAsset: "",
  guardrails: '["staged-write", "human-confirm", "audit-ledger"]',
  status: "live",
  featured: false,
  accentColor: "#7C3AED",
  architecture: "",
  category: "ai-agent",
  order: 0,
};

export default function AdminProjectFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setForm({
          title: data.title,
          slug: data.slug,
          shortDesc: data.shortDesc,
          longDesc: data.longDesc,
          techStack: Array.isArray(data.techStack)
            ? data.techStack.join(", ")
            : "",
          features: JSON.stringify(data.features ?? [], null, 2),
          screenshots: data.screenshots ?? [],
          thumbnail: data.thumbnail ?? "",
          githubUrl: data.githubUrl ?? "",
          liveUrl: data.liveUrl ?? "",
          demoVideoUrl: data.demoVideoUrl ?? "",
          proofAsset: data.proofAsset ?? "",
          guardrails: Array.isArray(data.guardrails)
            ? JSON.stringify(data.guardrails, null, 2)
            : '[]',
          status: data.status,
          featured: data.featured,
          accentColor: data.accentColor,
          architecture: data.architecture ?? "",
          category: data.category,
          order: data.order,
        });
      })
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const update = (key: keyof FormState, value: string | boolean | number | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const slugify = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) {
      update("screenshots", [...form.screenshots, data.url]);
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleThumbUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingThumb(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) update("thumbnail", data.url);
    setUploadingThumb(false);
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    let featuresParsed;
    let guardrailsParsed: string[] = [];
    try {
      featuresParsed = JSON.parse(form.features);
    } catch {
      setError("Features must be valid JSON array");
      setSaving(false);
      return;
    }
    try {
      const g = JSON.parse(form.guardrails || "[]");
      if (!Array.isArray(g)) throw new Error("not array");
      guardrailsParsed = g.map(String);
    } catch {
      setError("Guardrails must be a JSON string array");
      setSaving(false);
      return;
    }

    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      shortDesc: form.shortDesc,
      longDesc: form.longDesc,
      techStack: form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      features: featuresParsed,
      screenshots: form.screenshots,
      thumbnail: form.thumbnail || null,
      githubUrl: form.githubUrl || null,
      liveUrl: form.liveUrl || null,
      demoVideoUrl: form.demoVideoUrl || null,
      proofAsset: form.proofAsset || null,
      guardrails: guardrailsParsed,
      status: form.status,
      featured: form.featured,
      accentColor: form.accentColor,
      architecture: form.architecture || null,
      category: form.category,
      order: Number(form.order) || 0,
    };

    const res = await fetch(isNew ? "/api/projects" : `/api/projects/${id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to save");
      setSaving(false);
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  };

  if (loading) {
    return <p className="text-text-secondary text-sm">Loading...</p>;
  }

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg bg-surface-elevated border border-border-custom text-text-primary text-sm focus:outline-none focus:border-accent-primary";

  return (
    <div>
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      <h1 className="text-2xl font-bold font-heading text-text-primary mb-8">
        {isNew ? "Add Project" : "Edit Project"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Title *
            </label>
            <input
              required
              className={inputClass}
              value={form.title}
              onChange={(e) => {
                update("title", e.target.value);
                if (isNew) update("slug", slugify(e.target.value));
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Slug *
            </label>
            <input
              required
              className={inputClass}
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Short Description *
          </label>
          <textarea
            required
            rows={2}
            className={inputClass}
            value={form.shortDesc}
            onChange={(e) => update("shortDesc", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Long Description *
          </label>
          <textarea
            required
            rows={5}
            className={inputClass}
            value={form.longDesc}
            onChange={(e) => update("longDesc", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Tech Stack (comma-separated)
          </label>
          <input
            className={inputClass}
            value={form.techStack}
            onChange={(e) => update("techStack", e.target.value)}
            placeholder="Next.js, Django, MCP"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Features (JSON array)
          </label>
          <textarea
            rows={8}
            className={`${inputClass} font-mono text-xs`}
            value={form.features}
            onChange={(e) => update("features", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Architecture (JSON diagram)
          </label>
          <p className="text-xs text-text-secondary mb-2">
            Prefer JSON with layers, nodes, items, and optional note. Plain text
            still works as a fallback.
          </p>
          <textarea
            rows={14}
            className={`${inputClass} font-mono text-xs`}
            value={form.architecture}
            onChange={(e) => update("architecture", e.target.value)}
            placeholder={`{\n  "layers": [[{ "id": "a", "title": "Client", "detail": "...", "items": ["..."] }]],\n  "note": "Optional caption"\n}`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              GitHub URL (stored for later — hidden on public site)
            </label>
            <input
              className={inputClass}
              value={form.githubUrl}
              onChange={(e) => update("githubUrl", e.target.value)}
              placeholder="Add when repos are public"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Live URL
            </label>
            <input
              className={inputClass}
              value={form.liveUrl}
              onChange={(e) => update("liveUrl", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Video URL
            </label>
            <input
              className={inputClass}
              value={form.demoVideoUrl}
              onChange={(e) => update("demoVideoUrl", e.target.value)}
              placeholder="/videos/modagent.mp4 or https://…"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Proof asset (ledger / PDF / cart screenshot)
            </label>
            <input
              className={inputClass}
              value={form.proofAsset}
              onChange={(e) => update("proofAsset", e.target.value)}
              placeholder="/thumbs/… or upload path"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Guardrails (JSON string array)
          </label>
          <p className="text-xs text-text-secondary mb-2">
            Use: staged-write, human-confirm, audit-ledger, resumable
          </p>
          <textarea
            rows={3}
            className={`${inputClass} font-mono text-xs`}
            value={form.guardrails}
            onChange={(e) => update("guardrails", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Status
            </label>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
            >
              <option value="live">Live</option>
              <option value="development">Development</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Category
            </label>
            <select
              className={inputClass}
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            >
              <option value="ai-agent">AI Agent</option>
              <option value="desktop">Desktop</option>
              <option value="web">Web</option>
              <option value="automation">Automation</option>
              <option value="ml">ML</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Accent Color
            </label>
            <input
              type="color"
              className="w-full h-[42px] rounded-lg border border-border-custom cursor-pointer"
              value={form.accentColor}
              onChange={(e) => update("accentColor", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Order
            </label>
            <input
              type="number"
              className={inputClass}
              value={form.order}
              onChange={(e) => update("order", Number(e.target.value))}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="rounded border-border-custom"
          />
          Featured on homepage
        </label>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Card Thumbnail
          </label>
          <p className="text-xs text-text-secondary mb-2">
            Small preview shown on project cards (separate from gallery).
          </p>
          {form.thumbnail ? (
            <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-border-custom mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.thumbnail}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => update("thumbnail", "")}
                className="absolute top-0.5 right-0.5 p-0.5 rounded bg-black/60 text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : null}
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border-custom text-sm text-text-secondary hover:text-text-primary cursor-pointer">
            {uploadingThumb ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            Upload thumbnail
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbUpload}
              disabled={uploadingThumb}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Screenshots
          </label>
          <div className="flex flex-wrap gap-3 mb-3">
            {form.screenshots.map((url) => (
              <div key={url} className="relative w-24 h-16 rounded-lg overflow-hidden border border-border-custom">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() =>
                    update(
                      "screenshots",
                      form.screenshots.filter((s) => s !== url)
                    )
                  }
                  className="absolute top-0.5 right-0.5 p-0.5 rounded bg-black/60 text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border-custom text-sm text-text-secondary hover:text-text-primary cursor-pointer">
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            Upload image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-accent-primary text-white font-medium disabled:opacity-70 shadow-sm"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isNew ? "Create Project" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
