import { useEffect, useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getAdminStatus } from "@/lib/server/admin-status";

/** Client gate for admin-only UI (nav). Never shows admin chrome while session is loading. */
export function useAdminStatus() {
  const { user, isPending: authPending } = useCurrentUserState();
  // Stable primitives only: the hook above returns a fresh AppUser object every
  // render, so depending on it would re-run the fetch loop indefinitely.
  const userId = user?.id;
  const isSignedIn = Boolean(user);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    if (authPending) {
      setIsPending(true);
      return;
    }
    if (!isSignedIn || !userId) {
      setIsAdmin(false);
      setIsPending(false);
      return;
    }

    let cancelled = false;
    setIsPending(true);
    void getAdminStatus()
      .then((s) => {
        if (!cancelled) setIsAdmin(s.isAdmin);
      })
      .catch(() => {
        if (!cancelled) setIsAdmin(false);
      })
      .finally(() => {
        if (!cancelled) setIsPending(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId, isSignedIn, authPending]);

  return { isAdmin, isPending };
}
