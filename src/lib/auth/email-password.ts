/**
 * Local email/password (this app's Better Auth DB — not the broker).
 *
 * Sign-in is ON (`emailAndPasswordEnabled`). Public **sign-up** is not: anyone
 * who can register `ADMIN_EMAILS` would become admin (no emailVerification /
 * SMTP is configured, so Better Auth leaves `emailVerified=false` for password
 * users — we cannot require that flag without locking out the real admin).
 *
 * Production (Postgres `DATABASE_URL` set): sign-up disabled unless
 * `ALLOW_EMAIL_SIGNUP=true`. Local / live-preview without DATABASE_URL keeps
 * sign-up for sandbox testing unless `ALLOW_EMAIL_SIGNUP=false`.
 *
 * The login UI hides 注册 in production builds unless `VITE_ALLOW_EMAIL_SIGNUP=true`.
 * Better Auth `emailAndPassword.disableSignUp` is set from `isEmailSignUpEnabled()`.
 */
export const emailAndPasswordEnabled = true;

function envFlag(value: string | undefined): boolean | undefined {
  const v = value?.trim().toLowerCase();
  if (v === "true" || v === "1") return true;
  if (v === "false" || v === "0") return false;
  return undefined;
}

/** Server-side: whether Better Auth should accept email sign-up POSTs. */
export function isEmailSignUpEnabled(): boolean {
  const explicit = envFlag(process.env.ALLOW_EMAIL_SIGNUP);
  if (explicit !== undefined) return explicit;
  return !Boolean(process.env.DATABASE_URL?.trim());
}

/**
 * Client-side 注册 toggle. Production builds hide sign-up; `vite dev` keeps it
 * unless `VITE_ALLOW_EMAIL_SIGNUP=false`. Independent of DATABASE_URL (not
 * exposed to the browser).
 */
export const emailSignUpUiEnabled =
  import.meta.env.VITE_ALLOW_EMAIL_SIGNUP === "true" ||
  (import.meta.env.DEV && import.meta.env.VITE_ALLOW_EMAIL_SIGNUP !== "false");
