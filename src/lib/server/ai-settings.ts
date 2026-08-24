import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  apiKeyLast4,
  decryptApiKey,
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

async function lookupUserEmail(userId: string): Promise<string | null> {
  const sql = await getSql();
  const rows = await sql<{ email: string }>`
    select "email" from "user" where "id" = ${userId} limit 1
  `;
  return rows[0]?.email ?? null;
}

export async function requireAdmin(context: { userId: string }): Promise<{
  userId: string;
  email: string;
}> {
  const email = await lookupUserEmail(context.userId);
  if (!isAdminEmail(email)) {
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

  // IPv6: loopback, link-local (fe80::/10), unique-local (fc00::/7), IPv4-mapped
  if (host.includes(":")) {
    if (host === "::1" || host === "::") return true;
    const compact = host.replace(/^0+/, "").toLowerCase();
    if (compact.startsWith("fe8") || compact.startsWith("fe9") || compact.startsWith("fea") || compact.startsWith("feb")) {
      return true;
    }
    if (compact.startsWith("fc") || compact.startsWith("fd")) return true;
    const mapped = host.match(/::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/i);
    if (mapped) return isBlockedHost(mapped[1]);
    return false;
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
 * Internal: resolve OpenAI-compatible LLM config from admin DB settings,
 * else DEEPSEEK_API_KEY (+ optional DEEPSEEK_BASE_URL / DEEPSEEK_MODEL),
 * else XAI_API_KEY + grok-4.5. Returns null when nothing usable.
 */
export async function getLlmConfig(): Promise<LlmConfig | null> {
  const row = await readSettingsRow();
  if (row?.api_key_cipher) {
    try {
      const apiKey = decryptApiKey(row.api_key_cipher).trim();
      const baseUrl = normalizeLlmBaseUrl(row.base_url);
      const model = row.model.trim();
      if (apiKey && baseUrl && model) {
        return { baseUrl, model, apiKey };
      }
    } catch {
      // Corrupt cipher or rotated secret — fall through to env fallback.
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
    const email = await lookupUserEmail(context.userId);
    return { isAdmin: isAdminEmail(email) };
  });

export const getAiSettings = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const row = await readSettingsRow();
    const last4 = row?.api_key_last4?.trim() ?? "";
    const baseUrl = row?.base_url ?? "";
    const model = row?.model ?? "";
    const configured = Boolean(
      row?.api_key_cipher && baseUrl.trim() && model.trim(),
    );
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
