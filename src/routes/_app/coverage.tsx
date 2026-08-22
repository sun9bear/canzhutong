import { createFileRoute, Link } from "@tanstack/react-router";
import { PREFECTURES, SCAN_ORDER, prefectureLabel } from "@/data/prefectures";
import { regionName } from "@/data/catalog";

export const Route = createFileRoute("/_app/coverage")({
  component: CoveragePage,
});

function CoveragePage() {
  const byParent = SCAN_ORDER.filter((c) => c !== "BJ" && c !== "SH" && c !== "TJ" && c !== "CQ").map((code) => ({
    code,
    cities: PREFECTURES.filter((p) => p.parent === code),
  }));

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="font-display text-2xl font-semibold">收录范围</h1>
        <p className="mt-2 text-muted">
          本库收录国家法律法规，以及 31 个省、自治区、直辖市的实施办法、规划和两项补贴路径。部分地市可在政策库中继续筛选。金额、电话以官方原文为准。
        </p>
      </header>

      <ul className="space-y-3">
        {SCAN_ORDER.map((code) => {
          const n = PREFECTURES.filter((p) => p.parent === code).length;
          return (
            <li key={code} className="rounded-xl bg-surface p-4 shadow-card">
              <h2 className="font-display text-lg font-semibold">
                {regionName(code)}
                {n ? (
                  <span className="ml-2 text-sm font-normal text-muted">{n} 个地级单位</span>
                ) : (
                  <span className="ml-2 text-sm font-normal text-muted">直辖市</span>
                )}
              </h2>
              <Link to="/library" search={{ region: code }} className="mt-2 inline-flex h-11 items-center text-sm font-medium text-primary">
                查看该地区政策
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="rounded-xl border border-border p-5">
        <h2 className="font-display text-lg font-semibold">地级单位</h2>
        <p className="mt-2 text-sm text-muted">共 {PREFECTURES.length} 个。选省之后可在第二级下拉框选市。</p>
        {byParent.map((g) => (
          <p key={g.code} className="mt-3 text-sm leading-relaxed">
            <span className="font-medium">{regionName(g.code)}：</span>
            {g.cities.map((c) => prefectureLabel(c.name)).join("、")}
          </p>
        ))}
      </section>
    </div>
  );
}
