import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  ADMIN_EMAIL_UPDATE_BLOCKED_MESSAGE,
  ADMIN_SIGNUP_BLOCKED_MESSAGE,
  REQUIRE_EMAIL_VERIFICATION_TO_SIGN_IN,
  REQUIRE_LOCAL_EMAIL_VERIFIED,
  canImplicitlyLinkOAuthToLocalUser,
  currentEmailFromAuthHookContext,
  isAdminSignUpEmailBlocked,
  shouldBlockAdminEmailUpdate,
} from "../src/lib/auth/admin-email-guards.ts";

const ADMIN = "admin@example.com";
const env = { ADMIN_EMAILS: ` ${ADMIN}, other.admin@example.com ` };

test("create-hook: ADMIN_EMAILS still cannot register (trim + lowercase)", () => {
  assert.equal(isAdminSignUpEmailBlocked(ADMIN, env), true);
  assert.equal(isAdminSignUpEmailBlocked("  Admin@Example.com  ", env), true);
  assert.equal(isAdminSignUpEmailBlocked("user@example.com", env), false);
  assert.equal(isAdminSignUpEmailBlocked("", env), false);
  assert.equal(isAdminSignUpEmailBlocked(null, env), false);
  assert.equal(ADMIN_SIGNUP_BLOCKED_MESSAGE, "该邮箱不可用于注册");
});

test("update-hook: changing email onto ADMIN_EMAILS is rejected", () => {
  assert.equal(
    shouldBlockAdminEmailUpdate({ email: ADMIN }, "attacker@example.com", env),
    true,
  );
  assert.equal(
    shouldBlockAdminEmailUpdate({ email: "  Admin@Example.com " }, "user@x.com", env),
    true,
  );
  assert.equal(ADMIN_EMAIL_UPDATE_BLOCKED_MESSAGE, "该邮箱不可用于更改");
});

test("update-hook: existing admin updating other fields still works", () => {
  assert.equal(shouldBlockAdminEmailUpdate({}, ADMIN, env), false);
  assert.equal(
    shouldBlockAdminEmailUpdate({ email: undefined }, ADMIN, env),
    false,
  );
  // OTP verify rewrites the current admin email onto the same row.
  assert.equal(shouldBlockAdminEmailUpdate({ email: ADMIN }, ADMIN, env), false);
});

test("update-hook: changing away from an admin email is allowed", () => {
  assert.equal(
    shouldBlockAdminEmailUpdate({ email: "new.owner@example.com" }, ADMIN, env),
    false,
  );
});

test("unverified password users may still sign in (requireEmailVerification stays off)", () => {
  assert.equal(REQUIRE_EMAIL_VERIFICATION_TO_SIGN_IN, false);
});

test("unverified local password user cannot absorb a later OAuth identity", () => {
  assert.equal(REQUIRE_LOCAL_EMAIL_VERIFIED, true);
  assert.equal(canImplicitlyLinkOAuthToLocalUser({ emailVerified: false }), false);
  assert.equal(canImplicitlyLinkOAuthToLocalUser({ emailVerified: true }), true);
});

test("hook context reads session.user.email from Better Auth AuthContext", () => {
  assert.equal(
    currentEmailFromAuthHookContext({
      context: { session: { user: { email: "user@example.com" } } },
    }),
    "user@example.com",
  );
  assert.equal(currentEmailFromAuthHookContext(null), null);
  assert.equal(currentEmailFromAuthHookContext({ context: { session: null } }), null);
});

test("server.ts wires create/update hooks and does not require email verification to sign in", () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const src = readFileSync(join(root, "src/lib/auth/server.ts"), "utf8");
  assert.match(src, /update:\s*\{/);
  assert.match(src, /shouldBlockAdminEmailUpdate/);
  assert.match(src, /ADMIN_EMAIL_UPDATE_BLOCKED_MESSAGE/);
  assert.match(src, /requireLocalEmailVerified:\s*REQUIRE_LOCAL_EMAIL_VERIFIED/);
  assert.match(
    src,
    /requireEmailVerification:\s*REQUIRE_EMAIL_VERIFICATION_TO_SIGN_IN/,
  );
  assert.doesNotMatch(src, /REQUIRE_ADMIN_EMAIL_VERIFIED/);
  assert.doesNotMatch(src, /requireLocalEmailVerified:\s*false/);
});

test("product: ADMIN_EMAILS still cannot self-register (create.before stays)", () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const src = readFileSync(join(root, "src/lib/auth/server.ts"), "utf8");
  assert.match(src, /create:\s*\{/);
  assert.match(src, /isAdminSignUpEmailBlocked\(user\.email\)/);
  assert.match(src, /ADMIN_SIGNUP_BLOCKED_MESSAGE/);
});

test("product: 问一问 / askPolicy stays unauthenticated", () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const chat = readFileSync(join(root, "src/lib/server/chat.ts"), "utf8");
  const askPage = readFileSync(join(root, "src/routes/_app/ask.tsx"), "utf8");
  assert.match(chat, /export const askPolicy = createServerFn/);
  assert.doesNotMatch(chat, /authMiddleware/);
  assert.doesNotMatch(chat, /requireAdmin|useCurrentUser|SignedIn/);
  assert.doesNotMatch(askPage, /authMiddleware|SignedIn|useCurrentUser/);
});
