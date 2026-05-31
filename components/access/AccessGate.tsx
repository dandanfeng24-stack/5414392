"use client";

import type { ReactNode } from "react";
import { canAccess, type UserTier } from "@/lib/access";
import { useAuth } from "@/components/auth/AuthProvider";
import { LockedContent } from "./LockedContent";

export function AccessGate({
  currentTier,
  requiredTier,
  children,
  fallback
}: {
  currentTier?: UserTier;
  requiredTier: UserTier;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const auth = useAuth();
  const effectiveTier = currentTier ?? auth.tier;

  if (canAccess(effectiveTier, requiredTier)) {
    return <>{children}</>;
  }

  return <>{fallback ?? <LockedContent requiredTier={requiredTier} />}</>;
}
