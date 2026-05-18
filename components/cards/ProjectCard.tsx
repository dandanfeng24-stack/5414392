import Link from "next/link";
import type { Project } from "@/lib/types";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { TagPill } from "@/components/ui/TagPill";

const fallbackImage = "/images/textures/dark-paper.png";

export function ProjectCard({ project }: { project: Project }) {
  const image = project.image || fallbackImage;

  return (
    <article className="quiet-hover surface overflow-hidden rounded">
      <div
        className="h-40 border-b border-paper/10"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(11,10,8,.08), rgba(11,10,8,.74)), url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      />
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl text-paper">{project.name}</h3>
          <span className="shrink-0 text-lg text-gold">{project.totalScore}</span>
        </div>
        <p className="min-h-12 text-sm leading-6 text-linen">{project.positioning}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[...project.targetUsers, ...project.businessTags].slice(0, 4).map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.riskTags.slice(0, 2).map((tag) => (
            <RiskBadge key={tag}>{tag}</RiskBadge>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-paper/10 pt-4 text-sm">
          <span className="text-paper/60">{project.region}</span>
          <Link href={`/projects/${project.id}`} className="text-gold hover:text-paper">
            查看研究档案
          </Link>
        </div>
      </div>
    </article>
  );
}
