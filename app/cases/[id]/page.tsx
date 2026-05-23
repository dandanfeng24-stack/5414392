import Link from "next/link";
import { notFound } from "next/navigation";
import { AccessGate } from "@/components/access/AccessGate";
import { LockedContent } from "@/components/access/LockedContent";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagPill } from "@/components/ui/TagPill";
import { cases, getCaseStudy, projects } from "@/lib/data";

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
        <TextBlock title="产品化逻辑" text={caseStudy.transformationLogic} />
        <AccessGate
          requiredTier="registered"
          fallback={
            <LockedContent
              requiredTier="registered"
              title="登录后查看基础方法拆解"
              description="成功因素、基础方法拆解、风险问题摘要和相关资料包样张需要登录后查看。"
              ctaLabel="登录 / 注册后查看"
              ctaHref="/login"
            />
          }
        >
          <TextBlock title="可复制性" text={caseStudy.replicability} />
        </AccessGate>
        <AccessGate
          requiredTier="registered"
          fallback={
            <LockedContent
              requiredTier="registered"
              title="登录后查看成功因素"
              description="该部分用于理解案例成立的关键条件，以及复制到其它项目时需要优先保留的做法。"
              ctaLabel="登录 / 注册后查看"
              ctaHref="/login"
            />
          }
        >
          <ListBlock title="成功因素" items={caseStudy.successFactors} />
        </AccessGate>
        <AccessGate
          requiredTier="registered"
          fallback={
            <LockedContent
              requiredTier="registered"
              title="登录后查看风险问题摘要"
              description="该部分用于提示同类项目复制时可能遇到的运营、成本、客群和落地问题。"
              ctaLabel="登录 / 注册后查看"
              ctaHref="/login"
            />
          }
        >
          <ListBlock title="风险问题" items={caseStudy.risks} />
        </AccessGate>
      </div>

      <section className="mt-16">
        <SectionHeading title="涉及非遗方向" />
        <div className="grid gap-5 md:grid-cols-3">{relatedProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </section>

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        <AccessGate
          requiredTier="paid"
          fallback={
            <LockedContent
              requiredTier="paid"
              title="升级后查看来源链与深度拆解"
              description="来源链、可复制性、成本收益、执行步骤、深度案例拆解和模板下载属于付费用户内容。"
              ctaLabel="查看会员权益"
              ctaHref="/account/membership"
            />
          }
        >
          <section className="surface rounded p-6">
            <h2 className="font-serif text-2xl text-paper">来源链</h2>
            <ul className="mt-5 space-y-2 text-sm leading-6 text-linen">{caseStudy.sourceLinks.map((source) => <li key={source}>{source}</li>)}</ul>
          </section>
        </AccessGate>
        <section className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">预约咨询定制类似项目方案</h2>
          <p className="mt-4 text-sm leading-7 text-linen">如果希望把类似案例应用到景区、街区、研学或品牌项目中，可以进入服务页了解咨询与交付方式。</p>
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
