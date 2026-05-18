import Link from "next/link";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/lib/types";

export function DatabaseEntrySection({ projects }: { projects: Project[] }) {
  return (
    <section className="border-y border-paper/10 bg-charcoal/30 py-20">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            title="非遗产品化数据库"
            description="按场景、客群、商业属性与风险筛选适合产品化和文旅转化的非遗方向。"
          />
          <Link href="/database" className="mb-8 rounded bg-gold px-6 py-3 text-sm text-ink hover:bg-paper">进入数据库</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {projects.slice(0, 3).map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  );
}
