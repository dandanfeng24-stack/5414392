import { tierLabels, type UserTier } from "@/lib/access";
import { AccountNav, requireAccountUser } from "../shared";

const tiers: UserTier[] = ["guest", "registered", "paid", "service"];

const benefits: Array<{ label: string; availability: Record<UserTier, string> }> = [
  { label: "可浏览基础项目库", availability: { guest: "可用", registered: "可用", paid: "可用", service: "可用" } },
  { label: "可查看评分理由", availability: { guest: "摘要", registered: "完整", paid: "完整", service: "完整" } },
  { label: "可查看方法拆解", availability: { guest: "示例", registered: "基础", paid: "深度", service: "深度" } },
  { label: "可查看资料包样张", availability: { guest: "预览", registered: "样张入口", paid: "完整资料包", service: "完整资料包" } },
  { label: "可查看完整产品/体验方案", availability: { guest: "不可用", registered: "不可用", paid: "可用", service: "可用" } },
  { label: "可查看深度案例内容", availability: { guest: "不可用", registered: "基础拆解", paid: "深度拆解", service: "深度拆解" } },
  { label: "可获得项目诊断与服务支持", availability: { guest: "入口", registered: "提交入口", paid: "咨询入口", service: "服务跟进" } }
];

export const dynamic = "force-dynamic";

export default async function AccountMembershipPage() {
  const user = await requireAccountUser("/account/membership");
  const currentTier = user.tier;

  return (
    <div className="section-shell py-16">
      <section className="surface rounded p-8 md:p-10">
        <div className="text-sm text-gold">会员权益</div>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-paper md:text-6xl">会员权益</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-linen">
          这里用于说明游客、注册用户、付费用户和服务客户的内容权限边界。当前版本不提供在线开通、支付或订单流程。
        </p>
      </section>

      <AccountNav />

      <section className="mt-8 overflow-x-auto rounded border border-paper/10">
        <div className="grid min-w-[760px] grid-cols-[1.25fr_repeat(4,1fr)] bg-ink/60 text-sm">
          <div className="border-r border-paper/10 p-4 text-paper/70">权益项目</div>
          {tiers.map((tier) => (
            <div
              key={tier}
              className={`border-r border-paper/10 p-4 ${tier === currentTier ? "bg-gold/[0.12] text-gold" : "text-paper/75"}`}
            >
              <div className="font-serif text-xl text-paper">{tierLabels[tier]}</div>
              <div className="mt-1 text-xs text-paper/50">{tier}</div>
              {tier === currentTier ? <div className="mt-3 text-xs text-gold">当前等级</div> : null}
            </div>
          ))}
          {benefits.map((benefit) => (
            <div key={benefit.label} className="contents">
              <div className="border-r border-t border-paper/10 p-4 text-linen">{benefit.label}</div>
              {tiers.map((tier) => (
                <div
                  key={`${benefit.label}-${tier}`}
                  className={`border-r border-t border-paper/10 p-4 text-sm leading-6 ${
                    tier === currentTier ? "bg-gold/[0.08] text-paper" : "text-paper/65"
                  }`}
                >
                  {benefit.availability[tier]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        <article className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">注册用户可见内容</h2>
          <p className="mt-4 text-sm leading-7 text-linen">
            注册后可查看完整评分理由、基础方法拆解、资料包样张入口、智能初评完整解释和相关资料包入口。
          </p>
        </article>
        <article className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">付费内容边界</h2>
          <p className="mt-4 text-sm leading-7 text-linen">
            完整产品/体验方案、深度字段、来源链和深度案例仍属于付费用户内容，不会在本轮降级开放。
          </p>
        </article>
        <article className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">服务客户边界</h2>
          <p className="mt-4 text-sm leading-7 text-linen">
            项目诊断、顾问服务和交付进度仍属于服务客户体系，当前仅展示入口说明，不接后台或 CRM。
          </p>
        </article>
      </section>
    </div>
  );
}
