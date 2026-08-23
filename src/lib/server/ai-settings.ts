import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  apiKeyLast4,
  decryptApiKey,
  encryptApiKey,
} from "./ai-settings-crypto";

const HARDCODED_ADMIN_EMAILS = ["sun9bear@126.com"];

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return false;
  if (HARDCODED_ADMIN_EMAILS.includes(normalized)) return true;
  const extras = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return extras.includes(normalized);
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
 * else fall back to XAI_API_KEY + grok-4.5. Returns null when nothing usable.
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
    const baseUrl = data.baseUrl.trim();
    const model = data.model.trim();
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
