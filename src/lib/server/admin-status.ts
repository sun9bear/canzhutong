import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";

/**
 * Client-safe admin check. Implementation imports stay inside the handler so
 * `ai-settings-crypto` / `node:crypto` are not pulled into the browser bundle
 * (the app shell calls this on every page).
 */
export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { isAdminEmail } = await import("./ai-settings");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{ email: string | null }>`
      select "email" from "user" where "id" = ${context.userId} limit 1
    `;
    return { isAdmin: isAdminEmail(rows[0]?.email) };
  });
