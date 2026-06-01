import Link from "next/link";
import { canAccess, tierLabels, type UserTier } from "@/lib/access";
import { AccountNav, requireAccountUser } from "./shared";

const registeredBenefits = [
  "完整评分理由",
  "基础方法拆解",
  "智能初评完整解释",
  "资料包样张入口",
  "相关资料包入口"
];

const paidBenefits = ["完整产品/体验方案", "深度案例内容", "完整资料包与工具模板"];
const serviceBenefits = ["项目诊断与服务支持", "咨询交付记录入口", "服务进度跟进"];

const recordEntries = [
  ["资料包记录", "/account/orders", "查看后续资料包领取或下载记录。当前第一版为空状态。"],
  ["诊断与服务记录", "/account/services", "查看后续项目诊断、咨询与服务进度。当前第一版为空状态。"],
  ["收藏项目", "/account/favorites", "查看后续收藏的非遗项目。当前第一版为空状态。"],
  ["会员权益", "/account/membership", "查看游客、注册用户、付费用户和服务客户的权益边界。"]
];

const commonEntries = [
  ["项目库", "/database", "查看非遗项目的评分、方向和转化参考。", "查看项目库参考"],
  ["智能初评", "/ai-assessment", "根据项目基础条件，获得初步转化方向判断。", "完成智能初评"],
  ["资料包样张", "/packages", "查看资料包样张说明，了解可参考的表格、清单和方法框架。", "查看样张说明"],
  ["项目诊断", "/diagnosis?from=account", "提交你的非遗项目或文旅资源，获得进一步诊断沟通入口。", "提交项目诊断"]
];

const nextSteps = [
  ["先选一个参考项目", "/database", "从项目库里观察评分理由、适合场景和风险提示。", "查看项目库参考"],
  ["再做一次轻量判断", "/ai-assessment", "用智能初评把自己的项目条件快速过一遍。", "完成智能初评"],
  ["需要更具体时提交诊断", "/diagnosis?from=account", "把真实项目资料提交进来，后续用于人工沟通和专项诊断。", "提交项目诊断"]
];

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await requireAccountUser("/account");
  const visibleBenefits = getVisibleBenefits(user.tier);

  return (
    <div className="section-shell py-16">
      <section className="surface rounded p-8 md:p-10">
        <div className="text-sm text-gold">用户中心</div>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-paper md:text-6xl">我的工作台</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-linen">
          这里用于进入项目库、智能初评、资料包样张、项目诊断和个人记录入口。当前第一版只做入口与说明，不生成假记录。
        </p>
      </section>

      <AccountNav />

      <section className="mt-10 surface rounded p-6 md:p-8">
        <h2 className="font-serif text-2xl text-paper">账号信息</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AccountField label="邮箱" value={user.email} />
          <AccountField label="昵称" value={user.displayName || "未设置"} />
          <AccountField label="用户等级" value={tierLabels[user.tier]} />
          <AccountField label="注册时间" value={formatDate(user.createdAt)} />
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5">
          <div className="text-sm text-gold">常用入口</div>
          <h2 className="mt-2 font-serif text-3xl text-paper">从这里进入核心流程</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {commonEntries.map(([title, href, description, actionLabel]) => (
            <Link key={href} href={href} className="surface rounded p-6 transition-colors hover:border-gold/45">
              <h3 className="font-serif text-2xl text-paper">{title}</h3>
              <p className="mt-4 min-h-14 text-sm leading-7 text-linen">{description}</p>
              <div className="mt-5 text-sm text-gold">{actionLabel}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 surface rounded p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-sm text-gold">我的可见内容</div>
            <h2 className="mt-2 font-serif text-3xl text-paper">当前账号可查看</h2>
          </div>
          <Link href="/account/membership" className="rounded border border-gold/45 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink">
            查看会员权益
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleBenefits.map((item) => (
            <article key={item} className="rounded border border-paper/10 bg-ink/45 p-4">
              <div className="text-sm text-paper">{item}</div>
              <p className="mt-2 text-xs leading-6 text-linen">已按当前用户等级开放或显示对应入口。</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5">
          <div className="text-sm text-gold">我的记录入口</div>
          <h2 className="mt-2 font-serif text-3xl text-paper">后续记录会集中在这里</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {recordEntries.map(([title, href, description]) => (
            <Link key={href} href={href} className="surface rounded p-6 transition-colors hover:border-gold/45">
              <h3 className="font-serif text-2xl text-paper">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-linen">{description}</p>
              <div className="mt-5 text-sm text-gold">进入查看</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5">
          <div className="text-sm text-gold">下一步建议</div>
          <h2 className="mt-2 font-serif text-3xl text-paper">按一条轻量路径推进</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {nextSteps.map(([title, href, description, actionLabel]) => (
            <Link key={href} href={href} className="surface rounded p-6 transition-colors hover:border-gold/45">
              <h3 className="font-serif text-2xl text-paper">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-linen">{description}</p>
              <div className="mt-5 text-sm text-gold">{actionLabel}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function getVisibleBenefits(tier: UserTier) {
  const benefits = [...registeredBenefits];

  if (canAccess(tier, "paid")) {
    benefits.push(...paidBenefits);
  }

  if (canAccess(tier, "service")) {
    benefits.push(...serviceBenefits);
  }

  return benefits;
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
