/**
 * CI-able data integrity check: unique policy/org ids, relatedIds all exist.
 *
 * Usage: node scripts/check-policy-ids.mjs
 * Loads TypeScript via Vite SSR (same as export-mp-policies.mjs). No network.
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

/**
 * @param {{ id: string, relatedIds?: string[] }[]} policies
 * @param {{ id: string }[]} orgs
 * @returns {string[]} error messages (empty = pass)
 */
export function checkPolicyAndOrgIds(policies, orgs) {
  const errors = [];
  const policyIds = new Map();
  const orgIds = new Map();

  for (const p of policies) {
    if (!p?.id || typeof p.id !== "string") {
      errors.push("policy record missing id");
      continue;
    }
    if (policyIds.has(p.id)) {
      errors.push(`duplicate policy id: ${p.id}`);
    } else {
      policyIds.set(p.id, p);
    }
  }

  for (const o of orgs) {
    if (!o?.id || typeof o.id !== "string") {
      errors.push("org record missing id");
      continue;
    }
    if (orgIds.has(o.id)) {
      errors.push(`duplicate org id: ${o.id}`);
    } else {
      orgIds.set(o.id, o);
    }
  }

  for (const p of policies) {
    const related = p.relatedIds;
    if (related == null) continue;
    if (!Array.isArray(related)) {
      errors.push(`policy ${p.id}: relatedIds is not an array`);
      continue;
    }
    for (const rid of related) {
      if (typeof rid !== "string" || !rid) {
        errors.push(`policy ${p.id}: empty relatedId`);
        continue;
      }
      if (!policyIds.has(rid)) {
        errors.push(`policy ${p.id}: dangling relatedId "${rid}"`);
      }
    }
  }

  return errors;
}

export async function loadCatalog() {
  const server = await createServer({
    root,
    server: { middlewareMode: true },
    appType: "custom",
    configFile: false,
    resolve: {
      alias: { "@": join(root, "src") },
    },
  });
  try {
    const { ALL_POLICIES } = await server.ssrLoadModule("/src/data/index.ts");
    const { ALL_ORGS } = await server.ssrLoadModule("/src/data/orgs.ts");
    return { policies: ALL_POLICIES, orgs: ALL_ORGS };
  } finally {
    await server.close();
  }
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const { policies, orgs } = await loadCatalog();
  const errors = checkPolicyAndOrgIds(policies, orgs);
  if (errors.length) {
    console.error(`check-policy-ids: ${errors.length} error(s)`);
    for (const e of errors) console.error("  " + e);
    process.exit(1);
  }
  console.log(
    `check-policy-ids: ok (${policies.length} policies, ${orgs.length} orgs)`,
  );
}
