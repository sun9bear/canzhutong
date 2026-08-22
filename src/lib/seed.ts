import { ALL_POLICIES } from "@/data";
import { ALL_ORGS } from "@/data/orgs";
import { getSql } from "@/lib/db";

const globalRef = globalThis as typeof globalThis & {
  __policySeedPromiseV65__?: Promise<void>;
};

export async function seedIfNeeded(): Promise<void> {
  globalRef.__policySeedPromiseV65__ ??= (async () => {
    const sql = await getSql();
    await sql.query(`
      create table if not exists orgs (
        id text primary key,
        name text not null,
        short_name text not null,
        kind text not null,
        level text not null,
        region_code text not null,
        region_name text not null,
        address text not null default '',
        postcode text not null default '',
        phones text not null default '',
        hotline text not null default '12385',
        website text not null default '',
        hours text not null default '',
        notes text not null default '',
        source_name text not null,
        source_url text not null default '',
        verified_at text not null default ''
      )
    `);
    for (const p of ALL_POLICIES) {
      await sql`
        insert into policies (
          id, title, short_title, level, region_code, region_name, category,
          disability_types, summary, key_points, eligibility, how_to_apply, body,
          source_name, source_url, doc_no, issued_at, effective_at, status,
          keywords, related_ids
        ) values (
          ${p.id}, ${p.title}, ${p.shortTitle}, ${p.level}, ${p.regionCode},
          ${p.regionName}, ${p.category}, ${p.disabilityTypes.join(",")},
          ${p.summary}, ${JSON.stringify(p.keyPoints)}, ${p.eligibility},
          ${p.howToApply}, ${p.body}, ${p.sourceName}, ${p.sourceUrl},
          ${p.docNo}, ${p.issuedAt}, ${p.effectiveAt}, ${p.status},
          ${p.keywords}, ${p.relatedIds.join(",")}
        )
        on conflict (id) do update set
          title = excluded.title,
          short_title = excluded.short_title,
          level = excluded.level,
          region_code = excluded.region_code,
          region_name = excluded.region_name,
          category = excluded.category,
          disability_types = excluded.disability_types,
          summary = excluded.summary,
          key_points = excluded.key_points,
          eligibility = excluded.eligibility,
          how_to_apply = excluded.how_to_apply,
          body = excluded.body,
          source_name = excluded.source_name,
          source_url = excluded.source_url,
          doc_no = excluded.doc_no,
          issued_at = excluded.issued_at,
          effective_at = excluded.effective_at,
          status = excluded.status,
          keywords = excluded.keywords,
          related_ids = excluded.related_ids
      `;
    }
    for (const o of ALL_ORGS) {
      await sql`
        insert into orgs (
          id, name, short_name, kind, level, region_code, region_name,
          address, postcode, phones, hotline, website, hours, notes,
          source_name, source_url, verified_at
        ) values (
          ${o.id}, ${o.name}, ${o.shortName}, ${o.kind}, ${o.level},
          ${o.regionCode}, ${o.regionName}, ${o.address}, ${o.postcode},
          ${o.phones.join(",")}, ${o.hotline}, ${o.website}, ${o.hours},
          ${o.notes}, ${o.sourceName}, ${o.sourceUrl}, ${o.verifiedAt}
        )
        on conflict (id) do update set
          name = excluded.name,
          short_name = excluded.short_name,
          kind = excluded.kind,
          level = excluded.level,
          region_code = excluded.region_code,
          region_name = excluded.region_name,
          address = excluded.address,
          postcode = excluded.postcode,
          phones = excluded.phones,
          hotline = excluded.hotline,
          website = excluded.website,
          hours = excluded.hours,
          notes = excluded.notes,
          source_name = excluded.source_name,
          source_url = excluded.source_url,
          verified_at = excluded.verified_at
      `;
    }
  })().catch((err) => {
    globalRef.__policySeedPromiseV65__ = undefined;
    throw err;
  });
  return globalRef.__policySeedPromiseV65__;
}
