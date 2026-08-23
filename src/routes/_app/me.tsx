import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PolicyCard } from "@/components/policy-card";
import { A11yTrigger } from "@/components/a11y-panel";
import { RegionPicker } from "@/components/region-picker";
import { ReadAloud } from "@/components/read-aloud";
import { ReadableMd } from "@/components/readable-md";
import {
  AGE_GROUPS,
  DISABILITY_TYPES,
  EDUCATION_LEVELS,
  EMPLOYMENT_STATUSES,
  GRADES,
  LIVING_SITUATIONS,
  NEED_OPTIONS,
} from "@/data/catalog";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listBookmarks, toggleBookmark } from "@/lib/server/policies";
import {
  generateAdvice,
  getProfile,
  latestAdvice,
  saveProfile,
  type ProfileInput,
} from "@/lib/server/profile";
import type { PolicyListItem } from "@/lib/server/policies";

export const Route = createFileRoute("/_app/me")({
  component: MePage,
});

const empty: ProfileInput = {
  displayName: "",
  regionCode: "",
  disabilityTypes: [],
  disabilityGrade: "",
  ageGroup: "",
  employmentStatus: "",
  education: "",
  livingSituation: "",
  needs: [],
  extraNotes: "",
};

function isPlaceholderRegion(code: string) {
  const trimmed = code.trim();
  return !trimmed || trimmed === "CN" || trimmed === "ALL";
}

function MePage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-40 animate-pulse rounded-xl bg-surface" aria-label="正在加载" />;
  }
  if (!user) return <RedirectToSignIn />;
  return <MeInner />;
}

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

function MeInner() {
  const [form, setForm] = useState<ProfileInput>(empty);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);
  const [citations, setCitations] = useState<{ id: string; title: string; docNo: string; regionName: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<PolicyListItem[]>([]);
  const [unbookmarkingId, setUnbookmarkingId] = useState<string | null>(null);

  useEffect(() => {
    void getProfile()
      .then((p) => {
        if (p) setForm(p);
      })
      .catch(() => undefined);
    void latestAdvice()
      .then((a) => {
        if (a) {
          setAdvice(a.text);
          setCitations(a.citations);
        }
      })
      .catch(() => undefined);
    void listBookmarks()
      .then(setBookmarks)
      .catch(() => setBookmarks([]));
  }, []);

  async function onSave() {
    setError(null);
    setSavedMsg(null);
    if (isPlaceholderRegion(form.regionCode)) {
      setError("请选择具体的户籍或常住地区（不能只选「全国」）。");
      return;
    }
    try {
      await saveProfile({ data: form });
      setSavedMsg("档案已保存，仅用于为你匹配政策和生成建议。");
    } catch {
      setError("保存失败，请稍后重试。");
    }
  }

  async function onAdvice() {
    setBusy(true);
    setError(null);
    if (isPlaceholderRegion(form.regionCode)) {
      setError("请选择具体的户籍或常住地区（不能只选「全国」）。");
      setBusy(false);
      return;
    }
    try {
      await saveProfile({ data: form });
      const res = await generateAdvice();
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setAdvice(res.text);
      setCitations(res.citations);
    } catch {
      setError("生成失败，请稍后重试。");
    } finally {
      setBusy(false);
    }
  }

  async function onUnbookmark(policyId: string) {
    setUnbookmarkingId(policyId);
    setError(null);
    try {
      const res = await toggleBookmark({ data: policyId });
      if (!res.saved) {
        setBookmarks((prev) => prev.filter((p) => p.id !== policyId));
      }
    } catch {
      setError("取消收藏失败，请稍后重试。");
    } finally {
      setUnbookmarkingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="font-display text-2xl font-semibold">我的档案</h1>
        <p className="mt-1 text-muted">
          用于匹配户籍地政策和生成康复、生活、职业建议。请尽量准确，不必填写与政策无关的病史细节。
        </p>
      </header>

      <section className="rounded-xl bg-surface p-4 shadow-card">
        <h2 className="text-base font-medium">阅读与无障碍</h2>
        <p className="mt-1 text-sm text-muted">字号、对比、朗读，也可全程打字使用。</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <A11yTrigger className="border border-border bg-bg" />
          <Link
            to="/access"
            className="inline-flex h-11 items-center rounded-md border border-border px-3 text-sm font-medium"
          >
            无障碍说明
          </Link>
        </div>
      </section>

      <form
        className="space-y-4 rounded-xl bg-surface p-5 shadow-card"
        onSubmit={(e) => {
          e.preventDefault();
          void onSave();
        }}
      >
        <label className="block text-sm">
          <span className="text-muted">称呼（可选）</span>
          <Input
            className="mt-1"
            value={form.displayName}
            onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          />
        </label>
        <div className="space-y-1">
          <p className="text-sm text-muted">地区（户籍或常住）</p>
          <RegionPicker
            value={form.regionCode || "CN"}
            onChange={(code) => setForm({ ...form, regionCode: code })}
            allowAll={false}
            idPrefix="me"
          />
        </div>
        <fieldset>
          <legend className="text-sm text-muted">残疾类别（可多选）</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {DISABILITY_TYPES.filter((d) => d.id !== "all").map((d) => (
              <label
                key={d.id}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={form.disabilityTypes.includes(d.id)}
                  onChange={() =>
                    setForm({ ...form, disabilityTypes: toggle(form.disabilityTypes, d.id) })
                  }
                />
                {d.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-3 sm:grid-cols-2">
          <FieldSelect
            label="残疾等级"
            value={form.disabilityGrade}
            onChange={(v) => setForm({ ...form, disabilityGrade: v })}
            options={GRADES}
          />
          <FieldSelect
            label="年龄段"
            value={form.ageGroup}
            onChange={(v) => setForm({ ...form, ageGroup: v })}
            options={AGE_GROUPS}
          />
          <FieldSelect
            label="就业状况"
            value={form.employmentStatus}
            onChange={(v) => setForm({ ...form, employmentStatus: v })}
            options={EMPLOYMENT_STATUSES}
          />
          <FieldSelect
            label="教育"
            value={form.education}
            onChange={(v) => setForm({ ...form, education: v })}
            options={EDUCATION_LEVELS}
          />
          <FieldSelect
            label="生活情形"
            value={form.livingSituation}
            onChange={(v) => setForm({ ...form, livingSituation: v })}
            options={LIVING_SITUATIONS}
          />
        </div>
        <fieldset>
          <legend className="text-sm text-muted">当前最需要</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {NEED_OPTIONS.map((d) => (
              <label
                key={d.id}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={form.needs.includes(d.id)}
                  onChange={() => setForm({ ...form, needs: toggle(form.needs, d.id) })}
                />
                {d.label}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block text-sm">
          <span className="text-muted">补充说明（不要填写敏感病历）</span>
          <Textarea
            className="mt-1"
            value={form.extraNotes}
            onChange={(e) => setForm({ ...form, extraNotes: e.target.value })}
            placeholder="例如：尚未办证、孩子 4 岁有孤独症诊断、想找辅助性就业"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <Button type="submit">保存档案</Button>
          <Button type="button" variant="secondary" disabled={busy} onClick={() => void onAdvice()}>
            {busy ? "正在生成…" : "生成个人建议"}
          </Button>
        </div>
        {savedMsg ? (
          <p className="text-sm text-ok" role="status">
            {savedMsg}
          </p>
        ) : null}
        {error ? (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      {advice ? (
        <section className="rounded-xl bg-surface p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-lg font-semibold">个人建议</h2>
            <ReadAloud text={advice} label="朗读建议" />
          </div>
          <ReadableMd text={advice} className="mt-4 leading-relaxed" />
          {citations.length > 0 ? (
            <ul className="mt-4 space-y-1 border-t border-border pt-3 text-sm">
              {citations.map((c) => (
                <li key={c.id}>
                  <Link to="/library/$policyId" params={{ policyId: c.id }} className="text-primary">
                    {c.regionName} · {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      <section aria-labelledby="bookmarks-heading">
        <h2 id="bookmarks-heading" className="font-display text-lg font-semibold">
          收藏{bookmarks.length > 0 ? `（${bookmarks.length}）` : ""}
        </h2>
        {bookmarks.length === 0 ? (
          <div className="mt-3 rounded-xl border border-dashed border-border bg-surface p-6 text-center">
            <p className="text-sm text-muted">还没有收藏。去政策库看看，把有用的政策收进来。</p>
            <Link
              to="/library"
              className="mt-4 inline-flex min-h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg"
            >
              去政策库看看
            </Link>
          </div>
        ) : (
          <ul className="mt-3 grid gap-3">
            {bookmarks.map((p) => (
              <li key={p.id} className="space-y-2">
                <PolicyCard policy={p} />
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11"
                  disabled={unbookmarkingId === p.id}
                  onClick={() => void onUnbookmark(p.id)}
                  aria-label={`取消收藏 ${p.shortTitle}`}
                >
                  {unbookmarkingId === p.id ? "正在取消…" : "取消收藏"}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function FieldSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly { id: string; label: string }[];
}) {
  return (
    <label className="block text-sm">
      <span className="text-muted">{label}</span>
      <select
        className="mt-1 h-11 w-full rounded-md border border-border bg-surface px-3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">请选择</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
