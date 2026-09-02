import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { isAdminEmail } from "@/lib/server/ai-settings";
import {
  canUseVerifiedFeatures,
  isOAuthProviderId,
  type VerifiedFeatureInput,
} from "@/lib/auth/email-otp-lib";

/** Same id as `verify.server.ts` / `use-current-user` when auth is off. */
const DEV_USER_ID = "dev-user";

/**
 * Thrown when an unverified email/password user tries to favorite or generate
 * personalized advice. `status: 403` matches ForbiddenError / UnauthorizedError.
 */
export class EmailVerificationRequiredError extends Error {
  readonly status = 403;
  constructor(message: string) {
    super(message);
    this.name = "EmailVerificationRequiredError";
  }
}

export type VerifiedFeatureFlags = VerifiedFeatureInput & {
  canUseVerifiedFeatures: boolean;
  needsVerification: boolean;
};

async function lookupUser(userId: string): Promise<{
  email: string | null;
  emailVerified: boolean;
} | null> {
  const sql = await getSql();
  const rows = await sql<{ email: string; emailVerified: boolean }>`
    select "email", "emailVerified" from "user" where "id" = ${userId} limit 1
  `;
  return rows[0] ?? null;
}

async function userHasOAuthAccount(userId: string): Promise<boolean> {
  const sql = await getSql();
  const rows = await sql<{ providerId: string }>`
    select "providerId" from "account" where "userId" = ${userId}
  `;
  return rows.some((r) => isOAuthProviderId(r.providerId));
}

export async function getVerifiedFeatureFlags(userId: string): Promise<VerifiedFeatureFlags> {
  if (userId === DEV_USER_ID) {
    return {
      emailVerified: true,
      isAdmin: false,
      hasOAuthAccount: false,
      canUseVerifiedFeatures: true,
      needsVerification: false,
    };
  }

  const user = await lookupUser(userId);
  if (!user) {
    return {
      emailVerified: false,
      isAdmin: false,
      hasOAuthAccount: false,
      canUseVerifiedFeatures: false,
      needsVerification: true,
    };
  }

  const input: VerifiedFeatureInput = {
    emailVerified: user.emailVerified,
    isAdmin: isAdminEmail(user.email),
    hasOAuthAccount: await userHasOAuthAccount(userId),
  };
  const allowed = canUseVerifiedFeatures(input);
  return {
    ...input,
    canUseVerifiedFeatures: allowed,
    needsVerification: !allowed,
  };
}

export async function requireVerifiedFeatures(userId: string, message: string): Promise<void> {
  const flags = await getVerifiedFeatureFlags(userId);
  if (!flags.canUseVerifiedFeatures) {
    throw new EmailVerificationRequiredError(message);
  }
}

export const getVerifiedFeatureStatus = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => getVerifiedFeatureFlags(context.userId));
