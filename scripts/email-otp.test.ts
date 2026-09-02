import assert from "node:assert/strict";
import { test } from "node:test";
import {
  ADVICE_NEEDS_VERIFICATION,
  DEFAULT_RESEND_FROM,
  FAVORITE_NEEDS_VERIFICATION,
  OTP_SEND_FAILED_MESSAGE,
  assertCanFavorite,
  assertCanGenerateAdvice,
  canUseVerifiedFeatures,
  getResendFrom,
  mapEmailOtpError,
  sendVerificationOtpEmail,
} from "../src/lib/auth/email-otp-lib.ts";

test("unverified email/password user cannot favorite", () => {
  assert.equal(
    canUseVerifiedFeatures({
      emailVerified: false,
      isAdmin: false,
      hasOAuthAccount: false,
    }),
    false,
  );
  assert.throws(
    () =>
      assertCanFavorite({
        emailVerified: false,
        isAdmin: false,
        hasOAuthAccount: false,
      }),
    { message: FAVORITE_NEEDS_VERIFICATION },
  );
});

test("admin email bypasses verification for favorites and advice", () => {
  const admin = {
    emailVerified: false,
    isAdmin: true,
    hasOAuthAccount: false,
  };
  assert.equal(canUseVerifiedFeatures(admin), true);
  assert.doesNotThrow(() => assertCanFavorite(admin));
  assert.doesNotThrow(() => assertCanGenerateAdvice(admin));
});

test("OAuth (Google/X) users are not blocked on OTP", () => {
  assert.equal(
    canUseVerifiedFeatures({
      emailVerified: false,
      isAdmin: false,
      hasOAuthAccount: true,
    }),
    true,
  );
});

test("verified users can generate advice", () => {
  assert.doesNotThrow(() =>
    assertCanGenerateAdvice({
      emailVerified: true,
      isAdmin: false,
      hasOAuthAccount: false,
    }),
  );
  assert.throws(
    () =>
      assertCanGenerateAdvice({
        emailVerified: false,
        isAdmin: false,
        hasOAuthAccount: false,
      }),
    { message: ADVICE_NEEDS_VERIFICATION },
  );
});

test("OTP send uses default from when RESEND_FROM unset", async () => {
  assert.equal(getResendFrom({}), DEFAULT_RESEND_FROM);
  assert.equal(getResendFrom({ RESEND_FROM: "  " }), DEFAULT_RESEND_FROM);

  const sent: { from: string; subject: string; text: string }[] = [];
  const payload = await sendVerificationOtpEmail(
    { email: "user@example.com", otp: "123456" },
    {
      env: { RESEND_API_KEY: "re_test_placeholder" },
      send: async (p) => {
        sent.push(p);
      },
    },
  );
  assert.equal(payload.from, DEFAULT_RESEND_FROM);
  assert.equal(sent[0]?.from, DEFAULT_RESEND_FROM);
  assert.equal(sent[0]?.subject, "残助通验证码");
  assert.match(sent[0]?.text ?? "", /123456/);
  assert.doesNotMatch(sent[0]?.text ?? "", /https?:\/\//);
});

test("RESEND_FROM override is used when set", async () => {
  const from = "残助通 <ops@example.com>";
  const payload = await sendVerificationOtpEmail(
    { email: "user@example.com", otp: "654321" },
    {
      env: { RESEND_API_KEY: "re_test_placeholder", RESEND_FROM: from },
      send: async () => undefined,
    },
  );
  assert.equal(payload.from, from);
});

test("missing RESEND_API_KEY fails send without crashing the process", async () => {
  await assert.rejects(
    () => sendVerificationOtpEmail({ email: "user@example.com", otp: "123456" }, { env: {} }),
    { message: OTP_SEND_FAILED_MESSAGE, name: "OtpSendError" },
  );
  assert.equal(process.exitCode ?? 0, 0);
});

test("mapEmailOtpError keeps the missing-key user message", () => {
  assert.equal(mapEmailOtpError(OTP_SEND_FAILED_MESSAGE), OTP_SEND_FAILED_MESSAGE);
  assert.equal(mapEmailOtpError("otp invalid", "INVALID_OTP"), "验证码不正确或已过期。");
});
