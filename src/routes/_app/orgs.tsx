import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrgCard } from "@/components/org-card";
import { RegionPicker } from "@/components/region-picker";
import { listOrgs } from "@/lib/server/orgs";

type SearchParams = {
  q?: string;
  region?: string;
  kind?: string;
  level?: string;
};

export const Route = createFileRoute("/_app/orgs")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : undefined,
    region: typeof s.region === "string" ? s.region : undefined,
    kind: typeof s.kind === "string" ? s.kind : undefined,
    level: typeof s.level === "string" ? s.level : undefined,
  }),
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => listOrgs({ data: deps }),
  component: OrgsPage,
});

const KINDS: { id: string; label: string }[] = [
  { id: "", label: "全部类型" },
  { id: "hotline", label: "热线" },
  { id: "cdpf", label: "残联" },
  { id: "civil_affairs", label: "民政" },
  { id: "hrss", label: "人社" },
  { id: "tax", label: "税务" },
  { id: "legal_aid", label: "法律援助" },
  { id: "rehab", label: "康复辅具" },
  { id: "employment_service", label: "就业服务" },
];

const LEVEL_OPTS: { id: string; label: string }[] = [
  { id: "", label: "全部层级" },
  { id: "national", label: "国家" },
  { id: "provincial", label: "省级" },
  { id: "municipal", label: "地市" },
  { id: "county", label: "区县" },
];

function OrgsPage() {
  const search = Route.useSearch();
  const { items, total } = Route.useLoaderData();
  const navigate = useNavigate({ from: "/orgs" });
  const [draft, setDraft] = useState(search.q ?? "");

  function patch(next: Partial<SearchParams>) {
    void navigate({ search: (prev) => ({ ...prev, ...next }) });
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">残联与部门黄页</h1>
        <p className="mt-2 max-w-2xl text-muted">
          电话、地址只收录能核到官方来源的。没有写出来的分机，请拨 <a className="font-medium text-primary" href="tel:12385">12385</a>{" "}
          或当地 12345，不要用社交媒体上的陌生号码。
        </p>
      </header>

      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          patch({ q: draft.trim() || undefined });
        }}
      >
        <label className="sr-only" htmlFor="org-q">
          搜索机构
        </label>
        <Input
          id="org-q"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="残联、12385、湖北、两项补贴"
          className="sm:flex-1"
        />
        <Button type="submit" className="sm:w-28">
          <Search className="size-4" aria-hidden />
          查找
        </Button>
      </form>

      <div className="space-y-3">
        <RegionPicker
          value={search.region ?? "ALL"}
          onChange={(v) => patch({ region: v === "ALL" ? undefined : v })}
          idPrefix="orgs"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-muted">类型</span>
            <select
              className="h-11 w-full rounded-md border border-border bg-surface px-3"
              value={search.kind ?? ""}
              onChange={(e) => patch({ kind: e.target.value || undefined })}
            >
              {KINDS.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.label}
                </option>
              ))}
            </select>
          </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">层级</span>
          <select
            className="h-11 w-full rounded-md border border-border bg-surface px-3"
            value={search.level ?? ""}
            onChange={(e) => patch({ level: e.target.value || undefined })}
          >
            {LEVEL_OPTS.map((k) => (
              <option key={k.id} value={k.id}>
                {k.label}
              </option>
            ))}
          </select>
        </label>
        </div>
      </div>

      <p className="text-sm text-muted">共 {total} 条。电话、地址以官方来源为准。没有单独号码的机构，请拨 12385。</p>

      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((o) => (
          <li key={o.id}>
            <OrgCard org={o} />
          </li>
        ))}
      </ul>
    </div>
  );
}
