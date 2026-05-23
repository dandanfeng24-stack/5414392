import { CaseCard } from "@/components/cards/CaseCard";
import { AccessGate } from "@/components/access/AccessGate";
import { LockedContent } from "@/components/access/LockedContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cases } from "@/lib/data";

export default function CasesPage() {
  return (
    <div className="section-shell py-16">
      <SectionHeading title="案例研究" description="从城市、场景、客群、转化逻辑和可复制性观察非遗项目落地。" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cases.map((caseStudy) => <CaseCard key={caseStudy.id} caseStudy={caseStudy} />)}
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <AccessGate
          requiredTier="registered"
          fallback={
            <LockedContent
              requiredTier="registered"
              title="登录后查看案例方法拆解"
              description="游客可浏览案例基础信息；成功因素、基础方法拆解、风险问题摘要和相关资料包样张需要登录后查看。"
              ctaLabel="登录 / 注册后查看"
              ctaHref="/login"
            />
          }
        >
          <section className="surface rounded p-6">
            <h2 className="font-serif text-2xl text-paper">案例方法拆解</h2>
            <p className="mt-4 text-sm leading-7 text-linen">登录后可查看案例成功因素、基础方法拆解和风险问题摘要。</p>
          </section>
        </AccessGate>
        <AccessGate
          requiredTier="paid"
          fallback={
            <LockedContent
              requiredTier="paid"
              title="升级后查看深度案例拆解"
              description="来源链、可复制性、成本收益、执行步骤、深度案例拆解和模板下载属于付费用户内容。"
              ctaLabel="查看会员权益"
              ctaHref="/account/membership"
            />
          }
        >
          <section className="surface rounded p-6">
            <h2 className="font-serif text-2xl text-paper">深度案例拆解</h2>
            <p className="mt-4 text-sm leading-7 text-linen">付费用户可查看来源链、可复制性、执行步骤和模板下载。</p>
          </section>
        </AccessGate>
      </div>
    </div>
  );
}
