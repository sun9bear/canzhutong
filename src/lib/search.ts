import { REGIONS } from "@/data/catalog";

const ALIASES: Record<string, string[]> = {
  两项补贴: ["生活补贴", "护理补贴", "困难残疾人"],
  残保金: ["就业保障金", "按比例就业", "1.5%"],
  残疾人证: ["办证", "评残", "第二代"],
  无障碍: ["盲道", "导盲犬", "家庭改造", "信息无障碍"],
  康复救助: ["儿童康复", "孤独症", "0-6岁", "0—6岁"],
  个税: ["个人所得税", "减征"],
  托养: ["阳光家园", "残疾人之家", "日间照料"],
  高考: ["合理便利", "盲文试卷", "大字"],
  就业: ["按比例", "创业", "职业培训", "辅助性就业"],
};

function grams(text: string): string[] {
  const compact = text.replace(/\s+/g, "");
  const out = new Set<string>();
  if (compact.length <= 2) {
    if (compact) out.add(compact);
    return [...out];
  }
  for (let i = 0; i < compact.length - 1; i += 1) {
    out.add(compact.slice(i, i + 2));
  }
  if (compact.length >= 3) {
    for (let i = 0; i < compact.length - 2; i += 1) {
      out.add(compact.slice(i, i + 3));
    }
  }
  return [...out];
}

export function expandQuery(q: string): string[] {
  const raw = q.trim();
  if (!raw) return [];
  const terms = new Set<string>([raw, ...grams(raw)]);
  for (const [k, vs] of Object.entries(ALIASES)) {
    if (raw.includes(k) || k.includes(raw)) {
      terms.add(k);
      vs.forEach((v) => terms.add(v));
    }
  }
  return [...terms].filter((t) => t.length >= 2).slice(0, 24);
}

export type PolicyRow = {
  id: string;
  title: string;
  short_title: string;
  level: string;
  region_code: string;
  region_name: string;
  category: string;
  disability_types: string;
  summary: string;
  key_points: string;
  eligibility: string;
  how_to_apply: string;
  body: string;
  source_name: string;
  source_url: string;
  doc_no: string;
  issued_at: string;
  effective_at: string;
  status: string;
  keywords: string;
  related_ids: string;
};

function isPreferredRegion(code: string, prefer?: string) {
  if (!prefer) return false;
  if (code === prefer) return true;
  const row = REGIONS.find((r) => r.code === code);
  if (row?.parent === prefer) return true;
  const sel = REGIONS.find((r) => r.code === prefer);
  return Boolean(sel?.parent && sel.parent !== "CN" && code === sel.parent);
}

export function matchesRegionFilter(code: string, selected?: string) {
  if (!selected || selected === "ALL") return true;
  if (selected === "CN") return code === "CN";
  return code === selected || code === "CN" || isPreferredRegion(code, selected);
}

export function scorePolicy(
  row: PolicyRow,
  terms: string[],
  preferRegion?: string,
): number {
  if (terms.length === 0) {
    let s = row.level === "national" ? 8 : 2;
    if (preferRegion && row.region_code === preferRegion) s += 24;
    else if (isPreferredRegion(row.region_code, preferRegion)) s += 18;
    return s;
  }
  const hay = `${row.title}\n${row.short_title}\n${row.keywords}\n${row.summary}\n${row.eligibility}\n${row.doc_no}`.toLowerCase();
  const body = row.body.toLowerCase();
  let score = 0;
  for (const term of terms) {
    const t = term.toLowerCase();
    if (row.title.includes(term)) score += 14;
    else if (row.short_title.includes(term)) score += 10;
    if (row.keywords.includes(term)) score += 8;
    if (row.summary.includes(term)) score += 5;
    if (hay.includes(t)) score += 2;
    if (body.includes(t)) score += 1;
  }
  if (preferRegion && row.region_code === preferRegion) score += 18;
  else if (isPreferredRegion(row.region_code, preferRegion)) score += 12;
  if (row.region_code === "CN") score += 4;
  if (row.level === "national") score += 2;
  return score;
}
