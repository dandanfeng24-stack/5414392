import type { ReactNode } from "react";
import { canAccess, defaultUserTier, type UserTier } from "@/lib/access";
import { LockedContent } from "./LockedContent";

export function AccessGate({
  currentTier = defaultUserTier,
  requiredTier,
  children,
  fallback
}: {
  currentTier?: UserTier;
  requiredTier: UserTier;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  if (canAccess(currentTier, requiredTier)) {
    return <>{children}</>;
  }

  return <>{fallback ?? <LockedContent requiredTier={requiredTier} />}</>;
}
