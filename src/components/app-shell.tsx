import type { MouseEvent } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  BookOpenText,
  Briefcase,
  CircleUserRound,
  House,
  MessageCircleQuestion,
  Phone,
  Settings2,
} from "lucide-react";
import { A11yTrigger } from "@/components/a11y-panel";
import { AccountChip } from "@/components/account-chip";
import { useAdminStatus } from "@/hooks/use-admin-status";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "首页", icon: House },
  { to: "/library", label: "政策库", icon: BookOpenText },
  { to: "/jobs", label: "就业", icon: Briefcase },
  { to: "/ask", label: "问一问", icon: MessageCircleQuestion },
  { to: "/orgs", label: "黄页", icon: Phone },
  { to: "/me", label: "我的", icon: CircleUserRound },
] as const;

// Admin-only entry — appended for verified admins only (useAdminStatus).
const ADMIN_NAV_ITEM = { to: "/admin", label: "管理", icon: Settings2 } as const;

function Logo() {
  return (
    <Link to="/" className="flex min-h-11 items-center gap-2.5" aria-label="残助通首页">
      <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-fg" aria-hidden>
        <svg viewBox="0 0 32 32" className="size-5">
          <path
            d="M8 22V12.5c0-.8.6-1.5 1.5-1.5H14v11M14 22h10M14 10.5h5.5c.8 0 1.5.7 1.5 1.5V16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-semibold tracking-tight">残助通</span>
        <span className="logo-tagline hidden text-xs text-muted sm:block">权威政策 · 智能咨询</span>
      </span>
    </Link>
  );
}

function focusTarget(id: string, e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  // Skip-to-main focuses the landmark; skip-to-nav focuses the first nav link.
  const preferLandmark = id === "main";
  const child = preferLandmark
    ? null
    : (el.querySelector(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) as HTMLElement | null);
  const target = child ?? el;
  if (target === el && !el.hasAttribute("tabindex")) el.tabIndex = -1;
  target.focus();
  target.scrollIntoView({ block: preferLandmark ? "start" : "nearest" });
}

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isAdmin } = useAdminStatus();
  const navItems = isAdmin ? [...NAV, ADMIN_NAV_ITEM] : NAV;

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <a href="#main" className="skip-link" onClick={(e) => focusTarget("main", e)}>
        跳到正文
      </a>
      {/* Desktop nav is md+; mobile bottom nav below md. Only one skip target in tab order. */}
      <a
        href="#app-nav-desktop"
        className="skip-link skip-link-nav max-md:hidden"
        onClick={(e) => focusTarget("app-nav-desktop", e)}
      >
        跳到导航
      </a>
      <a
        href="#app-nav"
        className="skip-link skip-link-nav md:hidden"
        onClick={(e) => focusTarget("app-nav", e)}
      >
        跳到导航
      </a>
      <header className="sticky top-0 z-30 border-b border-border bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:py-3">
          <Logo />
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="主导航"
            id="app-nav-desktop"
            tabIndex={-1}
          >
            {navItems.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-11 items-center rounded-md px-3 text-sm font-medium",
                    active ? "bg-primary-soft text-primary" : "text-muted hover:bg-surface-2",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-1">
            <A11yTrigger className="border border-border" />
            <AccountChip />
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 md:pb-12">
        <Outlet />
      </main>
      <nav
        id="app-nav"
        tabIndex={-1}
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="底部导航"
      >
        <ul
          className={cn(
            "grid",
            navItems.length >= 7 ? "grid-cols-7" : navItems.length >= 6 ? "grid-cols-6" : "grid-cols-5",
          )}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-14 flex-col items-center justify-center gap-0.5 text-xs",
                    active ? "text-primary" : "text-muted",
                  )}
                >
                  <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} aria-hidden />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
