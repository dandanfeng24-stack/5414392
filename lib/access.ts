export type UserTier = "guest" | "registered" | "paid" | "service";

export const tierRank: Record<UserTier, number> = {
  guest: 0,
  registered: 1,
  paid: 2,
  service: 3
};

export const defaultUserTier: UserTier = "guest";

export function canAccess(currentTier: UserTier, requiredTier: UserTier) {
  return tierRank[currentTier] >= tierRank[requiredTier];
}

export const tierLabels: Record<UserTier, string> = {
  guest: "游客",
  registered: "注册用户",
  paid: "付费用户",
  service: "服务客户"
};
