import Link from "next/link";
import type { Project } from "@/lib/types";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { TagPill } from "@/components/ui/TagPill";
import {
  getProjectCommercialTags,
  getProjectGrade,
  getProjectImage,
  getProjectJudgement,
  getProjectRegion,
  getProjectRisks,
  getProjectScenes,
  getProjectTitle,
  getProjectTotalScore
} from "@/lib/project-utils";

export function ProjectCard({ project }: { project: Project }) {
  const image = getProjectImage(project);
  const scenes = getProjectScenes(project);
  const commercialTags = getProjectCommercialTags(project);
  const risks = getProjectRisks(project);

  return (
    <article className="quiet-hover surface overflow-hidden rounded">
      <div
        className="aspect-[16/10] border-b border-paper/10"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      />
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl text-paper">{getProjectTitle(project)}</h3>
          <div className="shrink-0 text-right">
            <div className="text-lg text-gold">{getProjectTotalScore(project)}</div>
            <div className="text-xs text-paper/55">{getProjectGrade(project)}级</div>
          </div>
        </div>
        <p className="min-h-12 text-sm leading-6 text-linen">{getProjectJudgement(project)}</p>
        <div className="mt-4 grid gap-2 text-xs leading-5 text-paper/65">
          <div>最佳场景：<span className="text-paper/85">{scenes.slice(0, 2).join(" / ") || "待核验"}</span></div>
          <div>主要客群：<span className="text-paper/85">{project.targetUsers.slice(0, 2).join(" / ") || "待核验"}</span></div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {commercialTags.slice(0, 3).map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {risks.slice(0, 2).map((tag) => (
            <RiskBadge key={tag}>{tag}</RiskBadge>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-paper/10 pt-4 text-sm">
          <span className="text-paper/60">{getProjectRegion(project)}</span>
          <Link href={`/projects/${project.id}`} className="text-gold hover:text-paper">
            查看研究档案
          </Link>
        </div>
      </div>
    </article>
  );
}
