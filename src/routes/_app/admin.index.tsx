import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChartColumn,
  ShieldCheck,
  Sparkles,
  ToggleRight,
  UserCog,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getAdminStatus } from "@/lib/server/ai-settings";

export const Route = createFileRoute("/_app/admin/")({
  component: AdminIndexPage,
});

function AdminIndexPage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-40 animate-pulse rounded-xl bg-surface" aria-label="正在加载" />;
  }
  if (!user) return <RedirectToSignIn />;
  return <AdminOverview />;
}

type AdminCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  available?: boolean;
};

const CARDS: AdminCard[] = [
  {
    title: "AI 设置",
    description: "配置问一问与个人建议所用的大模型接口（模型名与密钥）。",
    icon: Sparkles,
    available: true,
  },
  {
    title: "管理员管理",
    description: "维护可访问管理中心的管理员名单。",
    icon: UserCog,
  },
  {
    title: "功能开关",
    description: "按需启用或停用站点功能模块。",
    icon: ToggleRight,
  },
  {
    title: "数据统计",
    description: "查看访问量、收藏与建议生成等运营数据。",
    icon: ChartColumn,
  },
  {
    title: "运维",
    description: "系统运行状态与日常维护入口。",
    icon: Wrench,
  },
];

function AdminOverview() {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void getAdminStatus()
      .then((s) => {
        if (cancelled) return;
        setIsAdmin(s.isAdmin);
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (checking) {
    return <div className="h-40 animate-pulse rounded-xl bg-surface" aria-label="正在加载" />;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <h1 className="font-display text-2xl font-semibold">管理中心</h1>
        <p className="rounded-xl bg-surface p-4 text-danger shadow-card" role="alert">
          你没有管理权限；如需开通请联系站点管理员
        </p>
        <Link to="/" className="inline-block text-sm text-primary underline-offset-4 hover:underline">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">管理中心</h1>
        <p className="mt-1 text-sm text-muted">仅管理员可访问。</p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {CARDS.map((card) => {
          const Icon = card.icon;
          const body = (
            <>
              <span className="flex items-center gap-2">
                <Icon className="size-5 shrink-0" aria-hidden />
                <span className="text-base font-medium">{card.title}</span>
                {card.available ? null : (
                  <span className="ml-auto rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                    即将推出
                  </span>
                )}
              </span>
              <span className="mt-1 block text-sm text-muted">{card.description}</span>
            </>
          );
          return (
            <li key={card.title}>
              {card.available ? (
                <Link
                  to="/admin/ai"
                  className="block rounded-xl bg-surface p-5 shadow-card transition-colors hover:bg-surface-2"
                >
                  {body}
                </Link>
              ) : (
                <div className="rounded-xl bg-surface p-5 opacity-70 shadow-card" aria-disabled>
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <p className="rounded-xl bg-surface p-4 text-sm leading-relaxed text-muted shadow-card">
        支付与微信 AppID 为预留能力，暂未开放配置。
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-primary underline-offset-4 hover:underline"
      >
        <ShieldCheck className="size-4" aria-hidden />
        返回首页
      </Link>
    </div>
  );
}
