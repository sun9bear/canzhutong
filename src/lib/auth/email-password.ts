/**
 * Local email/password (this app's Better Auth DB — not the broker).
 *
 * Sign-in is ON (`emailAndPasswordEnabled`). Public **sign-up** is ON by default
 * (including production). Admin addresses in `ADMIN_EMAILS` are a hard gate:
 * they cannot *register* (prevents empty-DB squat) but can still *sign in*.
 * We do not require `emailVerified` — no SMTP is configured, so password users
 * (including the real admin) stay unverified.
 *
 * Override: `ALLOW_EMAIL_SIGNUP=false` disables sign-up POSTs;
 * `VITE_ALLOW_EMAIL_SIGNUP=false` hides the 注册 UI (rebuild required).
 * Better Auth `emailAndPassword.disableSignUp` is set from `isEmailSignUpEnabled()`.
 * The ADMIN_EMAILS gate is `databaseHooks.user.create.before` in `./server`
 * (emailAndPassword has no signup hook; do not rewrite server.ts beyond that).
 */
export const emailAndPasswordEnabled = true;

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
  envFlag(import.meta.env.VITE_ALLOW_EMAIL_SIGNUP) !== false;

/**
 * Server-only: `ADMIN_EMAILS` (comma-separated, trim + lowercase) cannot
 * create a new user. Login of an existing admin is unaffected.
 */
export function isAdminSignUpEmailBlocked(
  email: string | null | undefined,
): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return false;
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return admins.includes(normalized);
}

export const ADMIN_SIGNUP_BLOCKED_MESSAGE = "该邮箱不可用于注册";
