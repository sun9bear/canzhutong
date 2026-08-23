/**
 * Policy catalog for the WeChat mini-program.
 * Same source as H5: src/data -> public/data/policies.json
 * (exported by scripts/export-mp-policies.mjs).
 *
 * Default: fetch from VITE_MP_DATA_BASE (fallback https://canzhutong.vercel.app).
 * Do not bundle the full JSON into the mini package (size limit).
 */
export type PolicyRecord = {
  id: string;
  title: string;
  shortTitle: string;
  level: string;
  regionCode: string;
  regionName: string;
  category: string;
  disabilityTypes: string[];
  summary: string;
  keyPoints: string[];
  eligibility: string;
  howToApply: string;
  body: string;
  sourceName: string;
  sourceUrl: string;
  docNo: string;
  issuedAt: string;
  effectiveAt: string;
  status: string;
  keywords: string;
  relatedIds: string[];
};

export type PolicyListItem = Pick<
  PolicyRecord,
  | "id"
  | "title"
  | "shortTitle"
  | "level"
  | "regionName"
  | "category"
  | "summary"
  | "status"
  | "issuedAt"
  | "docNo"
>;

export type LabelRow = { id: string; label: string };

export type PoliciesPayload = {
  version: number;
  generatedAt?: string;
  source?: string;
  disclaimer: string;
  featuredIds: string[];
  levels: LabelRow[];
  categories: LabelRow[];
  policies: PolicyRecord[];
};

const DEFAULT_DATA_BASE = "https://canzhutong.vercel.app";

let cache: PoliciesPayload | null = null;
let inflight: Promise<PoliciesPayload> | null = null;

export function getMpDataBase(): string {
  // Prefer VITE_API_BASE (documented); VITE_MP_DATA_BASE kept as alias.
  const raw =
    (import.meta.env.VITE_API_BASE as string | undefined)?.trim() ||
    (import.meta.env.VITE_MP_DATA_BASE as string | undefined)?.trim() ||
    "";
  if (!raw) return DEFAULT_DATA_BASE;
  return raw.replace(/\/$/, "");
}

export function getPoliciesUrl(): string {
  return getMpDataBase() + "/data/policies.json";
}

function normalizePolicy(raw: Record<string, unknown>): PolicyRecord {
  const keyPoints = Array.isArray(raw.keyPoints) ? (raw.keyPoints as string[]) : [];
  const disabilityTypes = Array.isArray(raw.disabilityTypes)
    ? (raw.disabilityTypes as string[])
    : [];
  const relatedIds = Array.isArray(raw.relatedIds) ? (raw.relatedIds as string[]) : [];
  return {
    id: String(raw.id ?? ""),
    title: String(raw.title ?? ""),
    shortTitle: String(raw.shortTitle ?? ""),
    level: String(raw.level ?? ""),
    regionCode: String(raw.regionCode ?? ""),
    regionName: String(raw.regionName ?? ""),
    category: String(raw.category ?? ""),
    disabilityTypes,
    summary: String(raw.summary ?? ""),
    keyPoints,
    eligibility: String(raw.eligibility ?? ""),
    howToApply: String(raw.howToApply ?? ""),
    body: String(raw.body ?? ""),
    sourceName: String(raw.sourceName ?? ""),
    sourceUrl: String(raw.sourceUrl ?? ""),
    docNo: String(raw.docNo ?? ""),
    issuedAt: String(raw.issuedAt ?? ""),
    effectiveAt: String(raw.effectiveAt ?? ""),
    status: String(raw.status ?? ""),
    keywords: String(raw.keywords ?? ""),
    relatedIds,
  };
}

function parsePayload(data: unknown): PoliciesPayload {
  const obj = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;
  const list = Array.isArray(obj.policies) ? obj.policies : [];
  return {
    version: typeof obj.version === "number" ? obj.version : 1,
    generatedAt: typeof obj.generatedAt === "string" ? obj.generatedAt : undefined,
    source: typeof obj.source === "string" ? obj.source : undefined,
    disclaimer: typeof obj.disclaimer === "string" ? obj.disclaimer : "",
    featuredIds: Array.isArray(obj.featuredIds) ? (obj.featuredIds as string[]) : [],
    levels: Array.isArray(obj.levels) ? (obj.levels as LabelRow[]) : [],
    categories: Array.isArray(obj.categories) ? (obj.categories as LabelRow[]) : [],
    policies: (list as Record<string, unknown>[]).map(normalizePolicy),
  };
}

export function loadPoliciesCatalog(): Promise<PoliciesPayload> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;

  const url = getPoliciesUrl();
  inflight = new Promise((resolve, reject) => {
    uni.request({
      url,
      method: "GET",
      dataType: "json",
      timeout: 60000,
      success: (res) => {
        const statusCode = res.statusCode ?? 0;
        if (statusCode >= 200 && statusCode < 300) {
          try {
            const parsed = parsePayload(res.data);
            if (!parsed.policies.length) {
              reject(new Error("\u653f\u7b56\u6570\u636e\u4e3a\u7a7a\uff0c\u8bf7\u786e\u8ba4\u5df2\u5bfc\u51fa public/data/policies.json"));
              return;
            }
            cache = parsed;
            resolve(parsed);
          } catch (err) {
            reject(err instanceof Error ? err : new Error("\u89e3\u6790\u653f\u7b56\u6570\u636e\u5931\u8d25"));
          }
        } else {
          reject(
            new Error(
              "\u52a0\u8f7d\u653f\u7b56\u5931\u8d25 HTTP " +
                statusCode +
                ": " +
                url +
                "\u3002\u8bf7\u68c0\u67e5 VITE_API_BASE / VITE_MP_DATA_BASE \u4e0e public/data/policies.json \u662f\u5426\u5df2\u53d1\u5e03\u3002",
            ),
          );
        }
      },
      fail: (err) => {
        const msg =
          (err && typeof err === "object" && "errMsg" in err
            ? String((err as { errMsg?: string }).errMsg)
            : "") || "\u7f51\u7edc\u8bf7\u6c42\u5931\u8d25";
        reject(new Error(msg));
      },
    });
  });

  return inflight.finally(() => {
    inflight = null;
  });
}

export function getCachedCatalog(): PoliciesPayload | null {
  return cache;
}

export function getPolicyById(id: string): PolicyRecord | undefined {
  if (!cache || !id) return undefined;
  return cache.policies.find((p) => p.id === id);
}

export function levelLabel(level: string, catalog?: PoliciesPayload | null): string {
  const rows = catalog?.levels ?? cache?.levels ?? [];
  return rows.find((l) => l.id === level)?.label || level;
}

export function categoryLabel(
  category: string,
  catalog?: PoliciesPayload | null,
): string {
  const rows = catalog?.categories ?? cache?.categories ?? [];
  return rows.find((c) => c.id === category)?.label || category;
}

export function listPolicies(opts?: {
  q?: string;
  limit?: number;
}): PolicyRecord[] {
  if (!cache) return [];
  const q = opts?.q?.trim() || "";
  let list = cache.policies;
  if (q) {
    list = list.filter((p) => {
      const hay = [
        p.title,
        p.shortTitle,
        p.summary,
        p.keywords,
        p.regionName,
        p.docNo,
      ].join(" ");
      return hay.includes(q);
    });
  }
  const limit = opts?.limit;
  if (typeof limit === "number" && limit > 0) {
    return list.slice(0, limit);
  }
  return list;
}

export function listFeaturedPolicies(): PolicyRecord[] {
  if (!cache) return [];
  const byId = new Map(cache.policies.map((i) => [i.id, i] as const));
  return cache.featuredIds
    .map((id) => byId.get(id))
    .filter((p): p is PolicyRecord => Boolean(p));
}

/** Legacy empty placeholder -- pages should use async loader */
export const POLICY_PLACEHOLDERS: PolicyListItem[] = [];
