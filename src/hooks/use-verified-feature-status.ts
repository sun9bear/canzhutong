import { useEffect, useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getVerifiedFeatureStatus } from "@/lib/auth/verified-features";

/** Client gate for 收藏 / 个人建议. Hidden while the session is loading. */
export function useVerifiedFeatureStatus() {
  const { user, isPending: authPending } = useCurrentUserState();
  const userId = user?.id;
  const isSignedIn = Boolean(user);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [canUseVerifiedFeatures, setCanUseVerifiedFeatures] = useState(true);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    if (authPending) {
      setIsPending(true);
      return;
    }
    if (!isSignedIn || !userId) {
      setNeedsVerification(false);
      setCanUseVerifiedFeatures(true);
      setIsPending(false);
      return;
    }

    let cancelled = false;
    setIsPending(true);
    void getVerifiedFeatureStatus()
      .then((s) => {
        if (cancelled) return;
        setNeedsVerification(s.needsVerification);
        setCanUseVerifiedFeatures(s.canUseVerifiedFeatures);
      })
      .catch(() => {
        if (cancelled) return;
        setNeedsVerification(false);
        setCanUseVerifiedFeatures(true);
      })
      .finally(() => {
        if (!cancelled) setIsPending(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId, isSignedIn, authPending]);

  return { needsVerification, canUseVerifiedFeatures, isPending };
}
