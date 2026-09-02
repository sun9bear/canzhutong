/**
 * Email OTP helpers — no Better Auth / DB imports so unit tests can load this
 * file with Node's type-stripping runner.
 */

export const DEFAULT_RESEND_FROM = "残助通 <beth.t@example.com>";
export const OTP_SEND_FAILED_MESSAGE = "验证邮件暂时发不出";
export const OTP_EMAIL_SUBJECT = "残助通验证码";
export const OTP_EXPIRES_MINUTES = 5;
export const FAVORITE_NEEDS_VERIFICATION = "请先验证邮箱后再收藏政策。";
export const ADVICE_NEEDS_VERIFICATION = "请先验证邮箱后再生成个人建议。";

export type EnvMap = Record<string, string | undefined>;

export type VerifiedFeatureInput = {
  emailVerified: boolean;
  isAdmin: boolean;
  hasOAuthAccount: boolean;
};

export function canUseVerifiedFeatures(input: VerifiedFeatureInput): boolean {
  return input.emailVerified || input.isAdmin || input.hasOAuthAccount;
}

export function assertCanFavorite(input: VerifiedFeatureInput): void {
  if (!canUseVerifiedFeatures(input)) {
    throw new Error(FAVORITE_NEEDS_VERIFICATION);
  }
}

export function assertCanGenerateAdvice(input: VerifiedFeatureInput): void {
  if (!canUseVerifiedFeatures(input)) {
    throw new Error(ADVICE_NEEDS_VERIFICATION);
  }
}

export function envTrim(env: EnvMap, key: string): string | undefined {
  const value = env[key]?.trim();
  return value ? value : undefined;
}

export function getResendFrom(env: EnvMap = process.env): string {
  return envTrim(env, "RESEND_FROM") ?? DEFAULT_RESEND_FROM;
}

export function getResendApiKey(env: EnvMap = process.env): string | undefined {
  return envTrim(env, "RESEND_API_KEY");
}

export function buildOtpEmailText(otp: string): string {
  return `您的验证码是 ${otp}，${OTP_EXPIRES_MINUTES} 分钟内有效。请勿将验证码告知他人。`;
}

export type OtpEmailPayload = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

export function buildOtpEmail(
  email: string,
  otp: string,
  env: EnvMap = process.env,
): OtpEmailPayload {
  return {
    from: getResendFrom(env),
    to: email,
    subject: OTP_EMAIL_SUBJECT,
    text: buildOtpEmailText(otp),
  };
}

export type OtpSendFn = (payload: OtpEmailPayload) => Promise<void>;

export class OtpSendError extends Error {
  constructor(message = OTP_SEND_FAILED_MESSAGE) {
    super(message);
    this.name = "OtpSendError";
  }
}

/**
 * Send a 6-digit OTP via Resend. Missing `RESEND_API_KEY` fails this send with a
 * user-facing Chinese message and a server log — it must not crash the process.
 */
export async function sendVerificationOtpEmail(
  input: { email: string; otp: string },
  deps: { env?: EnvMap; send?: OtpSendFn } = {},
): Promise<OtpEmailPayload> {
  const env = deps.env ?? process.env;
  const payload = buildOtpEmail(input.email, input.otp, env);
  const apiKey = getResendApiKey(env);
  if (!apiKey) {
    console.error("[email-otp] RESEND_API_KEY is missing — verification email not sent");
    throw new OtpSendError();
  }
  const send = deps.send ?? defaultResendSend(apiKey);
  try {
    await send(payload);
  } catch (err) {
    if (err instanceof OtpSendError) throw err;
    console.error("[email-otp] Resend send failed");
    throw new OtpSendError();
  }
  return payload;
}

function defaultResendSend(apiKey: string): OtpSendFn {
  return async (payload) => {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
    });
    if (result.error) {
      console.error("[email-otp] Resend send failed");
      throw new OtpSendError();
    }
  };
}

export function mapEmailOtpError(message: string | undefined, code?: string): string {
  const blob = `${code ?? ""} ${message ?? ""}`;
  if (blob.includes(OTP_SEND_FAILED_MESSAGE)) return OTP_SEND_FAILED_MESSAGE;
  if (/TOO_MANY_ATTEMPTS/i.test(blob)) return "尝试次数过多，请重新获取验证码。";
  if (/OTP_EXPIRED/i.test(blob)) return "验证码已过期，请重新获取。";
  if (/INVALID_OTP/i.test(blob)) return "验证码不正确或已过期。";
  const trimmed = message?.trim();
  return trimmed || "验证失败，请稍后重试。";
}

/** Better Auth stores email/password as `credential`; Google/X use other provider ids. */
export function isOAuthProviderId(providerId: string): boolean {
  return providerId !== "credential";
}
