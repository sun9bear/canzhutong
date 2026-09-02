import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  apiKeyLast4,
  decryptApiKeyWithLegacyFallback,
  encryptApiKey,
} from "./ai-settings-crypto";

/**
 * Thrown by admin-only server functions. Carries `status: 403` so TanStack Start
 * maps it to HTTP Forbidden (same pattern as UnauthorizedError / CrossSiteRequestError).
 */
export class ForbiddenError extends Error {
  readonly status = 403;
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

function adminEmailsFromEnv(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

if (process.env.DATABASE_URL?.trim() && adminEmailsFromEnv().length === 0) {
  console.error(
    "[admin] DATABASE_URL is set but ADMIN_EMAILS is empty — no admins (fail closed).",
  );
}

/**
 * Admins come ONLY from `ADMIN_EMAILS` (comma-separated).
 * When `DATABASE_URL` is set and `ADMIN_EMAILS` is empty → fail closed (no admins).
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return false;
  const admins = adminEmailsFromEnv();
  if (admins.length === 0) {
    // Fail closed in production (DATABASE_URL set); local PGLite likewise has no
    // admins until ADMIN_EMAILS is configured.
    return false;
  }
  return admins.includes(normalized);
}

async function lookupAdminUser(userId: string): Promise<{
  email: string | null;
  emailVerified: boolean;
} | null> {
  const sql = await getSql();
  const rows = await sql<{ email: string; emailVerified: boolean }>`
    select "email", "emailVerified" from "user" where "id" = ${userId} limit 1
  `;
  return rows[0] ?? null;
}

/**
 * Admin gate: email must be in ADMIN_EMAILS.
 *
 * We do **not** require `emailVerified` by default. Better Auth only sets that
 * flag when email verification / SMTP is configured; password users (including
 * the real ADMIN_EMAILS owner) stay `emailVerified=false`. Requiring the flag
 * would lock them out of the admin hub. Public email sign-up is allowed, but
 * addresses in ADMIN_EMAILS cannot *register* (see `isAdminSignUpEmailBlocked`
 * + `databaseHooks.user.create.before` in auth/server). Existing admins sign in.
 *
 * Do **not** set REQUIRE_ADMIN_EMAIL_VERIFIED — ADMIN_EMAILS and existing
 * admin accounts are not required to verify (email OTP is for regular users).
 */
export async function requireAdmin(context: { userId: string }): Promise<{
  userId: string;
  email: string;
}> {
  const user = await lookupAdminUser(context.userId);
  const email = user?.email ?? null;
  if (!isAdminEmail(email)) {
    throw new ForbiddenError("无权限");
  }
  const requireVerified =
    (process.env.REQUIRE_ADMIN_EMAIL_VERIFIED ?? "").trim().toLowerCase() ===
    "true";
  if (requireVerified && !user?.emailVerified) {
    throw new ForbiddenError("无权限");
  }
  return { userId: context.userId, email: email! };
}

/** Normalize provider base URL so callers append `/chat/completions`. */
export function normalizeLlmBaseUrl(raw: string): string {
  let url = raw.trim().replace(/\/+$/, "");
  if (!url) return "";
  if (!url.endsWith("/v1")) {
    url = `${url}/v1`;
  }
  return url;
}

/** Extract embedded IPv4 from IPv4-mapped IPv6 (::ffff:a.b.c.d or ::ffff:7f00:1). */
function ipv4FromMappedIpv6(host: string): string | null {
  const dotted = /^::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/i.exec(host);
  if (dotted) return dotted[1];

  // Node's URL canonicalizes ::ffff:127.0.0.1 → ::ffff:7f00:1
  const hex = /^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i.exec(host);
  if (hex) {
    const hi = Number.parseInt(hex[1], 16);
    const lo = Number.parseInt(hex[2], 16);
    if (!Number.isFinite(hi) || !Number.isFinite(lo)) return null;
    return `${(hi >>> 8) & 0xff}.${hi & 0xff}.${(lo >>> 8) & 0xff}.${lo & 0xff}`;
  }
  return null;
}

/** True if host looks like IPv6 loopback / link-local (fe80::/10) / ULA (fc00::/7). */
function isBlockedIpv6(host: string): boolean {
  if (host === "::1" || host === "::" || host === "0:0:0:0:0:0:0:1") {
    return true;
  }

  // Link-local fe80::/10 and unique-local fc00::/7 on the first hextet.
  const first = host.split(":", 1)[0] ?? "";
  if (/^fe[89ab]/i.test(first)) return true;
  if (/^f[cd]/i.test(first)) return true;

  // Compact forms where the first hextet is omitted (e.g. ::ffff:… handled elsewhere)
  // but fe80/fc/fd may appear after leading zeros compression only as fe80:: / fc00::.
  if (
    host.startsWith("fe8") ||
    host.startsWith("fe9") ||
    host.startsWith("fea") ||
    host.startsWith("feb") ||
    host.startsWith("fc") ||
    host.startsWith("fd")
  ) {
    return true;
  }

  return false;
}

/** True for private / link-local / loopback IPv4 or IPv6 hostnames. */
function isBlockedHost(hostname: string): boolean {
  const host = hostname.trim().toLowerCase().replace(/^\[|\]$/g, "");
  if (
    !host ||
    host === "localhost" ||
    host === "0.0.0.0" ||
    host === "::" ||
    host === "::1" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local")
  ) {
    return true;
  }

  const v4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (v4) {
    const a = Number(v4[1]);
    const b = Number(v4[2]);
    const octets = [a, b, Number(v4[3]), Number(v4[4])];
    if (octets.some((n) => n > 255)) return true;
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    return false;
  }

  if (host.includes(":")) {
    const mapped = ipv4FromMappedIpv6(host);
    if (mapped) return isBlockedHost(mapped);

    // Deprecated IPv4-compatible IPv6 (::a.b.c.d)
    const compat = /^::(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/.exec(host);
    if (compat) return isBlockedHost(compat[1]);

    return isBlockedIpv6(host);
  }

  return false;
}

/**
 * Require an absolute https:// URL whose host is not private / link-local / loopback.
 * Returns the trimmed input (normalization to …/v1 happens separately at call time).
 */
export function assertPublicHttpsBaseUrl(raw: string): string {
  const trimmed = raw.trim();
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error("Base URL 必须是合法的 https:// 绝对地址");
  }
  if (parsed.protocol !== "https:") {
    throw new Error("Base URL 必须使用 https://");
  }
  if (!parsed.hostname || isBlockedHost(parsed.hostname)) {
    throw new Error("Base URL 不能指向内网、本地或链路本地地址");
  }
  return trimmed;
}

export type LlmConfig = {
  baseUrl: string;
  model: string;
  apiKey: string;
};

type AiSettingsRow = {
  base_url: string;
  model: string;
  api_key_cipher: string;
  api_key_last4: string;
};

async function readSettingsRow(): Promise<AiSettingsRow | null> {
  const sql = await getSql();
  const rows = await sql<AiSettingsRow>`
    select base_url, model, api_key_cipher, api_key_last4
    from ai_settings where id = 1
  `;
  return rows[0] ?? null;
}

/**
 * Decrypt DB api_key_cipher; if it was encrypted with the legacy DEV fallback
 * key, re-encrypt with the current BETTER_AUTH_SECRET-derived key and persist.
 */
async function decryptAndMaybeMigrateApiKey(cipher: string): Promise<string> {
  const { plaintext, usedLegacyFallback } =
    decryptApiKeyWithLegacyFallback(cipher);
  const apiKey = plaintext.trim();
  if (!usedLegacyFallback || !apiKey) {
    return apiKey;
  }

  const newCipher = encryptApiKey(apiKey);
  const last4 = apiKeyLast4(apiKey);
  const sql = await getSql();
  await sql`
    update ai_settings
    set api_key_cipher = ${newCipher},
        api_key_last4 = ${last4},
        updated_at = now()
    where id = 1
  `;
  return apiKey;
}

/**
 * Internal: resolve OpenAI-compatible LLM config from admin DB settings,
 * else DEEPSEEK_API_KEY (+ optional DEEPSEEK_BASE_URL / DEEPSEEK_MODEL),
 * else XAI_API_KEY + grok-4.5. Returns null when nothing usable.
 */
export async function getLlmConfig(): Promise<LlmConfig | null> {
  const row = await readSettingsRow();
  if (row?.api_key_cipher) {
    try {
      const apiKey = await decryptAndMaybeMigrateApiKey(row.api_key_cipher);
      const baseUrl = normalizeLlmBaseUrl(row.base_url);
      const model = row.model.trim();
      if (apiKey && baseUrl && model) {
        return { baseUrl, model, apiKey };
      }
    } catch {
      // Corrupt cipher or unknown key — fall through to env fallback.
    }
  }

  const deepseek = process.env.DEEPSEEK_API_KEY?.trim();
  if (deepseek) {
    return {
      baseUrl: normalizeLlmBaseUrl(
        process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
      ),
      model: (process.env.DEEPSEEK_MODEL || "deepseek-chat").trim(),
      apiKey: deepseek,
    };
  }

  const xai = process.env.XAI_API_KEY?.trim();
  if (xai) {
    return {
      baseUrl: "https://api.x.ai/v1",
      model: "grok-4.5",
      apiKey: xai,
    };
  }
  return null;
}

export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const user = await lookupAdminUser(context.userId);
    return { isAdmin: isAdminEmail(user?.email) };
  });

export const getAiSettings = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const row = await readSettingsRow();
    const last4 = row?.api_key_last4?.trim() ?? "";
    const baseUrl = row?.base_url ?? "";
    const model = row?.model ?? "";

    // Only report configured when the stored cipher actually decrypts (and
    // migrate legacy DEV_FALLBACK ciphertext when possible).
    let configured = false;
    if (row?.api_key_cipher && baseUrl.trim() && model.trim()) {
      try {
        const apiKey = await decryptAndMaybeMigrateApiKey(row.api_key_cipher);
        configured = Boolean(apiKey);
      } catch {
        configured = false;
      }
    }

    return {
      baseUrl,
      model,
      apiKeyLast4: last4,
      configured,
    };
  });

export const saveAiSettings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: { baseUrl: string; model: string; apiKey?: string }) => input,
  )
  .handler(async ({ context, data }) => {
    const admin = await requireAdmin(context);
    const baseUrl = assertPublicHttpsBaseUrl(data.baseUrl);
    const model = data.model.trim();
    if (!model) {
      throw new Error("模型名不能为空");
    }
    const incomingKey = data.apiKey?.trim() ?? "";

    const sql = await getSql();
    const existing = await readSettingsRow();

    let cipher = existing?.api_key_cipher ?? "";
    let last4 = existing?.api_key_last4 ?? "";
    if (incomingKey) {
      cipher = encryptApiKey(incomingKey);
      last4 = apiKeyLast4(incomingKey);
    } else if (cipher) {
      // Keep existing key, but migrate legacy ciphertext if needed so the
      // saved row stays readable under the current secret.
      try {
        const existingKey = await decryptAndMaybeMigrateApiKey(cipher);
        if (existingKey) {
          const refreshed = await readSettingsRow();
          cipher = refreshed?.api_key_cipher ?? cipher;
          last4 = refreshed?.api_key_last4 ?? last4;
        }
      } catch {
        throw new Error(
          "已保存的 API Key 无法解密（密钥可能已轮换）。请重新填写 API Key 后再保存。",
        );
      }
    }

    await sql`
      insert into ai_settings (id, base_url, model, api_key_cipher, api_key_last4, updated_at, updated_by)
      values (
        1,
        ${baseUrl},
        ${model},
        ${cipher},
        ${last4},
        now(),
        ${admin.email}
      )
      on conflict (id) do update set
        base_url = excluded.base_url,
        model = excluded.model,
        api_key_cipher = excluded.api_key_cipher,
        api_key_last4 = excluded.api_key_last4,
        updated_at = now(),
        updated_by = excluded.updated_by
    `;

    return {
      ok: true as const,
      baseUrl,
      model,
      apiKeyLast4: last4,
      configured: Boolean(cipher && baseUrl && model),
    };
  });
