"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

interface ProjectRow {
  id: string;
  title: string;
  slug: string;
  status: string;
  featured: boolean;
  category: string;
  accentColor: string;
  order: number;
  thumbnail: string | null;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    await load();
    setDeleting(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-text-primary">
            Projects
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Manage portfolio projects
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent-primary text-white text-sm font-medium hover:opacity-90 transition-opacity self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Link>
      </div>

      {loading ? (
        <p className="text-text-secondary text-sm">Loading...</p>
      ) : (
        <DataTable
          data={projects}
          keyExtractor={(p) => p.id}
          emptyMessage="No projects yet. Create your first one."
          columns={[
            {
              key: "title",
              header: "Title",
              render: (p) => (
                <div className="flex items-center gap-2">
                  {p.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.thumbnail}
                      alt=""
                      className="w-8 h-8 rounded object-cover shrink-0"
                    />
                  ) : (
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: p.accentColor }}
                    />
                  )}
                  <span className="font-medium">{p.title}</span>
                </div>
              ),
            },
            {
              key: "category",
              header: "Category",
              render: (p) => (
                <span className="capitalize text-text-secondary">{p.category}</span>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (p) => (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    p.status === "live"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-amber-500/10 text-amber-500"
                  }`}
                >
                  {p.status}
                </span>
              ),
            },
            {
              key: "featured",
              header: "Featured",
              render: (p) => (p.featured ? "Yes" : "No"),
            },
            {
              key: "actions",
              header: "Actions",
              render: (p) => (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/projects/${p.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg hover:bg-surface-elevated text-text-secondary hover:text-text-primary"
                    title="View"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="p-1.5 rounded-lg hover:bg-surface-elevated text-text-secondary hover:text-accent-primary"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    disabled={deleting === p.id}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-text-secondary hover:text-red-500 disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
