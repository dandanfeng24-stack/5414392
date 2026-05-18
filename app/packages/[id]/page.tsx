import { notFound } from "next/navigation";
import { getPackageItem, packages, projects } from "@/lib/data";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagPill } from "@/components/ui/TagPill";

export function generateStaticParams() {
  return packages.map((item) => ({ id: item.id }));
}

export default async function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getPackageItem(id);
  if (!item) notFound();
  const relatedProjects = projects.filter((project) => item.relatedProjects.includes(project.id));

  return (
    <div className="section-shell py-16">
      <div className="surface rounded p-8">
        <div className="text-sm text-gold">{item.status} · {item.price}</div>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-paper">{item.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-linen">{item.subtitle}</p>
        <button className="mt-8 rounded bg-gold px-6 py-3 text-sm text-ink hover:bg-paper">{item.cta}</button>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <ListBlock title="适合谁" items={item.targetUsers} />
        <ListBlock title="解决什么问题" items={item.problemsSolved} />
        <ListBlock title="资料包目录" items={item.contents} />
      </div>
      <section className="mt-12 surface rounded p-6">
        <h2 className="font-serif text-2xl text-paper">样张预览区域</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {item.previewSections.map((section) => <div key={section} className="min-h-36 rounded border border-paper/10 bg-ink/55 p-4 text-sm text-linen">{section}</div>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">{item.relatedTags.map((tag) => <TagPill key={tag}>{tag}</TagPill>)}</div>
      </section>
      <section className="mt-16">
        <SectionHeading title="可直接使用的工具说明" description="首版提供样张、清单、评分表和模板入口，用于项目内部讨论、选品和课程设计。" />
        <div className="grid gap-5 md:grid-cols-3">{relatedProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </section>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return <section className="surface rounded p-6"><h2 className="font-serif text-2xl text-paper">{title}</h2><ul className="mt-4 space-y-2 text-sm leading-6 text-linen">{items.map((item) => <li key={item}>· {item}</li>)}</ul></section>;
}
