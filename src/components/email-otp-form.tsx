import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendEmailVerificationOtp, verifyEmailOtp } from "@/lib/auth/client";
import { OTP_SEND_FAILED_MESSAGE } from "@/lib/auth/email-otp-lib";

const RESEND_COOLDOWN_SEC = 60;

export function EmailOtpForm({
  email,
  autoSend = false,
  onVerified,
}: {
  email: string;
  autoSend?: boolean;
  onVerified: () => void | Promise<void>;
}) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const sentOnce = useRef(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [cooldown]);

  async function sendCode() {
    setError(null);
    setInfo(null);
    const res = await sendEmailVerificationOtp(email);
    if (!res.ok) {
      setError(res.error || OTP_SEND_FAILED_MESSAGE);
      return false;
    }
    setInfo("验证码已发送，5 分钟内有效。");
    setCooldown(RESEND_COOLDOWN_SEC);
    return true;
  }

  useEffect(() => {
    if (!autoSend || sentOnce.current || !email) return;
    sentOnce.current = true;
    void sendCode();
    // email is the only trigger; sendCode is stable for this mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSend, email]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await verifyEmailOtp(email, otp.trim());
      if (!res.ok) {
        setError(res.error);
        return;
      }
      await onVerified();
    } catch {
      setError("验证失败，请稍后重试。");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-3" onSubmit={(e) => void onSubmit(e)}>
      <p className="text-sm text-muted">
        验证码已发到 <span className="text-fg">{email}</span>
        。请输入 6 位数字，不含链接。
      </p>
      <label className="block text-sm">
        <span className="text-muted">验证码</span>
        <Input
          className="mt-1 tracking-[0.3em]"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]{6}"
          maxLength={6}
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          aria-label="6 位验证码"
        />
      </label>
      {info ? (
        <p className="text-sm text-ok" role="status">
          {info}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={pending || otp.length !== 6}>
        {pending ? "正在验证…" : "验证"}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={cooldown > 0}
        onClick={() => void sendCode()}
      >
        {cooldown > 0 ? `重发验证码（${cooldown}s）` : "重发验证码"}
      </Button>
    </form>
  );
}
