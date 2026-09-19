"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Save, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { ICON_KEYS } from "@/lib/icon-map";

type Props = {
  section: string;
  title: string;
  description?: string;
  /** array | object | strings */
  kind: "array" | "object" | "strings";
  /** field schema for array items */
  fields?: {
    key: string;
    label: string;
    type?: "text" | "textarea" | "number" | "color" | "icon";
  }[];
  objectFields?: {
    key: string;
    label: string;
    type?: "textarea-list";
  }[];
};

export function ContentSectionEditor({
  section,
  title,
  description,
  kind,
  fields = [],
  objectFields = [],
}: Props) {
  const [data, setData] = useState<unknown>(null);
  const [rawJson, setRawJson] = useState("");
  const [showJson, setShowJson] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/content/${section}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load");
      setData(json.data);
      setRawJson(JSON.stringify(json.data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [section]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (payload: unknown) => {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch(`/api/content/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: payload }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save");
      setData(json.data);
      setRawJson(JSON.stringify(json.data, null, 2));
      setMessage("Saved");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const saveJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      save(parsed);
    } catch {
      setError("Invalid JSON");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-text-secondary py-12">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading {title}…
      </div>
    );
  }

  const arrayData = Array.isArray(data) ? (data as Record<string, unknown>[]) : [];
  const stringData = Array.isArray(data) ? (data as string[]) : [];
  const objectData =
    data && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : {};

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold font-heading text-text-primary">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-text-secondary mt-1">{description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => save(data)}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-sm font-semibold disabled:opacity-70"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save
        </button>
      </div>

      {message && <p className="text-sm text-emerald-500">{message}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {kind === "strings" && (
        <div className="space-y-3">
          {stringData.map((line, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={line}
                onChange={(e) => {
                  const next = [...stringData];
                  next[i] = e.target.value;
                  setData(next);
                }}
                className="flex-1 px-3 py-2 rounded-lg bg-surface-elevated border border-border-custom text-text-primary text-sm"
              />
              <button
                type="button"
                onClick={() => setData(stringData.filter((_, j) => j !== i))}
                className="p-2 text-text-secondary hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setData([...stringData, "New title"])}
            className="inline-flex items-center gap-1 text-sm text-accent-primary"
          >
            <Plus className="w-4 h-4" /> Add title
          </button>
        </div>
      )}

      {kind === "object" && (
        <div className="space-y-3">
          {objectFields.map((f) => {
            if (f.type === "textarea-list") {
              const paras = Array.isArray(objectData[f.key])
                ? (objectData[f.key] as string[])
                : [];
              return (
                <div key={f.key} className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    {f.label}
                  </label>
                  {paras.map((p, i) => (
                    <div key={i} className="flex gap-2">
                      <textarea
                        value={p}
                        rows={3}
                        onChange={(e) => {
                          const next = [...paras];
                          next[i] = e.target.value;
                          setData({ ...objectData, [f.key]: next });
                        }}
                        className="flex-1 px-3 py-2 rounded-lg bg-surface-elevated border border-border-custom text-text-primary text-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setData({
                            ...objectData,
                            [f.key]: paras.filter((_, j) => j !== i),
                          })
                        }
                        className="p-2 text-text-secondary hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setData({
                        ...objectData,
                        [f.key]: [...paras, "New paragraph"],
                      })
                    }
                    className="inline-flex items-center gap-1 text-sm text-accent-primary"
                  >
                    <Plus className="w-4 h-4" /> Add paragraph
                  </button>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      {kind === "array" && (
        <div className="space-y-4">
          {arrayData.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-border-custom bg-surface space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-text-secondary">
                  #{i + 1}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    disabled={i === 0}
                    onClick={() => {
                      const next = [...arrayData];
                      [next[i - 1], next[i]] = [next[i], next[i - 1]];
                      setData(next);
                    }}
                    className="p-1.5 text-text-secondary hover:text-text-primary disabled:opacity-30"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={i === arrayData.length - 1}
                    onClick={() => {
                      const next = [...arrayData];
                      [next[i], next[i + 1]] = [next[i + 1], next[i]];
                      setData(next);
                    }}
                    className="p-1.5 text-text-secondary hover:text-text-primary disabled:opacity-30"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setData(arrayData.filter((_, j) => j !== i))
                    }
                    className="p-1.5 text-text-secondary hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fields.map((f) => {
                  const value = item[f.key];
                  if (f.type === "icon") {
                    return (
                      <label key={f.key} className="text-sm space-y-1">
                        <span className="text-text-secondary">{f.label}</span>
                        <select
                          value={String(value ?? "Sparkles")}
                          onChange={(e) => {
                            const next = [...arrayData];
                            next[i] = { ...item, [f.key]: e.target.value };
                            setData(next);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-surface-elevated border border-border-custom text-text-primary text-sm"
                        >
                          {ICON_KEYS.map((k) => (
                            <option key={k} value={k}>
                              {k}
                            </option>
                          ))}
                        </select>
                      </label>
                    );
                  }
                  if (f.type === "textarea") {
                    return (
                      <label
                        key={f.key}
                        className="text-sm space-y-1 md:col-span-2"
                      >
                        <span className="text-text-secondary">{f.label}</span>
                        <textarea
                          rows={3}
                          value={String(value ?? "")}
                          onChange={(e) => {
                            const next = [...arrayData];
                            next[i] = { ...item, [f.key]: e.target.value };
                            setData(next);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-surface-elevated border border-border-custom text-text-primary text-sm"
                        />
                      </label>
                    );
                  }
                  return (
                    <label key={f.key} className="text-sm space-y-1">
                      <span className="text-text-secondary">{f.label}</span>
                      <input
                        type={
                          f.type === "number"
                            ? "number"
                            : f.type === "color"
                              ? "text"
                              : "text"
                        }
                        value={String(value ?? "")}
                        onChange={(e) => {
                          const next = [...arrayData];
                          const v =
                            f.type === "number"
                              ? Number(e.target.value)
                              : e.target.value;
                          next[i] = { ...item, [f.key]: v };
                          setData(next);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-surface-elevated border border-border-custom text-text-primary text-sm"
                        placeholder={f.type === "color" ? "#7C3AED" : undefined}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const blank: Record<string, unknown> = {};
              for (const f of fields) {
                blank[f.key] =
                  f.type === "number"
                    ? arrayData.length + 1
                    : f.type === "color"
                      ? "#7C3AED"
                      : f.type === "icon"
                        ? "Sparkles"
                        : "";
              }
              setData([...arrayData, blank]);
            }}
            className="inline-flex items-center gap-1 text-sm text-accent-primary"
          >
            <Plus className="w-4 h-4" /> Add item
          </button>
        </div>
      )}

      <details
        className="mt-6"
        open={showJson}
        onToggle={(e) => setShowJson((e.target as HTMLDetailsElement).open)}
      >
        <summary className="cursor-pointer text-sm text-text-secondary">
          Advanced: edit JSON
        </summary>
        <div className="mt-3 space-y-2">
          <textarea
            value={rawJson}
            onChange={(e) => setRawJson(e.target.value)}
            rows={14}
            className="w-full px-3 py-2 rounded-lg bg-surface-elevated border border-border-custom text-text-primary text-xs font-mono"
          />
          <button
            type="button"
            onClick={saveJson}
            disabled={saving}
            className="px-3 py-1.5 rounded-lg border border-border-custom text-sm text-text-primary"
          >
            Save JSON
          </button>
        </div>
      </details>
    </div>
  );
}
