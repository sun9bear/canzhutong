import { Link } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { authEnabled, signOut } from "@/lib/auth/client";

export function AccountChip() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-11 w-16 animate-pulse rounded-md bg-surface-2" aria-hidden />;
  }
  if (!user) {
    return (
      <Link
        to="/login"
        className="inline-flex h-11 items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary-soft"
      >
        登录
      </Link>
    );
  }
  const label = user.displayName ?? user.primaryEmail ?? "已登录";
  return (
    <div className="flex items-center gap-1">
      <Link to="/me" className="inline-flex h-11 max-w-28 items-center truncate px-2 text-sm font-medium text-fg">
        {label}
      </Link>
      {authEnabled ? (
        <button
          type="button"
          onClick={() => void signOut("/")}
          className="inline-flex h-11 items-center rounded-md px-2 text-sm text-muted hover:bg-surface-2"
        >
          退出
        </button>
      ) : null}
    </div>
  );
}
