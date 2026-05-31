import "server-only";

import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { readSessionToken, sessionCookieName } from "@/lib/auth";
import type { UserTier } from "@/lib/access";
import type { CurrentUser } from "@/lib/auth-types";

type UserRow = {
  id: string;
  email: string;
  display_name: string | null;
  tier: Exclude<UserTier, "guest">;
  created_at: Date;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const session = await readSessionToken(cookieStore.get(sessionCookieName)?.value);

  if (!session) return null;

  try {
    const result = await query<UserRow>(
      "SELECT id, email, display_name, tier, created_at FROM users WHERE id = $1 LIMIT 1",
      [session.userId]
    );
    const user = result.rows[0];

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      displayName: user.display_name,
      tier: user.tier,
      createdAt: user.created_at.toISOString()
    };
  } catch {
    return null;
  }
}
