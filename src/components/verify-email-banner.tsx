import { Link, useRouterState } from "@tanstack/react-router";
import { useVerifiedFeatureStatus } from "@/hooks/use-verified-feature-status";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

/** Non-blocking notice for signed-in unverified email/password users. */
export function VerifyEmailBanner() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, isPending: authPending } = useCurrentUserState();
  const { needsVerification, isPending } = useVerifiedFeatureStatus();

  if (pathname === "/verify-email") return null;
  if (authPending || isPending || !user || !needsVerification) return null;

  return (
    <div className="mb-4 rounded-xl border border-border bg-primary-soft px-4 py-3" role="status">
      <p className="text-sm">
        请验证邮箱后才能收藏政策和生成个人建议。
        <Link
          to="/verify-email"
          className="ml-2 inline-flex min-h-11 items-center font-medium text-primary underline-offset-2 hover:underline"
        >
          去验证
        </Link>
      </p>
    </div>
  );
}
