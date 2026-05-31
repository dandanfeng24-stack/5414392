import Link from "next/link";
import { redirect } from "next/navigation";
import { tierLabels, type UserTier } from "@/lib/access";
import { getCurrentUser } from "@/lib/current-user";

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

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/account");
  }

  return (
    <div className="section-shell py-16">
      <section className="surface rounded p-8 md:p-10">
        <div className="text-sm text-gold">用户中心</div>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-paper md:text-6xl">用户中心</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-linen">
          这里显示当前登录账号的基础信息和权限等级。订单、服务记录和资料权限将围绕该账号继续扩展。
        </p>
      </section>

      <section className="mt-10 surface rounded p-6 md:p-8">
        <h2 className="font-serif text-2xl text-paper">账号信息</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AccountField label="邮箱" value={user.email} />
          <AccountField label="昵称" value={user.displayName || "未设置"} />
          <AccountField label="用户等级" value={tierLabels[user.tier]} />
          <AccountField label="注册时间" value={formatDate(user.createdAt)} />
        </div>
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

function AccountField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-paper/10 bg-ink/45 p-4">
      <div className="text-xs text-gold">{label}</div>
      <div className="mt-2 break-words text-sm leading-6 text-paper/88">{value}</div>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
