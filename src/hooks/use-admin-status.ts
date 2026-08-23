import { useEffect, useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getAdminStatus } from "@/lib/server/ai-settings";

/** Client gate for admin-only UI (nav). Never shows admin chrome while session is loading. */
export function useAdminStatus() {
  const { user, isPending: authPending } = useCurrentUserState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    if (authPending) {
      setIsPending(true);
      return;
    }
    if (!user) {
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
  }, [user, authPending]);

  return { isAdmin, isPending };
}
