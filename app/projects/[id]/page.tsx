import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/cards/CaseCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagPill } from "@/components/ui/TagPill";
import { cases, getProject, getTheme, packages, projects } from "@/lib/data";
import {
  getProjectContentStatus,
  getProjectGrade,
  getProjectImage,
  getProjectRelatedCases,
  getProjectRelatedPackages,
  getProjectScore,
  getProjectTotalScore
} from "@/lib/project-utils";

const fallbackImage = "/images/textures/dark-paper.png";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();
  const theme = getTheme(project.themeId);
  const relatedCases = cases.filter((item) => getProjectRelatedCases(project).includes(item.id));
  const relatedPackages = packages.filter((item) => getProjectRelatedPackages(project, packages).includes(item.id));
  const image = getProjectImage(project) || fallbackImage;
  const score = getProjectScore(project);
  const scoreEntries = [
    ["商品化", score.commercialization, project.scoreDetails?.commercialization],
    ["体验化", score.experience, project.scoreDetails?.experience],
    ["场景适配", score.sceneFit, project.scoreDetails?.sceneFit],
    ["传播潜力", score.spread, project.scoreDetails?.spread],
    ["礼品属性", score.gift, project.scoreDetails?.gift],
    ["运营友好", score.operation, project.scoreDetails?.operation]
  ] as const;

  return (
    <div className="section-shell py-16">
      <div className="surface rounded p-8">
        <div className="text-sm text-gold">项目研究档案 · {project.theme || theme?.shortName}</div>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-paper">{project.name}</h1>
        <p className="mt-5 max-w-3xl text-xl leading-9 text-linen">{project.positioning}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {[project.region, project.level || project.heritageLevel, project.officialCategory || project.type, ...(project.commercialTags || project.businessTags)].slice(0, 7).map((tag) => <TagPill key={tag}>{tag}</TagPill>)}
        </div>
        <div
          className="mt-8 aspect-[21/9] rounded border border-paper/10"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        />
      </div>

      <section className="mt-8 grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
        <div className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">转化等级与总体判断</h2>
          <div className="mt-5 flex items-end gap-5">
            <div className="text-5xl font-serif text-gold">{getProjectGrade(project)}</div>
            <div>
              <div className="text-sm text-paper/60">综合分</div>
              <div className="text-2xl text-paper">{getProjectTotalScore(project)}</div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-linen">{project.scoreReason || project.scoreExplanation}</p>
        </div>
        <div className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">官方事实与内容状态</h2>
          <dl className="mt-5 space-y-3 text-sm text-linen">
            <Row label="官方门类" value={project.officialCategory || "待核验"} />
            <Row label="保护单位" value={project.protectionUnit || "待核验"} />
            <Row label="非遗编号" value={project.heritageCode || "待核验"} />
            <Row label="内容状态" value={getProjectContentStatus(project)} />
          </dl>
        </div>
      </section>

      <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">基础信息</h2>
          <dl className="mt-5 space-y-3 text-sm text-linen">
            <Row label="别名" value={project.alias} />
            <Row label="地区" value={project.region} />
            <Row label="类别" value={project.subCategory || project.category} />
            <Row label="级别" value={project.level || project.heritageLevel} />
            <Row label="可信度" value={project.confidence} />
          </dl>
        </section>
        <section className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">六维评分</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {scoreEntries.map(([label, value]) => <ScoreBar key={label} label={label} value={value} />)}
          </div>
          <p className="mt-5 text-sm leading-7 text-linen">{project.scoreExplanation}</p>
        </section>
      </div>

      <section className="mt-12 surface rounded p-6">
        <h2 className="font-serif text-2xl text-paper">六维评分详细理由</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {scoreEntries.map(([label, value, reason]) => (
            <div key={label} className="rounded border border-paper/10 bg-ink/35 p-4">
              <div className="mb-2 flex justify-between text-sm text-paper"><span>{label}</span><span className="text-gold">{value}</span></div>
              <p className="text-sm leading-6 text-linen">{reason || "该维度需后续人工补充详细说明。"}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <ListBlock title="产品化路径" items={project.productDirections} />
        <ListBlock title="体验化路径" items={project.experienceDirections} />
        <ListBlock title="课程化路径" items={project.courseDirections} />
        <ListBlock title="礼品化路径" items={project.giftDirections} />
      </div>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <ListBlock title="最佳场景" items={project.bestScenes || project.suitableScenes} />
        <ListBlock title="可尝试场景" items={project.secondaryScenes || project.scenes} />
        <ListBlock title="慎用场景" items={project.avoidScenes || project.unsuitableScenes} />
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        <ListBlock title="价格带建议" items={project.priceBands || []} />
        <ListBlock title="销售渠道" items={project.salesChannels || []} />
        <div className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">运营条件</h2>
          <dl className="mt-5 space-y-3 text-sm text-linen">
            <Row label="供应难度" value={project.supplyDifficulty || "待核验"} />
            <Row label="标准化" value={project.standardization || "待补充"} />
          </dl>
          <p className="mt-5 text-sm leading-7 text-linen">{project.operationNotes}</p>
        </div>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
        <div className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">风险分析</h2>
          <div className="mt-3 text-sm text-gold">风险等级：{project.riskLevel || "待核验"}</div>
          <div className="mt-4 flex flex-wrap gap-2">{project.riskTags.map((risk) => <RiskBadge key={risk}>{risk}</RiskBadge>)}</div>
          <p className="mt-5 text-sm leading-7 text-linen">{project.riskExplanation}</p>
        </div>
        <ListBlock title="规避建议" items={project.riskControl || project.risks} />
      </section>

      <section className="mt-16">
        <SectionHeading title="案例参考" />
        <div className="grid gap-5 md:grid-cols-2">{relatedCases.map((item) => <CaseCard key={item.id} caseStudy={item} />)}</div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-[1fr_1fr]">
        <div className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">来源链</h2>
          <ul className="mt-5 space-y-2 text-sm leading-6 text-linen">{[...(project.sources || []), ...(project.sourceLinks || [])].map((source) => <li key={source}>· {source}</li>)}</ul>
          <p className="mt-5 text-sm leading-7 text-paper/60">{project.sourceNotes}</p>
        </div>
        <div>
          <SectionHeading title="相关资料包或AI初评入口" />
          <div className="grid gap-5">{(relatedPackages.length ? relatedPackages : packages.slice(0, 1)).map((item) => <PackageCard key={item.id} item={item} />)}</div>
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
