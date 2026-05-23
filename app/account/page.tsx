import Link from "next/link";
import { tierLabels, type UserTier } from "@/lib/access";

const tiers: Array<{ tier: UserTier; description: string }> = [
  { tier: "guest", description: "可浏览公开页面、数据库摘要和示例内容。" },
  { tier: "registered", description: "后续可保存诊断记录、收藏项目和查看基础资料。" },
  { tier: "paid", description: "后续可查看付费资料包、深度字段和会员权益。" },
  { tier: "service", description: "后续可查看项目诊断、咨询交付和服务进度。" }
];

const entries = [
  ["订单记录", "/account/orders", "未来展示资料包、会员和服务订单。"],
  ["会员权益", "/account/membership", "查看游客、注册用户、付费用户和服务客户的权益差异。"],
  ["服务记录", "/account/services", "未来展示诊断、咨询、交付和沟通记录。"]
];

export default function AccountPage() {
  return (
    <div className="section-shell py-16">
      <section className="surface rounded p-8 md:p-10">
        <div className="text-sm text-gold">用户中心</div>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-paper md:text-6xl">用户中心</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-linen">
          当前为账号体系前端占位，用于展示未来的订单、会员权益和服务记录入口。现阶段不读取用户状态，不创建真实账号。
        </p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {tiers.map((item) => (
          <article key={item.tier} className="surface rounded p-5">
            <div className="text-sm text-gold">{item.tier}</div>
            <h2 className="mt-3 font-serif text-2xl text-paper">{tierLabels[item.tier]}</h2>
            <p className="mt-4 text-sm leading-7 text-linen">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {entries.map(([title, href, description]) => (
          <Link key={href} href={href} className="surface rounded p-6 transition-colors hover:border-gold/45">
            <h2 className="font-serif text-2xl text-paper">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-linen">{description}</p>
            <div className="mt-5 text-sm text-gold">进入占位页</div>
          </Link>
        ))}
      </section>
    </div>
  );
}
