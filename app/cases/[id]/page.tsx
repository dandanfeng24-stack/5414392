import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagPill } from "@/components/ui/TagPill";
import { cases, getCaseStudy, projects } from "@/lib/data";

export function generateStaticParams() {
  return cases.map((caseStudy) => ({ id: caseStudy.id }));
}

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const caseStudy = getCaseStudy(id);
  if (!caseStudy) notFound();
  const relatedProjects = projects.filter((project) => caseStudy.relatedProjects.includes(project.id));

  return (
    <div className="section-shell py-16">
      <div className="surface rounded p-8">
        <div className="text-sm text-gold">{caseStudy.city} · {caseStudy.scene}</div>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-paper">{caseStudy.title}</h1>
        <div className="mt-6 flex flex-wrap gap-2">{caseStudy.targetUsers.map((item) => <TagPill key={item}>{item}</TagPill>)}</div>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <TextBlock title="产品化逻辑" text={caseStudy.transformationLogic} />
        <TextBlock title="可复制性" text={caseStudy.replicability} />
        <ListBlock title="成功因素" items={caseStudy.successFactors} />
        <ListBlock title="风险问题" items={caseStudy.risks} />
      </div>
      <section className="mt-16">
        <SectionHeading title="涉及非遗方向" />
        <div className="grid gap-5 md:grid-cols-3">{relatedProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </section>
      <section className="mt-16 surface rounded p-6">
        <h2 className="font-serif text-2xl text-paper">来源链</h2>
        <ul className="mt-5 space-y-2 text-sm leading-6 text-linen">{caseStudy.sourceLinks.map((source) => <li key={source}>· {source}</li>)}</ul>
      </section>
    </div>
  );
}

function TextBlock({ title, text }: { title: string; text: string }) {
  return <section className="surface rounded p-6"><h2 className="font-serif text-2xl text-paper">{title}</h2><p className="mt-4 text-sm leading-7 text-linen">{text}</p></section>;
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return <section className="surface rounded p-6"><h2 className="font-serif text-2xl text-paper">{title}</h2><ul className="mt-4 space-y-2 text-sm leading-6 text-linen">{items.map((item) => <li key={item}>· {item}</li>)}</ul></section>;
}
