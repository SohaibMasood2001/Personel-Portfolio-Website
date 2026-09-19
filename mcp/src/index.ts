#!/usr/bin/env node
/**
 * Personal Portfolio Admin MCP — stdio server.
 * Talks to the running Next.js app via Bearer MCP_ADMIN_API_KEY.
 * GitHub: PR-only via `gh` (never push to main).
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MCP_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(MCP_ROOT, "..");
const EXPORTS_DIR = path.join(MCP_ROOT, "exports");

function baseUrl() {
  return (
    process.env.PORTFOLIO_API_BASE_URL ||
    process.env.BRENTHIX_API_BASE_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

function apiKey() {
  const key = process.env.MCP_ADMIN_API_KEY || "";
  if (key.length < 16) {
    throw new Error(
      "MCP_ADMIN_API_KEY must be set (min 16 chars) in the MCP server env"
    );
  }
  return key;
}

async function api(
  method: string,
  pathname: string,
  body?: unknown
): Promise<unknown> {
  const res = await fetch(`${baseUrl()}${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    const err =
      typeof json === "object" && json && "error" in json
        ? String((json as { error: string }).error)
        : res.statusText;
    throw new Error(`API ${method} ${pathname} → ${res.status}: ${err}`);
  }
  return json;
}

function textResult(data: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text:
          typeof data === "string" ? data : JSON.stringify(data, null, 2),
      },
    ],
  };
}

const server = new McpServer({
  name: "portfolio-admin",
  version: "1.0.0",
});

server.tool(
  "list_tools_help",
  "Summarize Portfolio admin MCP tools and safety rules",
  {},
  async () =>
    textResult({
      baseUrl: baseUrl(),
      rules: [
        "Writes require MCP_ADMIN_API_KEY matching the Next.js .env",
        "delete_* tools need confirm: true",
        "github_open_content_pr never pushes to main — opens a PR only",
      ],
      tools: [
        "get_settings / update_settings",
        "list_projects / get_project / create_project / update_project / delete_project",
        "list_messages / mark_message_read / delete_message",
        "list_content_sections / get_content / update_content",
        "export_site_snapshot",
        "github_open_content_pr",
      ],
      contentSections: [
        "services",
        "process",
        "why_us",
        "testimonials",
        "faqs",
        "tech_advanced",
        "tech_shipping",
        "hero_titles",
        "about_story",
        "about_milestones",
      ],
    })
);

server.tool("get_settings", "Get all site settings key/value map", {}, async () =>
  textResult(await api("GET", "/api/settings"))
);

server.tool(
  "update_settings",
  "Update one or more settings (partial map)",
  {
    settings: z
      .record(z.string(), z.string())
      .describe("Key/value settings e.g. company_name, email"),
  },
  async ({ settings }) => textResult(await api("PUT", "/api/settings", settings))
);

server.tool("list_projects", "List all projects", {}, async () =>
  textResult(await api("GET", "/api/projects"))
);

server.tool(
  "get_project",
  "Get a project by id or slug",
  { id: z.string() },
  async ({ id }) => textResult(await api("GET", `/api/projects/${id}`))
);

server.tool(
  "create_project",
  "Create a project",
  {
    title: z.string(),
    slug: z.string(),
    shortDesc: z.string(),
    longDesc: z.string(),
    techStack: z.array(z.string()).optional(),
    features: z
      .array(z.object({ title: z.string(), description: z.string() }))
      .optional(),
    featured: z.boolean().optional(),
    status: z.string().optional(),
    category: z.string().optional(),
    accentColor: z.string().optional(),
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    thumbnail: z.string().optional(),
    architecture: z.string().optional(),
    order: z.number().optional(),
  },
  async (args) => textResult(await api("POST", "/api/projects", args))
);

server.tool(
  "update_project",
  "Update a project by id",
  {
    id: z.string(),
    patch: z.record(z.string(), z.unknown()),
  },
  async ({ id, patch }) =>
    textResult(await api("PUT", `/api/projects/${id}`, patch))
);

server.tool(
  "delete_project",
  "Delete a project (requires confirm: true)",
  {
    id: z.string(),
    confirm: z.boolean(),
  },
  async ({ id, confirm }) => {
    if (!confirm) {
      return textResult({
        aborted: true,
        message: "Set confirm: true to delete",
      });
    }
    return textResult(await api("DELETE", `/api/projects/${id}`));
  }
);

server.tool("list_messages", "List contact inbox messages", {}, async () =>
  textResult(await api("GET", "/api/contact"))
);

server.tool(
  "mark_message_read",
  "Mark a message read/unread",
  {
    id: z.string(),
    read: z.boolean().default(true),
  },
  async ({ id, read }) =>
    textResult(await api("PATCH", `/api/contact/${id}`, { read }))
);

server.tool(
  "delete_message",
  "Delete a message (requires confirm: true)",
  {
    id: z.string(),
    confirm: z.boolean(),
  },
  async ({ id, confirm }) => {
    if (!confirm) {
      return textResult({
        aborted: true,
        message: "Set confirm: true to delete",
      });
    }
    return textResult(await api("DELETE", `/api/contact/${id}`));
  }
);

server.tool(
  "list_content_sections",
  "List CMS sections and current content",
  {},
  async () => textResult(await api("GET", "/api/content"))
);

server.tool(
  "get_content",
  "Get one CMS section",
  {
    section: z.string(),
  },
  async ({ section }) =>
    textResult(await api("GET", `/api/content/${section}`))
);

server.tool(
  "update_content",
  "Replace one CMS section JSON (validated server-side)",
  {
    section: z.string(),
    data: z.unknown(),
  },
  async ({ section, data }) =>
    textResult(await api("PUT", `/api/content/${section}`, { data }))
);

server.tool(
  "export_site_snapshot",
  "Write settings + content + projects snapshot under mcp/exports/",
  {},
  async () => {
    const [settings, content, projects] = await Promise.all([
      api("GET", "/api/settings"),
      api("GET", "/api/content"),
      api("GET", "/api/projects"),
    ]);
    const snapshot = {
      exportedAt: new Date().toISOString(),
      baseUrl: baseUrl(),
      settings,
      content,
      projects,
    };
    await mkdir(EXPORTS_DIR, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const file = path.join(EXPORTS_DIR, `snapshot-${stamp}.json`);
    await writeFile(file, JSON.stringify(snapshot, null, 2), "utf8");
    const seedExport = path.join(REPO_ROOT, "prisma", "content-export.json");
    await writeFile(
      seedExport,
      JSON.stringify(
        {
          exportedAt: snapshot.exportedAt,
          settings,
          content:
            typeof content === "object" && content && "content" in content
              ? (content as { content: unknown }).content
              : content,
        },
        null,
        2
      ),
      "utf8"
    );
    return textResult({
      snapshotFile: file,
      contentExport: seedExport,
      projectCount: Array.isArray(projects) ? projects.length : null,
    });
  }
);

server.tool(
  "github_open_content_pr",
  "Export content, commit on cms/* branch, open PR (never push main). confirm:false = dry-run preview.",
  {
    confirm: z.boolean().default(false),
    title: z.string().optional(),
    body: z.string().optional(),
  },
  async ({ confirm, title, body }) => {
    // Ensure snapshot exists
    const [settings, content, projects] = await Promise.all([
      api("GET", "/api/settings"),
      api("GET", "/api/content"),
      api("GET", "/api/projects"),
    ]);
    await mkdir(EXPORTS_DIR, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const snapshotRel = path.join("mcp", "exports", `snapshot-${stamp}.json`);
    const snapshotAbs = path.join(REPO_ROOT, snapshotRel);
    const exportRel = path.join("prisma", "content-export.json");
    const exportAbs = path.join(REPO_ROOT, exportRel);

    const payload = {
      exportedAt: new Date().toISOString(),
      settings,
      content,
      projects,
    };
    await writeFile(snapshotAbs, JSON.stringify(payload, null, 2), "utf8");
    await writeFile(
      exportAbs,
      JSON.stringify(
        {
          exportedAt: payload.exportedAt,
          settings,
          content:
            typeof content === "object" && content && "content" in content
              ? (content as { content: unknown }).content
              : content,
        },
        null,
        2
      ),
      "utf8"
    );

    const branch = `cms/content-${stamp.slice(0, 19)}`;
    const files = [snapshotRel, exportRel];

    if (!confirm) {
      return textResult({
        dryRun: true,
        message: "Set confirm: true to create branch, push, and open PR",
        branch,
        files,
        note: "Requires git repo + gh CLI authenticated (GITHUB_TOKEN optional)",
      });
    }

    // Refuse if somehow targeting main as branch name
    if (branch === "main" || branch === "master") {
      throw new Error("Refusing to use main/master as CMS branch");
    }

    try {
      await execFileAsync("git", ["rev-parse", "--is-inside-work-tree"], {
        cwd: REPO_ROOT,
      });
    } catch {
      throw new Error("Not a git repository — cannot open PR");
    }

    const env = {
      ...process.env,
      ...(process.env.GITHUB_TOKEN
        ? { GH_TOKEN: process.env.GITHUB_TOKEN }
        : {}),
    };

    await execFileAsync("git", ["checkout", "-B", branch], {
      cwd: REPO_ROOT,
      env,
    });
    await execFileAsync("git", ["add", "--", ...files], {
      cwd: REPO_ROOT,
      env,
    });
    try {
      await execFileAsync(
        "git",
        [
          "commit",
          "-m",
          title || "cms: export site content snapshot",
        ],
        { cwd: REPO_ROOT, env }
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (!/nothing to commit/i.test(msg)) throw e;
    }

    // Push branch only — never main
    await execFileAsync("git", ["push", "-u", "origin", `HEAD:${branch}`], {
      cwd: REPO_ROOT,
      env,
    });

    const prTitle = title || "CMS content export";
    const prBody =
      body ||
      "## Summary\n- Exported site settings/content snapshot from Portfolio admin MCP\n\n## Notes\n- Auto-generated; review before merge\n";

    const { stdout } = await execFileAsync(
      "gh",
      [
        "pr",
        "create",
        "--title",
        prTitle,
        "--body",
        prBody,
        "--head",
        branch,
      ],
      { cwd: REPO_ROOT, env }
    );

    return textResult({
      ok: true,
      branch,
      files,
      pr: stdout.trim(),
    });
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
