/**
 * Push schema + seed portfolio data to Neon (Postgres).
 *
 * Usage (PowerShell):
 *   $env:DATABASE_URL="postgresql://..."
 *   $env:DIRECT_URL="postgresql://..."
 *   npm run db:neon:setup
 *
 * Then restore the local SQLite Prisma client:
 *   npm run db:local:generate
 */
import { spawnSync } from "child_process";
import { resolve } from "path";

const root = resolve(__dirname, "..");
const schema = resolve(root, "prisma", "schema.postgres.prisma");

function run(command: string) {
  console.log(`> ${command}`);
  const result = spawnSync(command, {
    stdio: "inherit",
    shell: true,
    env: process.env,
    cwd: root,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const url = process.env.DATABASE_URL || "";
const direct = process.env.DIRECT_URL || "";

if (!url.startsWith("postgres")) {
  console.error(
    "DATABASE_URL must be a Neon/Postgres connection string (postgresql://...)."
  );
  process.exit(1);
}
if (!direct.startsWith("postgres")) {
  console.error(
    "DIRECT_URL must be set to Neon’s direct (non-pooled) connection string."
  );
  process.exit(1);
}

const schemaArg = `"${schema}"`;
run(`npx prisma generate --schema=${schemaArg}`);
run(`npx prisma db push --schema=${schemaArg}`);
run(`npx tsx prisma/seed.ts`);
console.log("\nNeon schema + seed complete.");
console.log("Restoring local SQLite Prisma client…");
run(`npx prisma generate`);
console.log("Done. Local SQLite client is active again.");
