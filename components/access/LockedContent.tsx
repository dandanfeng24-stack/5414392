import type { UserTier } from "@/lib/access";
import { tierLabels } from "@/lib/access";
import { UpgradeCTA } from "./UpgradeCTA";

export function LockedContent({
  requiredTier,
  title = "该内容暂未开放",
  description,
  ctaLabel = "查看会员权益",
  ctaHref = "/account/membership"
}: {
  requiredTier: UserTier;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="surface rounded p-6">
      <div className="text-sm text-gold">权限内容</div>
      <h3 className="mt-3 font-serif text-2xl text-paper">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-linen">
        {description ?? `该内容需要 ${tierLabels[requiredTier]} 权限。当前版本仅提供前端占位，后续会接入真实账号与会员体系。`}
      </p>
      <div className="mt-6">
        <UpgradeCTA label={ctaLabel} href={ctaHref} variant="secondary" />
      </div>
    </div>
  );
}
