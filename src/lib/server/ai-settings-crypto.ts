import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

/** Stable fallback when BETTER_AUTH_SECRET is unset (local / preview). */
const DEV_FALLBACK_SECRET = "canzhutong-dev-preview-ai-settings-secret";

function deriveKey(): Buffer {
  const secret = process.env.BETTER_AUTH_SECRET?.trim() || DEV_FALLBACK_SECRET;
  return createHash("sha256").update(secret, "utf8").digest();
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

/** Decrypt a value previously produced by `encryptApiKey`. */
export function decryptApiKey(stored: string): string {
  const parts = stored.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid api_key_cipher format");
  }
  const [ivB64, tagB64, ctB64] = parts;
  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const ciphertext = Buffer.from(ctB64, "base64");
  const decipher = createDecipheriv("aes-256-gcm", deriveKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString(
    "utf8",
  );
}

export function apiKeyLast4(key: string): string {
  const trimmed = key.trim();
  if (trimmed.length <= 4) return trimmed;
  return trimmed.slice(-4);
}
