import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

/** DEV-ONLY fallback when BETTER_AUTH_SECRET is unset and there is no DATABASE_URL. */
const DEV_FALLBACK_SECRET = "canzhutong-dev-preview-ai-settings-secret";

function hasDatabaseUrl(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

function deriveKeyFromSecret(secret: string): Buffer {
  return createHash("sha256").update(secret, "utf8").digest();
}

function deriveKey(): Buffer {
  const secret = process.env.BETTER_AUTH_SECRET?.trim();
  if (!secret) {
    if (hasDatabaseUrl()) {
      throw new Error(
        "BETTER_AUTH_SECRET is required when DATABASE_URL is set (refusing public fallback)",
      );
    }
    return deriveKeyFromSecret(DEV_FALLBACK_SECRET);
  }
  return deriveKeyFromSecret(secret);
}

function decryptWithKey(stored: string, key: Buffer): string {
  const parts = stored.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid api_key_cipher format");
  }
  const [ivB64, tagB64, ctB64] = parts;
  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const ciphertext = Buffer.from(ctB64, "base64");
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString(
    "utf8",
  );
}

/**
 * Encrypt an API key with AES-256-GCM.
 * Stored form: `iv:tag:ciphertext` (each part base64).
 * Never log plaintext keys.
 */
export function encryptApiKey(plaintext: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", deriveKey(), iv);
  const ciphertext = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return [
    iv.toString("base64"),
    tag.toString("base64"),
    ciphertext.toString("base64"),
  ].join(":");
}

/** Decrypt a value previously produced by `encryptApiKey` with the current derived key. */
export function decryptApiKey(stored: string): string {
  return decryptWithKey(stored, deriveKey());
}

export type DecryptApiKeyResult = {
  plaintext: string;
  /**
   * True when the ciphertext was only readable with the legacy DEV_FALLBACK_SECRET
   * key (pre-hardening rows encrypted before BETTER_AUTH_SECRET was set).
   */
  usedLegacyFallback: boolean;
};

/**
 * Decrypt with the current key first. If that fails on a DATABASE_URL deployment
 * that now has BETTER_AUTH_SECRET, try once with DEV_FALLBACK_SECRET so old rows
 * remain readable for migration / re-encrypt.
 */
export function decryptApiKeyWithLegacyFallback(
  stored: string,
): DecryptApiKeyResult {
  try {
    return {
      plaintext: decryptWithKey(stored, deriveKey()),
      usedLegacyFallback: false,
    };
  } catch (primaryErr) {
    const secret = process.env.BETTER_AUTH_SECRET?.trim();
    if (!secret || !hasDatabaseUrl()) {
      throw primaryErr;
    }
    try {
      const plaintext = decryptWithKey(
        stored,
        deriveKeyFromSecret(DEV_FALLBACK_SECRET),
      );
      return { plaintext, usedLegacyFallback: true };
    } catch {
      throw primaryErr;
    }
  }
}

export function apiKeyLast4(key: string): string {
  const trimmed = key.trim();
  if (trimmed.length <= 4) return trimmed;
  return trimmed.slice(-4);
}
