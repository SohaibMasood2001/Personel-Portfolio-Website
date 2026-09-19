# Brenthix Labs Admin MCP

Local stdio MCP server so any MCP client can manage the Brenthix Labs site the same way the admin UI does. Cursor and Claude Desktop are the usual clients.

## Prerequisites

1. Next.js app running (`npm run dev` in repo root).
2. Matching API key in **both** places:

**`agentic-portfolio/.env`**
```env
MCP_ADMIN_API_KEY=your-long-random-secret-at-least-16-chars
```

**MCP client env** (same value in Cursor, Claude Desktop, or another client):
```env
BRENTHIX_API_BASE_URL=http://localhost:3000
MCP_ADMIN_API_KEY=your-long-random-secret-at-least-16-chars
```

Optional for PRs:
```env
GITHUB_TOKEN=ghp_...
```

## Install & build

```bash
cd mcp
npm install
npm run build
```

## MCP client config

Use an **absolute path** to `dist/index.js`:

```json
{
  "mcpServers": {
    "brenthix-admin": {
      "command": "node",
      "args": [
        "D:/Projects/Advance Agentic Apps/Agentic Portfolio Website/agentic-portfolio/mcp/dist/index.js"
      ],
      "env": {
        "BRENTHIX_API_BASE_URL": "http://localhost:3000",
        "MCP_ADMIN_API_KEY": "your-long-random-secret-at-least-16-chars"
      }
    }
  }
}
```

## Tools

| Tool | Notes |
|------|--------|
| `list_tools_help` | Overview |
| `get_settings` / `update_settings` | Site settings |
| `list_projects` / `get_project` / `create_project` / `update_project` / `delete_project` | Projects (`delete` needs `confirm: true`) |
| `list_messages` / `mark_message_read` / `delete_message` | Inbox |
| `list_content_sections` / `get_content` / `update_content` | Homepage/tech/about CMS |
| `export_site_snapshot` | Writes `mcp/exports/snapshot-*.json` + `prisma/content-export.json` |
| `github_open_content_pr` | Dry-run unless `confirm: true`. Creates `cms/*` branch, pushes branch only, opens PR via `gh`. **Never** pushes `main`. |

## Safety

- All writes use `Authorization: Bearer MCP_ADMIN_API_KEY`.
- Content payloads are validated by the Next.js API.
- Destructive deletes require `confirm: true`.
- GitHub tool refuses to use `main`/`master` as the CMS branch name.
