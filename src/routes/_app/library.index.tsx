import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PolicyCard } from "@/components/policy-card";
import { CATEGORIES, DISABILITY_TYPES, LEVELS } from "@/data/catalog";
import { RegionPicker } from "@/components/region-picker";
import { listPolicies } from "@/lib/server/policies";

type SearchParams = {
  q?: string;
  category?: string;
  region?: string;
  level?: string;
  disability?: string;
};

export const Route = createFileRoute("/_app/library/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    region: typeof s.region === "string" ? s.region : undefined,
    level: typeof s.level === "string" ? s.level : undefined,
    disability: typeof s.disability === "string" ? s.disability : undefined,
  }),
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => listPolicies({ data: deps }),
  component: Library,
});

function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
    <label className="block text-sm" htmlFor={id}>
      <span className="mb-1 block text-muted">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-md border border-border bg-surface px-3 text-fg"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Library() {
  const search = Route.useSearch();
  const { items, total } = Route.useLoaderData();
  const navigate = useNavigate({ from: "/library/" });
  const [draft, setDraft] = useState(search.q ?? "");

  function patch(next: Partial<SearchParams>) {
    void navigate({
      search: (prev) => ({
        ...prev,
        ...next,
      }),
    });
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">政策库</h1>
        <p className="mt-1 text-muted">
          国家法律与各地实施办法、规划、补贴和康复路径。可先选省，再选地市。
        </p>
      </header>

      <form
        className="rounded-xl bg-surface p-4 shadow-card"
        onSubmit={(e) => {
          e.preventDefault();
          patch({ q: draft.trim() || undefined });
        }}
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="sr-only" htmlFor="library-q">
            关键词
          </label>
          <Input
            id="library-q"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="关键词：两项补贴、残保金、无障碍…"
          />
          <Button type="submit">
            <Search className="size-4" aria-hidden />
            搜索
          </Button>
        </div>
        <div className="mt-4 space-y-3">
          <RegionPicker
            value={search.region ?? "ALL"}
            onChange={(v) => patch({ region: v === "ALL" ? undefined : v })}
          />
          <div className="grid gap-3 sm:grid-cols-3">
          <Select
            id="category"
            label="主题"
            value={search.category ?? ""}
            onChange={(v) => patch({ category: v || undefined })}
            options={[{ id: "", label: "全部主题" }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.label }))]}
          />
          <Select
            id="level"
            label="效力层级"
            value={search.level ?? ""}
            onChange={(v) => patch({ level: v || undefined })}
            options={[{ id: "", label: "全部层级" }, ...LEVELS.map((l) => ({ id: l.id, label: l.label }))]}
          />
          <Select
            id="disability"
            label="残疾类别"
            value={search.disability ?? ""}
            onChange={(v) => patch({ disability: v || undefined })}
            options={[{ id: "", label: "全部类别" }, ...DISABILITY_TYPES.map((d) => ({ id: d.id, label: d.label }))]}
          />
          </div>
        </div>
      </form>

      <p className="text-sm text-muted" aria-live="polite">
        共 <span className="tabular-nums font-medium text-fg">{total}</span> 条
      </p>
      {items.length === 0 ? (
        <p className="rounded-xl bg-surface p-8 text-center text-muted">没有匹配结果。可改用更短的词，或切换到「问一问」。</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((p) => (
            <PolicyCard key={p.id} policy={p} />
          ))}
        </div>
      )}
    </div>
  );
}
