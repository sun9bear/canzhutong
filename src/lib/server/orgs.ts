import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { seedIfNeeded } from "@/lib/seed";
import { matchesRegionFilter } from "@/lib/search";
import { ALL_ORGS, type OrgKind, type OrgLevel, type OrgRecord } from "@/data/orgs";

export type OrgRow = {
  id: string;
  name: string;
  short_name: string;
  kind: string;
  level: string;
  region_code: string;
  region_name: string;
  address: string;
  postcode: string;
  phones: string;
  hotline: string;
  website: string;
  hours: string;
  notes: string;
  source_name: string;
  source_url: string;
  verified_at: string;
};

function toOrg(row: OrgRow): OrgRecord {
  return {
    id: row.id,
    name: row.name,
    shortName: row.short_name,
    kind: row.kind as OrgKind,
    level: row.level as OrgLevel,
    regionCode: row.region_code,
    regionName: row.region_name,
    address: row.address,
    postcode: row.postcode,
    phones: row.phones ? row.phones.split(",").filter(Boolean) : [],
    hotline: row.hotline,
    website: row.website,
    hours: row.hours,
    notes: row.notes,
    sourceName: row.source_name,
    sourceUrl: row.source_url,
    verifiedAt: row.verified_at,
  };
}

function scoreOrg(row: OrgRow, q: string, prefer?: string) {
  const hay = `${row.name}${row.short_name}${row.region_name}${row.address}${row.notes}${row.hotline}`.toLowerCase();
  let s = 1;
  if (row.level === "national") s += 4;
  if (row.kind === "hotline") s += 6;
  if (row.kind === "cdpf") s += 3;
  if (prefer && (row.region_code === prefer || row.region_code === "CN")) s += 8;
  if (q) {
    const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length >= 2);
    for (const t of terms) {
      if (hay.includes(t)) s += 10;
    }
  }
  return s;
}

export const listOrgs = createServerFn({ method: "GET" })
  .validator(
    (input: { q?: string; region?: string; kind?: string; level?: string }) => input,
  )
  .handler(async ({ data }) => {
    await seedIfNeeded();
    const sql = await getSql();
    let rows: OrgRow[] = [];
    try {
      rows = await sql<OrgRow>`select * from orgs`;
    } catch {
      rows = ALL_ORGS.map((o) => ({
        id: o.id,
        name: o.name,
        short_name: o.shortName,
        kind: o.kind,
        level: o.level,
        region_code: o.regionCode,
        region_name: o.regionName,
        address: o.address,
        postcode: o.postcode,
        phones: o.phones.join(","),
        hotline: o.hotline,
        website: o.website,
        hours: o.hours,
        notes: o.notes,
        source_name: o.sourceName,
        source_url: o.sourceUrl,
        verified_at: o.verifiedAt,
      }));
    }
    let filtered = rows;
    if (data.kind) filtered = filtered.filter((r) => r.kind === data.kind);
    if (data.level) filtered = filtered.filter((r) => r.level === data.level);
    if (data.region && data.region !== "ALL") {
      filtered = filtered.filter((r) => matchesRegionFilter(r.region_code, data.region));
    } else {
      filtered = filtered.filter(
        (r) =>
          r.level === "national" ||
          r.level === "provincial" ||
          Boolean(r.address) ||
          Boolean(r.phones) ||
          Boolean(r.website),
      );
    }
    const q = (data.q ?? "").trim();
    const ranked = filtered
      .map((r) => ({ r, s: scoreOrg(r, q, data.region) }))
      .filter((x) => (q ? x.s >= 10 : true))
      .sort((a, b) => b.s - a.s);
    return { total: ranked.length, items: ranked.map((x) => toOrg(x.r)) };
  });

export const getOrg = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    await seedIfNeeded();
    const sql = await getSql();
    try {
      const rows = await sql<OrgRow>`select * from orgs where id = ${id}`;
      if (rows[0]) return toOrg(rows[0]);
    } catch {
      /* fall through */
    }
    return ALL_ORGS.find((o) => o.id === id) ?? null;
  });

export async function retrieveOrgs(question: string, region?: string, limit = 4): Promise<OrgRecord[]> {
  await seedIfNeeded();
  const sql = await getSql();
  let rows: OrgRow[] = [];
  try {
    rows = await sql<OrgRow>`select * from orgs`;
  } catch {
    return ALL_ORGS.slice(0, limit);
  }
  const ranked = rows
    .map((r) => ({ r, s: scoreOrg(r, question, region) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => toOrg(x.r));
  return ranked;
}
