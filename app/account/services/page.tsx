import Link from "next/link";
import { AccountSubPage } from "../shared";

const diagnosisFitItems = [
  "已有非遗资源，但不知道如何产品化。",
  "景区或街区想引入非遗体验。",
  "文创品牌想寻找非遗联名方向。",
  "研学机构需要课程化结构。",
  "地方项目需要汇报、筛选或立项判断依据。"
];

const nextStepEntries = [
  ["查看项目库参考", "/database", "先参考不同非遗方向的评分、场景和风险提示。"],
  ["完成智能初评", "/ai-assessment", "用规则模型快速判断项目大致适配方向。"],
  ["提交项目诊断", "/diagnosis?from=account-services", "填写真实项目资料，进入后续人工沟通准备。"]
];

export default function AccountServicesPage() {
  return (
    <AccountSubPage
      currentPath="/account/services"
      eyebrow="诊断与服务记录"
      title="诊断与服务记录"
      description="你还没有诊断或服务记录。提交项目诊断需求后，后续可在这里查看相关进度。当前第一版暂未保存真实诊断或服务记录。"
      action={{ label: "提交项目诊断", href: "/diagnosis?from=account-services" }}
      cards={[
        ["暂无诊断记录", "当前不会制造假诊断记录，也不会接入后台、CRM 或邮件通知。"],
        ["可先提交需求", "进入项目诊断页填写项目情况，用于后续人工沟通和初步判断。"],
        ["后续扩展方向", "未来如接入真实记录能力，再在这里展示与账号相关的诊断、沟通和交付记录。"]
      ]}
    >
      <section className="mt-12">
        <div className="mb-5">
          <div className="text-sm text-gold">适合提交诊断的情况</div>
          <h2 className="mt-2 font-serif text-3xl text-paper">哪些项目适合先做一次判断</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {diagnosisFitItems.map((item) => (
            <article key={item} className="surface rounded p-5">
              <p className="text-sm leading-7 text-linen">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5">
          <div className="text-sm text-gold">提交前可以先做什么</div>
          <h2 className="mt-2 font-serif text-3xl text-paper">从公开内容进入项目判断</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {nextStepEntries.map(([title, href, description]) => (
            <Link key={href} href={href} className="surface rounded p-6 transition-colors hover:border-gold/45">
              <h3 className="font-serif text-2xl text-paper">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-linen">{description}</p>
              <div className="mt-5 text-sm text-gold">前往</div>
            </Link>
          ))}
        </div>
      </section>
    </AccountSubPage>
  );
}
