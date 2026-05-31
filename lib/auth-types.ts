import type { UserTier } from "@/lib/access";

export type CurrentUser = {
  id: string;
  email: string;
  displayName: string | null;
  tier: Exclude<UserTier, "guest">;
  createdAt: string;
};
