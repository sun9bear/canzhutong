import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  getAdminStatus,
  getAiSettings,
  saveAiSettings,
} from "@/lib/server/ai-settings";

export const Route = createFileRoute("/_app/admin/ai")({
  component: AdminAiPage,
});

function AdminAiPage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-40 animate-pulse rounded-xl bg-surface" aria-label="正在加载" />;
  }
  if (!user) return <RedirectToSignIn />;
  return <AdminAiInner />;
}

function AdminAiInner() {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiKeyLast4, setApiKeyLast4] = useState("");
  const [configured, setConfigured] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const status = await getAdminStatus();
        if (cancelled) return;
        setIsAdmin(status.isAdmin);
        if (!status.isAdmin) {
          setChecking(false);
          return;
        }
        const settings = await getAiSettings();
        if (cancelled) return;
        setBaseUrl(settings.baseUrl);
        setModel(settings.model);
        setApiKeyLast4(settings.apiKeyLast4);
        setConfigured(settings.configured);
      } catch {
        if (!cancelled) setError("加载设置失败，请稍后重试。");
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    setError(null);
    try {
      const res = await saveAiSettings({
        data: {
          baseUrl,
          model,
          apiKey: apiKey.trim() ? apiKey : undefined,
        },
      });
      setBaseUrl(res.baseUrl);
      setModel(res.model);
      setApiKeyLast4(res.apiKeyLast4);
      setConfigured(res.configured);
      setApiKey("");
      setMsg("已保存。问一问与个人建议将使用此配置。");
    } catch {
      setError("保存失败（可能无权限或服务异常）。");
    } finally {
      setBusy(false);
    }
  }

  if (checking) {
    return <div className="h-40 animate-pulse rounded-xl bg-surface" aria-label="正在加载" />;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <h1 className="font-display text-2xl font-semibold">AI 设置</h1>
        <p className="rounded-xl bg-surface p-4 text-danger" role="alert">
          无权限
        </p>
        <Link to="/me" className="text-sm text-primary underline-offset-4 hover:underline">
          返回我的档案
        </Link>
      </div>
    );
  }

  const keyHint = apiKeyLast4 ? `••••${apiKeyLast4}` : "未设置";

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">AI 设置</h1>
        <p className="mt-1 text-sm text-muted">
          配置 OpenAI 兼容接口，供「问一问」与「个人建议」使用。密钥仅保存在服务端，界面不会回显完整密钥。
        </p>
      </header>

      <form
        className="space-y-4 rounded-xl bg-surface p-5 shadow-card"
        onSubmit={(e) => void onSave(e)}
      >
        <label className="block text-sm">
          <span className="text-muted">Base URL</span>
          <Input
            className="mt-1"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://api.deepseek.com"
            autoComplete="off"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">模型名</span>
          <Input
            className="mt-1"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="deepseek-chat"
            autoComplete="off"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">API Key</span>
          <Input
            className="mt-1"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="留空则不修改"
            autoComplete="new-password"
          />
          <span className="mt-1 block text-xs text-muted">
            当前密钥：{keyHint}
            {configured ? "（已配置）" : "（尚未完整配置）"}
          </span>
        </label>

        <p className="rounded-md bg-bg px-3 py-2 text-xs leading-relaxed text-muted">
          DeepSeek 示例：Base URL 填{" "}
          <code className="text-fg">https://api.deepseek.com</code>
          ，模型如{" "}
          <code className="text-fg">deepseek-chat</code>
          （也可自填 flash 等模型名）。系统会自动补全为{" "}
          <code className="text-fg">…/v1/chat/completions</code>。
        </p>

        <Button type="submit" disabled={busy}>
          {busy ? "保存中…" : "保存"}
        </Button>
        {msg ? (
          <p className="text-sm text-ok" role="status">
            {msg}
          </p>
        ) : null}
        {error ? (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      <Link to="/me" className="inline-block text-sm text-primary underline-offset-4 hover:underline">
        返回我的档案
      </Link>
    </div>
  );
}
