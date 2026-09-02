import { createFileRoute, Link } from "@tanstack/react-router";
import { EmailOtpForm } from "@/components/email-otp-form";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/_app/verify-email")({
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-40 animate-pulse rounded-xl bg-surface" aria-label="正在加载" />;
  }
  if (!user) return <RedirectToSignIn />;

  const email = user.primaryEmail;
  if (!email) {
    return (
      <div className="mx-auto max-w-sm space-y-4 rounded-2xl bg-surface p-6 shadow-card">
        <h1 className="font-display text-2xl font-semibold">验证邮箱</h1>
        <p className="text-sm text-muted">当前账号没有邮箱，无需验证码。</p>
        <Link to="/me" className="inline-flex min-h-11 items-center text-sm text-primary">
          返回我的档案
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm space-y-4 rounded-2xl bg-surface p-6 shadow-card">
      <h1 className="font-display text-2xl font-semibold">验证邮箱</h1>
      <p className="text-sm text-muted">
        输入邮件中的 6 位验证码。验证后即可收藏政策和生成个人建议。
      </p>
      <EmailOtpForm
        email={email}
        autoSend
        onVerified={() => {
          window.location.href = "/me";
        }}
      />
      <Link to="/me" className="inline-flex min-h-11 items-center text-sm text-muted">
        稍后再说
      </Link>
    </div>
  );
}
