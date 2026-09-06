/**
 * Local email/password (this app's Better Auth DB — not the broker).
 *
 * Sign-in is ON (`emailAndPasswordEnabled`). Public **sign-up** is ON by default
 * (including production). Admin addresses in `ADMIN_EMAILS` are a hard gate:
 * they cannot *register* (prevents empty-DB squat) but can still *sign in*.
 * Login does **not** require `emailVerified`. Unverified password users may sign
 * in; 收藏 / 个人建议 are gated separately. ADMIN_EMAILS and Google/X OAuth
 * users are not blocked on OTP. Do not set REQUIRE_ADMIN_EMAIL_VERIFIED.
 *
 * Override: `ALLOW_EMAIL_SIGNUP=false` disables sign-up POSTs;
 * `VITE_ALLOW_EMAIL_SIGNUP=false` hides the 注册 UI (rebuild required).
 * Better Auth `emailAndPassword.disableSignUp` is set from `isEmailSignUpEnabled()`.
 * ADMIN_EMAILS gates live in `./admin-email-guards` and are wired from `./server`
 * as `databaseHooks.user.create.before` + `user.update.before` (emailAndPassword
 * has no signup hook; do not rewrite server.ts beyond those hooks).
 */
export const emailAndPasswordEnabled = true;

export {
  ADMIN_EMAIL_UPDATE_BLOCKED_MESSAGE,
  ADMIN_SIGNUP_BLOCKED_MESSAGE,
  REQUIRE_EMAIL_VERIFICATION_TO_SIGN_IN,
  REQUIRE_LOCAL_EMAIL_VERIFIED,
  canImplicitlyLinkOAuthToLocalUser,
  currentEmailFromAuthHookContext,
  isAdminSignUpEmailBlocked,
  shouldBlockAdminEmailUpdate,
} from "./admin-email-guards";

function envFlag(value: string | undefined): boolean | undefined {
  const v = value?.trim().toLowerCase();
  if (v === "true" || v === "1") return true;
  if (v === "false" || v === "0") return false;
  return undefined;
}

/** Server-side: whether Better Auth should accept email sign-up POSTs. Default ON. */
export function isEmailSignUpEnabled(): boolean {
  const explicit = envFlag(process.env.ALLOW_EMAIL_SIGNUP);
  if (explicit !== undefined) return explicit;
  return true;
}

/**
 * Client-side 注册 toggle. Shown by default in production and dev.
 * Hide only when `VITE_ALLOW_EMAIL_SIGNUP=false` (rebuild required).
 * Independent of DATABASE_URL (not exposed to the browser).
 */
export const emailSignUpUiEnabled =
  envFlag(import.meta.env?.VITE_ALLOW_EMAIL_SIGNUP) !== false;
