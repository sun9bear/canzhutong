import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { authClient, authEnabled } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { A11yTrigger } from "@/components/a11y-panel";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: email.split("@")[0] ?? "用户",
        });
        if (err) throw new Error(err.message);
      } else {
        const { error: err } = await authClient.signIn.email({ email, password });
        if (err) throw new Error(err.message);
      }
      window.location.href = "/me";
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败");
    } finally {
      setPending(false);
    }
  }

  return (
    <main id="main" tabIndex={-1} className="flex min-h-dvh w-full items-center justify-center bg-bg px-4 py-10">
      <div className="w-full max-w-sm space-y-6 rounded-2xl bg-surface p-6 shadow-card">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link to="/" className="inline-flex min-h-11 items-center text-sm text-primary">
              返回首页
            </Link>
            <h1 className="mt-1 font-display text-2xl font-semibold">登录残助通</h1>
            <p className="mt-1 text-sm text-muted">登录后可保存档案、收藏政策和生成个人建议。</p>
            <p className="mt-2 text-xs text-subtle">微信登录即将开通（需开放平台/服务号资质）</p>
          </div>
          <A11yTrigger className="shrink-0 border border-border" />
        </div>
        {authEnabled ? (
          <>
            <form className="space-y-3" onSubmit={(e) => void onEmail(e)}>
              <label className="block text-sm">
                <span className="text-muted">邮箱</span>
                <Input
                  className="mt-1"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="block text-sm">
                <span className="text-muted">密码</span>
                <Input
                  className="mt-1"
                  type="password"
                  required
                  minLength={8}
                  autoComplete={mode === "up" ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {error ? (
                <p className="text-sm text-danger" role="alert">
                  {error}
                </p>
              ) : null}
              <Button type="submit" className="w-full" disabled={pending}>
                {mode === "in" ? "登录" : "注册"}
              </Button>
            </form>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled
              aria-disabled="true"
              title="微信登录即将开通（需开放平台/服务号资质）"
            >
              微信登录（即将开通）
            </Button>
            <button
              type="button"
              className="inline-flex min-h-11 w-full items-center justify-center text-sm text-muted"
              onClick={() => setMode(mode === "in" ? "up" : "in")}
            >
              {mode === "in" ? "没有账号？注册" : "已有账号？登录"}
            </button>
          </>
        ) : (
          <p className="text-sm text-muted">当前环境未开启登录。</p>
        )}
      </div>
    </main>
  );
}
