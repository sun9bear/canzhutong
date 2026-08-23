import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Accessibility, MessageCircleQuestion, Phone, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PolicyCard } from "@/components/policy-card";
import { CATEGORIES } from "@/data/catalog";
import { DISCLAIMER, QUICK_QUESTIONS } from "@/data/copy";
import { getFeatured, getStats } from "@/lib/server/policies";

export const Route = createFileRoute("/_app/")({
  loader: async () => {
    const [featured, stats] = await Promise.all([getFeatured(), getStats()]);
    return { featured, stats };
  },
  component: Home,
});

function Home() {
  const { featured, stats } = Route.useLoaderData();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  function goSearch(value: string) {
    const query = value.trim();
    void navigate({ to: "/library", search: { q: query || undefined } });
  }

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-surface px-5 py-8 shadow-card sm:px-8">
        <p className="text-sm font-medium tracking-wide text-primary">面向残疾人及其家庭的政策助手</p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-fg sm:text-4xl">
          查得清政策
          <br />
          问得清权利
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          收录国家法律、行政法规和各省实施办法、规划、两项补贴与康复救助路径。回答绑定政策原文，不编造金额。支持大字、高对比、读屏和文字咨询。
        </p>
        <form
          className="mt-6 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            goSearch(q);
          }}
        >
          <label className="sr-only" htmlFor="home-q">
            搜索政策
          </label>
          <Input
            id="home-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="例如：两项补贴、残疾人证、儿童康复"
            className="sm:flex-1"
          />
          <Button type="submit" className="sm:w-32">
            <Search className="size-4" aria-hidden />
            检索
          </Button>
        </form>
        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
          <Stat n={stats.total} label="政策条目" />
          <Stat n={stats.national} label="国家层面" />
          <Stat n={stats.regions} label="覆盖地区" />
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold">按主题浏览</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link
                to="/library"
                search={{ category: c.id }}
                className="block h-full min-h-20 rounded-xl bg-surface p-4 shadow-card transition-transform duration-150 hover:-translate-y-0.5"
              >
                <span className="font-medium text-fg">{c.label}</span>
                <span className="mt-1 block text-sm text-muted">{c.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-xl font-semibold">先读这些</h2>
          <Link to="/library" className="text-sm font-medium text-primary">
            全部政策
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {featured.map((p) => (
            <PolicyCard key={p.id} policy={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-semibold">直接问</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {QUICK_QUESTIONS.map((item) => (
            <li key={item}>
              <Link
                to="/ask"
                search={{ q: item }}
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-fg hover:border-primary"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <Link to="/orgs" className="flex items-start gap-3 rounded-xl bg-surface p-5 shadow-card">
          <Phone className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden />
          <div>
            <h3 className="font-semibold">残联黄页</h3>
            <p className="mt-1 text-sm text-muted">全国热线和各省、市、区县残联地址电话，均标注官方来源。</p>
          </div>
        </Link>
        <Link to="/guides" className="flex items-start gap-3 rounded-xl bg-surface p-5 shadow-card">
          <ShieldCheck className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden />
          <div>
            <h3 className="font-semibold">办事指南</h3>
            <p className="mt-1 text-sm text-muted">办证、两项补贴、儿童康复、就业登记怎么走。</p>
          </div>
        </Link>
        <Link to="/ask" className="flex items-start gap-3 rounded-xl bg-surface p-5 shadow-card">
          <MessageCircleQuestion className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden />
          <div>
            <h3 className="font-semibold">文字咨询</h3>
            <p className="mt-1 text-sm text-muted">打字提问，解答政策疑问。</p>
          </div>
        </Link>
        <Link to="/access" className="flex items-start gap-3 rounded-xl bg-surface p-5 shadow-card">
          <Accessibility className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden />
          <div>
            <h3 className="font-semibold">无障碍使用</h3>
            <p className="mt-1 text-sm text-muted">大字、高对比、朗读、读屏。也可点顶部「无障碍」按钮随时调整。</p>
          </div>
        </Link>
        <a
          href="tel:12385"
          className="flex items-start gap-3 rounded-xl bg-primary p-5 text-primary-fg shadow-card"
        >
          <Phone className="mt-0.5 size-6 shrink-0" aria-hidden />
          <div>
            <h3 className="font-semibold">全国热线 12385</h3>
            <p className="mt-1 text-sm text-primary-fg/90">全国残疾人服务热线。紧急请拨 110 / 120。</p>
          </div>
        </a>
      </section>

      <p className="text-sm leading-relaxed text-subtle">{DISCLAIMER}</p>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-lg bg-primary-soft px-1 py-3 sm:px-2">
      <div className="font-display text-2xl font-semibold tabular-nums text-primary">{n}</div>
      <div className="mt-0.5 text-xs leading-snug text-muted">{label}</div>
    </div>
  );
}
