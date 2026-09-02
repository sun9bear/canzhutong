import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getResendApiKey } from "@/lib/auth/email-otp-lib";

/**
 * Client-safe RPC. The DB lookup lives in `verified-features.server.ts` so
 * `getSql` / Postgres are not pulled into the browser bundle.
 */
/** Whether Resend can send — missing key must not crash the app. */
export const getEmailOtpMailStatus = createServerFn({ method: "GET" }).handler(async () => ({
  canSend: Boolean(getResendApiKey()),
}));

export const getVerifiedFeatureStatus = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { getVerifiedFeatureFlags } = await import("./verified-features.server");
    return getVerifiedFeatureFlags(context.userId);
  });
