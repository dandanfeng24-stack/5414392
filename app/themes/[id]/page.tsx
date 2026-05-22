import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/cards/CaseCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagPill } from "@/components/ui/TagPill";
import { cases, getProjectsByTheme, getTheme, packages, themes } from "@/lib/data";

export function generateStaticParams() {
  return themes.map((theme) => ({ id: theme.id }));
}

export default async function ThemePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const theme = getTheme(id);
  if (!theme) notFound();
  const relatedProjects = getProjectsByTheme(theme.id);
  const relatedCases = cases.filter((item) => item.relatedProjects.some((id) => relatedProjects.some((project) => project.id === id)));

  return (
    <div className="section-shell py-16">
      <div className="surface rounded p-8" style={{ background: `linear-gradient(135deg, ${theme.color}33, rgba(26,23,18,.36))` }}>
        <div className="text-sm text-gold">非遗主题</div>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-paper">{theme.name}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-linen">{theme.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">{theme.tags.map((tag) => <TagPill key={tag}>{tag}</TagPill>)}</div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <InfoBlock title="产品化方向" items={Array.from(new Set(relatedProjects.flatMap((project) => project.productDirections))).slice(0, 8)} />
        <InfoBlock title="适合客群" items={Array.from(new Set(relatedProjects.flatMap((project) => project.targetUsers))).slice(0, 8)} />
        <InfoBlock title="适合场景" items={Array.from(new Set(relatedProjects.flatMap((project) => project.suitableScenes))).slice(0, 8)} />
      </div>

      <section className="mt-16">
        <SectionHeading title="代表项目卡片" />
        <div className="grid gap-5 md:grid-cols-3">{relatedProjects.slice(0, 6).map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-[0.75fr_1fr]">
        <div className="surface rounded p-6">
          <h2 className="font-serif text-2xl text-paper">风险提示</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {Array.from(new Set(relatedProjects.flatMap((project) => project.riskTags))).map((risk) => <RiskBadge key={risk}>{risk}</RiskBadge>)}
          </div>
        </div>
        <div>
          <SectionHeading title="相关案例" />
          <div className="grid gap-5 md:grid-cols-2">{relatedCases.slice(0, 2).map((caseStudy) => <CaseCard key={caseStudy.id} caseStudy={caseStudy} />)}</div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading title="相关资料包入口" />
        <div className="grid gap-5 md:grid-cols-3">{packages.slice(0, 3).map((item) => <PackageCard key={item.id} item={item} />)}</div>
        <Link href="/ai-assessment" className="mt-8 inline-flex rounded bg-gold px-6 py-3 text-sm text-ink hover:bg-paper">用智能初评当前主题</Link>
      </section>
    </div>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="surface rounded p-6">
      <h2 className="font-serif text-2xl text-paper">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-linen">{items.map((item) => <li key={item}>· {item}</li>)}</ul>
    </div>
  );
}
