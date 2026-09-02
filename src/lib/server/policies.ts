import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { FAVORITE_NEEDS_VERIFICATION } from "@/lib/auth/email-otp-lib";
import { requireVerifiedFeatures } from "@/lib/auth/verified-features";
import { seedIfNeeded } from "@/lib/seed";
import { expandQuery, scorePolicy, matchesRegionFilter, type PolicyRow } from "@/lib/search";
import { FEATURED_IDS } from "@/data/copy";

export type PolicyListItem = {
  id: string;
  title: string;
  shortTitle: string;
  level: string;
  regionCode: string;
  regionName: string;
  category: string;
  disabilityTypes: string[];
  summary: string;
  docNo: string;
  status: string;
  issuedAt: string;
};

export type PolicyDetail = PolicyListItem & {
  keyPoints: string[];
  eligibility: string;
  howToApply: string;
  body: string;
  sourceName: string;
  sourceUrl: string;
  effectiveAt: string;
  keywords: string[];
  relatedIds: string[];
};

function toListItem(row: PolicyRow): PolicyListItem {
  return {
    id: row.id,
    title: row.title,
    shortTitle: row.short_title,
    level: row.level,
    regionCode: row.region_code,
    regionName: row.region_name,
    category: row.category,
    disabilityTypes: row.disability_types.split(",").filter(Boolean),
    summary: row.summary,
    docNo: row.doc_no,
    status: row.status,
    issuedAt: row.issued_at,
  };
}

function toDetail(row: PolicyRow): PolicyDetail {
  let keyPoints: string[] = [];
  try {
    keyPoints = JSON.parse(row.key_points) as string[];
  } catch {
    keyPoints = [];
  }
  return {
    ...toListItem(row),
    keyPoints,
    eligibility: row.eligibility,
    howToApply: row.how_to_apply,
    body: row.body,
    sourceName: row.source_name,
    sourceUrl: row.source_url,
    effectiveAt: row.effective_at,
    keywords: row.keywords.split(",").filter(Boolean),
    relatedIds: row.related_ids.split(",").filter(Boolean),
  };
}

const FEATURED_SET = new Set<string>(FEATURED_IDS);

export const getStats = createServerFn({ method: "GET" }).handler(async () => {
  await seedIfNeeded();
  const sql = await getSql();
  const [all] = await sql<{ n: number }>`select count(*)::int as n from policies`;
  const [nat] = await sql<{
    n: number;
  }>`select count(*)::int as n from policies where level = ${"national"}`;
  const regions = await sql<{
    n: number;
  }>`select count(distinct region_code)::int as n from policies`;
  return {
    total: all?.n ?? 0,
    national: nat?.n ?? 0,
    regions: regions[0]?.n ?? 0,
  };
});

export const listPolicies = createServerFn({ method: "GET" })
  .validator(
    (input: {
      q?: string;
      category?: string;
      region?: string;
      level?: string;
      disability?: string;
      limit?: number;
    }) => input,
  )
  .handler(async ({ data }) => {
    await seedIfNeeded();
    const sql = await getSql();
    const rows = await sql<PolicyRow>`select * from policies`;
    const terms = expandQuery(data.q ?? "");
    const prefer = data.region && data.region !== "CN" ? data.region : undefined;
    let filtered = rows;
    if (data.category) filtered = filtered.filter((r) => r.category === data.category);
    if (data.level) filtered = filtered.filter((r) => r.level === data.level);
    if (data.region && data.region !== "ALL") {
      filtered = filtered.filter((r) => matchesRegionFilter(r.region_code, data.region));
    }
    if (data.disability && data.disability !== "all") {
      filtered = filtered.filter((r) => {
        const types = r.disability_types.split(",");
        return types.includes("all") || types.includes(data.disability as string);
      });
    }
    const ranked = filtered
      .map((r) => ({ r, s: scorePolicy(r, terms, prefer) }))
      .filter((x) => (terms.length === 0 ? true : x.s > 0))
      .sort((a, b) => b.s - a.s);
    const limit = Math.min(data.limit ?? 60, 120);
    return {
      total: ranked.length,
      items: ranked.slice(0, limit).map((x) => toListItem(x.r)),
    };
  });

export const getPolicy = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    await seedIfNeeded();
    const sql = await getSql();
    const rows = await sql<PolicyRow>`select * from policies where id = ${id}`;
    const row = rows[0];
    if (!row) return null;
    const detail = toDetail(row);
    const related: PolicyListItem[] = [];
    for (const rid of detail.relatedIds.slice(0, 6)) {
      const found = await sql<PolicyRow>`select * from policies where id = ${rid}`;
      if (found[0]) related.push(toListItem(found[0]));
    }
    return { policy: detail, related };
  });

export const getFeatured = createServerFn({ method: "GET" }).handler(async () => {
  await seedIfNeeded();
  const sql = await getSql();
  const items: PolicyListItem[] = [];
  for (const id of FEATURED_IDS) {
    const rows = await sql<PolicyRow>`select * from policies where id = ${id}`;
    if (rows[0]) items.push(toListItem(rows[0]));
  }
  return items;
});

export const toggleBookmark = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((policyId: string) => policyId)
  .handler(async ({ context, data: policyId }) => {
    const sql = await getSql();
    const existing = await sql<{ policy_id: string }>`
      select policy_id from bookmarks where user_id = ${context.userId} and policy_id = ${policyId}
    `;
    if (existing[0]) {
      await sql`delete from bookmarks where user_id = ${context.userId} and policy_id = ${policyId}`;
      return { saved: false };
    }
    await requireVerifiedFeatures(context.userId, FAVORITE_NEEDS_VERIFICATION);
    await sql`insert into bookmarks (user_id, policy_id) values (${context.userId}, ${policyId})`;
    return { saved: true };
  });

export const listBookmarks = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await seedIfNeeded();
    const sql = await getSql();
    const rows = await sql<PolicyRow>`
      select p.* from policies p
      inner join bookmarks b on b.policy_id = p.id
      where b.user_id = ${context.userId}
      order by b.created_at desc
    `;
    return rows.map(toListItem);
  });

export const isBookmarked = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((policyId: string) => policyId)
  .handler(async ({ context, data: policyId }) => {
    const sql = await getSql();
    const rows = await sql<{ n: number }>`
      select count(*)::int as n from bookmarks
      where user_id = ${context.userId} and policy_id = ${policyId}
    `;
    return (rows[0]?.n ?? 0) > 0;
  });

export async function retrieveForQuestion(
  question: string,
  region?: string,
  disabilityTypes?: string[],
  limit = 8,
): Promise<PolicyDetail[]> {
  await seedIfNeeded();
  const sql = await getSql();
  const rows = await sql<PolicyRow>`select * from policies`;
  const terms = expandQuery(question);
  const ranked = rows
    .map((r) => {
      let s = scorePolicy(r, terms, region);
      if (disabilityTypes?.length) {
        const types = r.disability_types.split(",");
        if (types.includes("all") || disabilityTypes.some((d) => types.includes(d))) {
          s += 3;
        }
      }
      return { r, s };
    })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => toDetail(x.r));
  if (ranked.length === 0) {
    return rows.filter((r) => FEATURED_SET.has(r.id)).map(toDetail);
  }
  return ranked;
}
