import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PolicyCard } from "@/components/policy-card";
import { ReadAloud } from "@/components/read-aloud";
import { categoryLabel, disabilityLabel, levelLabel } from "@/data/catalog";
import { useVerifiedFeatureStatus } from "@/hooks/use-verified-feature-status";
import { FAVORITE_NEEDS_VERIFICATION } from "@/lib/auth/email-otp-lib";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getPolicy, isBookmarked, toggleBookmark } from "@/lib/server/policies";

export const Route = createFileRoute("/_app/library/$policyId")({
  loader: async ({ params }) => {
    const data = await getPolicy({ data: params.policyId });
    if (!data) throw new Error("未找到该政策，可能尚未收录。");
    return data;
  },
  component: PolicyPage,
});

function PolicyPage() {
  const { policy, related } = Route.useLoaderData();
  const { user, isPending } = useCurrentUserState();
  const { needsVerification } = useVerifiedFeatureStatus();
  const [saved, setSaved] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    void isBookmarked({ data: policy.id })
      .then(setSaved)
      .catch(() => setSaved(false));
  }, [user, policy.id]);

  async function onToggle() {
    setActionError(null);
    try {
      const res = await toggleBookmark({ data: policy.id });
      setSaved(res.saved);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message.includes("请先验证邮箱")) {
        setActionError(FAVORITE_NEEDS_VERIFICATION);
        return;
      }
      window.location.href = "/login";
    }
  }

  const speakText = useMemo(() => {
    const points = policy.keyPoints.join("。");
    return [
      policy.title,
      policy.summary,
      points ? `要点：${points}` : "",
      policy.eligibility ? `适用对象：${policy.eligibility}` : "",
      policy.howToApply ? `如何办理：${policy.howToApply}` : "",
    ]
      .filter(Boolean)
      .join("。");
  }, [policy]);

  return (
    <article className="mx-auto max-w-3xl space-y-8" aria-labelledby="policy-title">
      <div>
        <Link
          to="/library"
          className="inline-flex min-h-11 items-center text-sm font-medium text-primary"
        >
          返回政策库
        </Link>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge>{levelLabel(policy.level)}</Badge>
          <Badge className="bg-surface-2 text-muted">{policy.regionName}</Badge>
          <Badge className="bg-surface-2 text-muted">{categoryLabel(policy.category)}</Badge>
          <Badge className="bg-surface-2 text-muted">{policy.status}</Badge>
        </div>
        <h1
          id="policy-title"
          className="mt-3 font-display text-2xl font-semibold leading-snug sm:text-3xl"
        >
          {policy.title}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {policy.docNo ? `${policy.docNo} · ` : ""}
          {policy.issuedAt ? `发布 ${policy.issuedAt}` : ""}
          {policy.effectiveAt ? ` · 施行 ${policy.effectiveAt}` : ""}
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="本条操作">
        <ReadAloud text={speakText} label="朗读本条" />
        {!isPending && user && needsVerification && !saved ? (
          <Link
            to="/verify-email"
            className="inline-flex h-11 min-h-11 items-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-medium"
          >
            <Bookmark className="size-4" aria-hidden />
            验证邮箱后收藏
          </Link>
        ) : !isPending && user ? (
          <Button
            variant={saved ? "secondary" : "outline"}
            onClick={() => void onToggle()}
            aria-pressed={saved}
          >
            {saved ? (
              <BookmarkCheck className="size-4" aria-hidden />
            ) : (
              <Bookmark className="size-4" aria-hidden />
            )}
            {saved ? "已收藏" : "收藏"}
          </Button>
        ) : !isPending ? (
          <Link
            to="/login"
            className="inline-flex h-11 min-h-11 items-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-medium"
            aria-label="登录后收藏"
          >
            <Bookmark className="size-4" aria-hidden />
            登录后收藏
          </Link>
        ) : null}
        {policy.sourceUrl ? (
          <a
            href={policy.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 max-w-full items-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-medium"
          >
            打开：{policy.sourceName}
            <ExternalLink className="size-4 shrink-0" aria-hidden />
            <span className="sr-only">（新窗口）</span>
          </a>
        ) : null}
        <Link
          to="/ask"
          search={{ q: policy.shortTitle }}
          className="inline-flex h-11 items-center rounded-md bg-primary-soft px-4 text-sm font-medium text-primary"
          aria-label={`就「${policy.shortTitle}」提问`}
        >
          就这一条提问
        </Link>
        {actionError ? (
          <p className="basis-full text-sm text-danger" role="alert">
            {actionError}
          </p>
        ) : null}
      </div>

      <section className="rounded-xl bg-surface p-5 shadow-card">
        <h2 className="text-sm font-medium text-primary">摘要</h2>
        <p className="mt-2 leading-relaxed">{policy.summary}</p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold">要点</h2>
        <ul className="mt-3 space-y-2">
          {policy.keyPoints.map((k) => (
            <li key={k} className="rounded-lg bg-surface px-4 py-3 leading-relaxed shadow-card">
              {k}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-surface p-5 shadow-card">
          <h2 className="font-display text-lg font-semibold">适用对象</h2>
          <p className="mt-2 whitespace-pre-wrap leading-relaxed text-muted">
            {policy.eligibility}
          </p>
        </div>
        <div className="rounded-xl bg-surface p-5 shadow-card">
          <h2 className="font-display text-lg font-semibold">如何办理</h2>
          <p className="mt-2 whitespace-pre-wrap leading-relaxed text-muted">{policy.howToApply}</p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold">说明</h2>
        <div className="mt-3 whitespace-pre-wrap rounded-xl bg-surface p-5 leading-relaxed shadow-card">
          {policy.body}
        </div>
      </section>

      <section className="rounded-xl bg-surface p-5 shadow-card">
        <h2 className="font-display text-lg font-semibold">官方来源</h2>
        <p className="mt-2 leading-relaxed">{policy.sourceName}</p>
        {policy.sourceUrl ? (
          <p className="mt-2">
            <a
              href={policy.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="break-all text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              {policy.sourceUrl}
              <span className="sr-only">（新窗口）</span>
            </a>
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted">
            本条尚未链到具体文件页，请向当地残联或拨打 12385 核实。
          </p>
        )}
        <p className="mt-2 text-sm text-subtle">
          链接指向发布机关网站或该文件的公开文本。请以打开后的正文为准。残疾类别标签：
          {policy.disabilityTypes.map((d) => disabilityLabel(d)).join("、")}
        </p>
      </section>

      {related.length > 0 ? (
        <section>
          <h2 className="font-display text-lg font-semibold">相关文件</h2>
          <ul className="mt-3 grid list-none gap-3 p-0">
            {related.map((item) => (
              <li key={item.id}>
                <PolicyCard policy={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
