/**
 * Export H5 src/data policies into public/data/policies.json
 * so the WeChat mini-program (and any client) can read the same catalog.
 *
 * Usage: node scripts/export-mp-policies.mjs
 * Requires: root dependencies installed (uses vite SSR to load TypeScript).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outPath = join(root, "public/data/policies.json");

const server = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
  configFile: false,
  resolve: {
    alias: {
      "@": join(root, "src"),
    },
  },
});

try {
  const { ALL_POLICIES } = await server.ssrLoadModule("/src/data/index.ts");
  const { FEATURED_IDS, DISCLAIMER } = await server.ssrLoadModule("/src/data/copy.ts");
  const { LEVELS, CATEGORIES } = await server.ssrLoadModule("/src/data/catalog.ts");

  const payload = {
    version: 1,
    generatedAt: new Date().toISOString(),
    source: "src/data (same seed as H5 ALL_POLICIES)",
    disclaimer: DISCLAIMER,
    featuredIds: [...FEATURED_IDS],
    levels: LEVELS.map((l) => ({ id: l.id, label: l.label })),
    categories: CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
    policies: ALL_POLICIES,
  };

  mkdirSync(dirname(outPath), { recursive: true });
  const json = JSON.stringify(payload);
  writeFileSync(outPath, json);
  const bytes = Buffer.byteLength(json, "utf8");
  console.log(
    "Wrote " + outPath + " (" + payload.policies.length + " policies, " + bytes + " bytes)",
  );
} finally {
  await server.close();
}
