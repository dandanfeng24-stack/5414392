"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { UserTier } from "@/lib/access";
import type { CurrentUser } from "@/lib/auth-types";

type AuthContextValue = {
  user: CurrentUser | null;
  tier: UserTier;
};

const AuthContext = createContext<AuthContextValue>({ user: null, tier: "guest" });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/auth/me", { credentials: "same-origin" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (isMounted) setUser(data?.user ?? null);
      })
      .catch(() => {
        if (isMounted) setUser(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, tier: user?.tier ?? "guest" }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
