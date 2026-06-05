import Link from "next/link";
import { notFound } from "next/navigation";
import { AccessGate } from "@/components/access/AccessGate";
import { LockedContent } from "@/components/access/LockedContent";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagPill } from "@/components/ui/TagPill";
import { cases, getCaseStudy, projects } from "@/lib/data";
import type { CaseBudgetLevel } from "@/lib/types";

const fallbackImage = "/images/textures/dark-paper.png";

export function generateStaticParams() {
  return cases.map((caseStudy) => ({ id: caseStudy.id }));
}

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const caseStudy = getCaseStudy(id);
  if (!caseStudy) notFound();
  const relatedProjects = projects.filter((project) => caseStudy.relatedProjects.includes(project.id));
  const image = caseStudy.image || fallbackImage;

  return (
    <div className="section-shell py-16">
      <div className="surface rounded p-8">
        <div className="text-sm text-gold">{caseStudy.city} / {caseStudy.scene}</div>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-paper">{caseStudy.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-linen">{caseStudy.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">{caseStudy.targetUsers.map((item) => <TagPill key={item}>{item}</TagPill>)}</div>
        <div
          className="mt-8 aspect-[16/9] rounded border border-paper/10"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        />
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <TextBlock title="案例判断" text={caseStudy.transformationLogic} />
        <TextBlock title="场景背景" text={caseStudy.background} />
        <ListBlock title="项目组合" items={caseStudy.projectCombination} />
        <ListBlock title="商业模型" items={caseStudy.businessModel} />
      </div>

      <section className="surface mt-10 rounded border border-gold/20 p-6">
        <h2 className="font-serif text-2xl text-paper">研究型案例说明</h2>
        <p className="mt-4 text-sm leading-7 text-linen">{caseStudy.researchNote}</p>
      </section>

      <section className="mt-16">
        <SectionHeading title="涉及非遗方向" />
        <div className="grid gap-5 md:grid-cols-3">{relatedProjects.map((project) => <ProjectCard key={project.id} project={project} loginNextPath={`/cases/${id}`} />)}</div>
      </section>

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        <AccessGate
          requiredTier="registered"
          fallback={
            <LockedContent
              requiredTier="registered"
              title="登录后查看执行清单与复制步骤"
              description="注册用户可查看预算区间、落地步骤、运营清单、风险应对和复制建议，用于判断类似场景是否具备启动条件。"
              ctaLabel="登录 / 注册后查看"
              ctaHref={`/login?next=/cases/${id}`}
            />
          }
        >
          <BudgetBlock items={caseStudy.budgetLevels} />
        </AccessGate>
        <AccessGate
          requiredTier="registered"
          fallback={
            <LockedContent
              requiredTier="registered"
              title="登录后查看落地步骤"
              description="该部分用于拆解从项目选择、空间准备、产品设计到试运营复盘的执行顺序。"
              ctaLabel="登录 / 注册后查看"
              ctaHref={`/login?next=/cases/${id}`}
            />
          }
        >
          <ListBlock title="落地步骤" items={caseStudy.implementationPath} />
        </AccessGate>
        <AccessGate
          requiredTier="registered"
          fallback={
            <LockedContent
              requiredTier="registered"
              title="登录后查看运营检查清单"
              description="该部分用于提示人员、物料、空间、动线和销售转化中需要提前确认的关键事项。"
              ctaLabel="登录 / 注册后查看"
              ctaHref={`/login?next=/cases/${id}`}
            />
          }
        >
          <ListBlock title="运营清单" items={caseStudy.operationChecklist} />
        </AccessGate>
        <AccessGate
          requiredTier="registered"
          fallback={
            <LockedContent
              requiredTier="registered"
              title="登录后查看风险应对与复制建议"
              description="该部分用于判断同类项目复制时最容易失控的环节，以及适合复制的场地与机构类型。"
              ctaLabel="登录 / 注册后查看"
              ctaHref={`/login?next=/cases/${id}`}
            />
          }
        >
          <div className="grid gap-5">
            <ListBlock title="风险应对" items={caseStudy.riskMitigation} />
            <ListBlock title="复制建议" items={caseStudy.replicationAdvice} />
          </div>
        </AccessGate>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        <AccessGate
          requiredTier="paid"
          fallback={
            <LockedContent
              requiredTier="paid"
              title="升级后查看来源链与深度延展"
              description="来源链、详细测算假设、对标拆解和咨询转化入口属于付费用户内容。"
              ctaLabel="查看会员权益"
              ctaHref="/account/membership"
            />
          }
        >
          <section className="surface rounded p-6">
            <h2 className="font-serif text-2xl text-paper">付费延展</h2>
            <div className="mt-5 space-y-6 text-sm leading-7 text-linen">
              <div>
                <h3 className="text-base text-paper">来源链</h3>
                <ul className="mt-3 space-y-2">{caseStudy.sourceLinks.map((source) => <li key={source}>{source}</li>)}</ul>
              </div>
              <div>
                <h3 className="text-base text-paper">详细测算假设说明</h3>
                <p className="mt-3">预算与收益判断仅作为模型假设，需要结合场地面积、客流结构、人员排班、材料损耗、租金水平和运营能力重新测算。</p>
              </div>
              <div>
                <h3 className="text-base text-paper">对标拆解方向</h3>
                <p className="mt-3">后续可围绕同类场景的客群动线、产品价格带、体验时长、转化节点和风险控制方式做更细拆解。</p>
              </div>
            </div>
          </section>
        </AccessGate>
        <section className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">预约咨询定制类似项目方案</h2>
          <p className="mt-4 text-sm leading-7 text-linen">如果希望把类似案例应用到景区、街区、研学、酒店或品牌项目中，可以进入服务页了解咨询与交付方式。</p>
          <Link href="/services" className="mt-6 inline-flex rounded border border-gold/45 px-5 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-ink">
            查看服务与交付
          </Link>
        </section>
      </div>
    </div>
  );
}

function TextBlock({ title, text }: { title: string; text: string }) {
  return <section className="surface rounded p-6"><h2 className="font-serif text-2xl text-paper">{title}</h2><p className="mt-4 text-sm leading-7 text-linen">{text}</p></section>;
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return <section className="surface rounded p-6"><h2 className="font-serif text-2xl text-paper">{title}</h2><ul className="mt-4 space-y-2 text-sm leading-6 text-linen">{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}

function BudgetBlock({ items }: { items: CaseBudgetLevel[] }) {
  return (
    <section className="surface rounded p-6">
      <h2 className="font-serif text-2xl text-paper">成本与收益假设</h2>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <div key={item.name} className="rounded border border-paper/10 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base text-paper">{item.name}</h3>
              <span className="text-sm text-gold">{item.investmentRange}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-linen">{item.configuration}</p>
            <p className="mt-2 text-sm leading-7 text-paper/70">{item.revenueAssumption}</p>
            <p className="mt-2 text-xs leading-6 text-paper/50">{item.notes}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
