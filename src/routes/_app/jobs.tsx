import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { OrgCard } from "@/components/org-card";
import { PolicyCard } from "@/components/policy-card";
import { RegionPicker } from "@/components/region-picker";
import { isOfficialOpenableUrl } from "@/lib/official-url";
import { listOrgs } from "@/lib/server/orgs";
import { listPolicies, type PolicyListItem } from "@/lib/server/policies";
import type { OrgKind, OrgRecord } from "@/data/orgs";

type SearchParams = { region?: string };

export const Route = createFileRoute("/_app/jobs")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    region: typeof s.region === "string" ? s.region : undefined,
  }),
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => {
    const region = deps.region;
    const [byCat, byKw, orgs] = await Promise.all([
      listPolicies({ data: { category: "employment", region, limit: 80 } }),
      listPolicies({ data: { q: "按比例 超比例 就业服务", region, limit: 40 } }),
      listOrgs({ data: { region } }),
    ]);
    const seen = new Set<string>();
    const policies: PolicyListItem[] = [];
    for (const p of [...byCat.items, ...byKw.items]) {
      if (seen.has(p.id)) continue;
      const hay = `${p.category} ${p.title} ${p.shortTitle} ${p.summary}`;
      if (
        p.category !== "employment" &&
        !/按比例|超比例|就业服务|残保金|就业保障金|辅助性就业/.test(hay)
      ) {
        continue;
      }
      seen.add(p.id);
      policies.push(p);
    }
    const JOB_KINDS = new Set<OrgKind>(["cdpf", "hrss", "employment_service"]);
    const portals: OrgRecord[] = orgs.items.filter(
      (o) => JOB_KINDS.has(o.kind) && isOfficialOpenableUrl(o.website),
    );
    return { policies, portals };
  },
  component: JobsPage,
});

function JobsPage() {
  const search = Route.useSearch();
  const { policies, portals } = Route.useLoaderData();
  const navigate = useNavigate({ from: "/jobs" });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-2xl font-semibold">
          <span className="inline-flex items-center gap-2">
            <Briefcase className="size-6 text-primary" aria-hidden />
            就业
          </span>
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          只展示政策库中的就业相关文件，以及残联、人社、残疾人就业服务机构的官方网站。本栏不发布岗位、不接受简历、不匹配求职、不提供网申表格。金额、比例、申报时间和材料以当地公示和文件原文为准。
        </p>
      </header>

      <RegionPicker
        value={search.region ?? "ALL"}
        onChange={(v) =>
          void navigate({ search: { region: v === "ALL" ? undefined : v } })
        }
        idPrefix="jobs"
      />

      <section aria-labelledby="jobs-policies-heading">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 id="jobs-policies-heading" className="font-display text-xl font-semibold">
            就业相关政策
          </h2>
          <Link
            to="/library"
            search={{ category: "employment", region: search.region }}
            className="inline-flex h-11 items-center text-sm font-medium text-primary"
          >
            在政策库中查看全部就业主题
          </Link>
        </div>
        <p className="mt-1 text-sm text-muted">
          含按比例就业、超比例奖励、就业服务、残保金等。具体标准以原文和当地公示为准。
        </p>
        {policies.length === 0 ? (
          <p className="mt-4 rounded-xl bg-surface p-8 text-center text-muted">
            当前地区暂无匹配条目。可改选全国，或{" "}
            <Link to="/library" className="font-medium text-primary">
              打开政策库
            </Link>
            。
          </p>
        ) : (
          <ul className="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2">
            {policies.map((p) => (
              <li key={p.id}>
                <PolicyCard policy={p} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="jobs-portals-heading">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 id="jobs-portals-heading" className="font-display text-xl font-semibold">
            官方办事入口
          </h2>
          <Link to="/orgs" className="inline-flex h-11 items-center text-sm font-medium text-primary">
            打开黄页
          </Link>
        </div>
        <p className="mt-1 text-sm text-muted">
          仅列出黄页中已核验、可打开的官方网站。没有单独官网的机构，请拨 12385 / 12333，或通过黄页查找。
        </p>
        {portals.length === 0 ? (
          <p className="mt-4 rounded-xl bg-surface p-8 text-center text-muted">
            当前筛选下没有可打开的官网链接。请改选地区或使用黄页。
          </p>
        ) : (
          <ul className="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2">
            {portals.map((o) => (
              <li key={o.id}>
                <OrgCard org={o} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
