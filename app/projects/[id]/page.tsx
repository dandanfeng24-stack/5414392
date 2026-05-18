import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/cards/CaseCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagPill } from "@/components/ui/TagPill";
import { getCasesForProject, getProject, getTheme, packages, projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();
  const theme = getTheme(project.themeId);
  const relatedCases = getCasesForProject(project.id);

  return (
    <div className="section-shell py-16">
      <div className="surface rounded p-8">
        <div className="text-sm text-gold">项目研究档案 · {theme?.shortName}</div>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-paper">{project.name}</h1>
        <p className="mt-5 max-w-3xl text-xl leading-9 text-linen">{project.positioning}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {[project.region, project.heritageLevel, project.type, ...project.businessTags].slice(0, 7).map((tag) => <TagPill key={tag}>{tag}</TagPill>)}
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">基础信息</h2>
          <dl className="mt-5 space-y-3 text-sm text-linen">
            <Row label="别名" value={project.alias} />
            <Row label="地区" value={project.region} />
            <Row label="类别" value={project.category} />
            <Row label="级别" value={project.heritageLevel} />
            <Row label="内容状态" value={`${project.reviewStatus} · 可信度${project.confidence}`} />
          </dl>
        </section>
        <section className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">六维评分</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ScoreBar label="商品化" value={project.scores.commodity} />
            <ScoreBar label="体验化" value={project.scores.experience} />
            <ScoreBar label="场景适配" value={project.scores.scenario} />
            <ScoreBar label="传播潜力" value={project.scores.spread} />
            <ScoreBar label="礼品属性" value={project.scores.gift} />
            <ScoreBar label="运营友好" value={project.scores.operation} />
          </div>
          <p className="mt-5 text-sm leading-7 text-linen">{project.scoreExplanation}</p>
        </section>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <ListBlock title="产品化方向" items={project.productDirections} />
        <ListBlock title="体验化方向" items={project.experienceDirections} />
        <ListBlock title="课程化方向" items={project.courseDirections} />
        <ListBlock title="礼品化方向" items={project.giftDirections} />
      </div>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <ListBlock title="场景适配" items={project.suitableScenes} />
        <ListBlock title="不适合场景" items={project.unsuitableScenes} />
        <div className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">风险分析</h2>
          <div className="mt-4 flex flex-wrap gap-2">{project.riskTags.map((risk) => <RiskBadge key={risk}>{risk}</RiskBadge>)}</div>
          <ul className="mt-5 space-y-2 text-sm leading-6 text-linen">{project.risks.map((risk) => <li key={risk}>· {risk}</li>)}</ul>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading title="案例参考" />
        <div className="grid gap-5 md:grid-cols-2">{relatedCases.map((item) => <CaseCard key={item.id} caseStudy={item} />)}</div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-[1fr_1fr]">
        <div className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">来源链</h2>
          <ul className="mt-5 space-y-2 text-sm leading-6 text-linen">{project.sources.map((source) => <li key={source}>· {source}</li>)}</ul>
        </div>
        <div>
          <SectionHeading title="相关资料包或AI初评入口" />
          <div className="grid gap-5">{packages.slice(0, 1).map((item) => <PackageCard key={item.id} item={item} />)}</div>
          <Link href="/ai-assessment" className="mt-5 inline-flex rounded bg-gold px-6 py-3 text-sm text-ink hover:bg-paper">发起项目初评</Link>
        </div>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-6 border-b border-paper/10 pb-3"><dt className="text-paper/55">{label}</dt><dd className="text-right text-paper">{value}</dd></div>;
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="surface rounded p-6">
      <h2 className="font-serif text-2xl text-paper">{title}</h2>
      <ul className="mt-5 space-y-2 text-sm leading-6 text-linen">{items.map((item) => <li key={item}>· {item}</li>)}</ul>
    </section>
  );
}
