/** Only http(s) URLs already stored in the catalog may be rendered as outbound links. */

export function isOfficialOpenableUrl(raw: string | undefined | null): boolean {
  if (!raw) return false;
  const trimmed = raw.trim();
  if (!trimmed) return false;
  try {
    const u = new URL(trimmed);
    if (u.protocol !== "https:" && u.protocol !== "http:") return false;
    if (!u.hostname) return false;
    return true;
  } catch {
    return false;
  }
}
