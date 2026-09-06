/**
 * ADMIN_EMAILS + account-linking predicates.
 *
 * No Better Auth / Vite / DB imports so Node's type-stripping test runner can
 * load this file. Wired from `./server` as the smallest additive hooks.
 */

export const ADMIN_SIGNUP_BLOCKED_MESSAGE = "该邮箱不可用于注册";
export const ADMIN_EMAIL_UPDATE_BLOCKED_MESSAGE = "该邮箱不可用于更改";

/**
 * Unverified password users MAY sign in. Favorites / 个人建议 stay gated.
 * Do not flip this for the OAuth-linking P0.
 */
export const REQUIRE_EMAIL_VERIFICATION_TO_SIGN_IN = false;

/**
 * better-auth 1.6.30 `account.accountLinking.requireLocalEmailVerified`.
 * Default in the library is `true`. Checks the *existing local user row*,
 * not the incoming OAuth `email_verified` claim (X synthetic emails).
 */
export const REQUIRE_LOCAL_EMAIL_VERIFIED = true;

export type EnvMap = { ADMIN_EMAILS?: string | undefined };

function normalizeEmail(email: string | null | undefined): string {
  return (email ?? "").trim().toLowerCase();
}

export function adminEmailsFromEnv(env: EnvMap = process.env): string[] {
  return (env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Server-only: `ADMIN_EMAILS` (comma-separated, trim + lowercase) cannot
 * create a new user. Login of an existing admin is unaffected.
 */
export function isAdminSignUpEmailBlocked(
  email: string | null | undefined,
  env: EnvMap = process.env,
): boolean {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  return adminEmailsFromEnv(env).includes(normalized);
}

/**
 * True when an update payload would *change* the row onto an ADMIN_EMAILS
 * address. Omitting `email`, non-admin emails (including changing *away*
 * from an admin address), and rewriting the same admin address (OTP verify
 * re-sends the current email) are allowed so existing admins can update
 * other fields.
 */
export function shouldBlockAdminEmailUpdate(
  update: { email?: string | null },
  currentEmail?: string | null,
  env: EnvMap = process.env,
): boolean {
  if (!Object.prototype.hasOwnProperty.call(update, "email")) return false;
  if (update.email == null) return false;
  if (!isAdminSignUpEmailBlocked(update.email, env)) return false;
  const next = normalizeEmail(update.email);
  const current = normalizeEmail(currentEmail);
  if (current && current === next) return false;
  return true;
}

/** Session email on Better Auth `databaseHooks.user.update.before` context. */
export function currentEmailFromAuthHookContext(
  ctx:
    | {
        context?: {
          session?: { user?: { email?: string | null } | null } | null;
        } | null;
      }
    | null
    | undefined,
): string | null {
  return ctx?.context?.session?.user?.email ?? null;
}

/**
 * Mirrors better-auth 1.6.30 `handleOAuthUserInfo` implicit-link gate:
 * `requireLocalEmailVerified && !dbUser.user.emailVerified`.
 * `trustedProviders` does **not** skip this — it only skips the incoming
 * provider `emailVerified` check (`!isTrustedProvider && !userInfo.emailVerified`).
 */
export function canImplicitlyLinkOAuthToLocalUser(local: {
  emailVerified: boolean;
}): boolean {
  if (REQUIRE_LOCAL_EMAIL_VERIFIED && !local.emailVerified) return false;
  return true;
}
