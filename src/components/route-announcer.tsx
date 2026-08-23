import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

const TITLES: Record<string, string> = {
  "/": "首页",
  "/library": "政策库",
  "/ask": "问一问",
  "/me": "我的档案",
  "/guides": "办事指南",
  "/access": "无障碍说明",
  "/login": "登录",
  "/admin/ai": "AI 设置",
};

function pageName(pathname: string) {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith("/library/")) return "政策详情";
  return "残助通";
}

export function RouteAnnouncer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [message, setMessage] = useState("");
  const first = useRef(true);

  useEffect(() => {
    const name = pageName(pathname);
    document.title = `${name} · 残助通`;
    if (first.current) {
      first.current = false;
      return;
    }
    setMessage(`${name}已打开`);
    const heading = document.querySelector("#main h1") as HTMLElement | null;
    const target = heading ?? (document.getElementById("main") as HTMLElement | null);
    if (target) {
      if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
  }, [pathname]);

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  );
}
