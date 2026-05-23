import Link from "next/link";
import { AccessGate } from "@/components/access/AccessGate";
import { UpgradeCTA } from "@/components/access/UpgradeCTA";
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
  getProjectExperienceCount,
  getProjectRevenueCount,
  getProjectSkuCount,
  getProjectTitle,
  getProjectTotalScore,
  getProjectUniqueValue,
  getProjectVerificationStatus
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
          <div>地区：<span className="text-paper/85">{getProjectRegion(project)}</span></div>
          <div>类别：<span className="text-paper/85">{project.subCategory || project.category || project.officialCategory || "待核验"}</span></div>
          <div>保护级别：<span className="text-paper/85">{project.level || project.heritageLevel || "待核验"}</span></div>
          <div>最佳场景：<span className="text-paper/85">{scenes.slice(0, 2).join(" / ") || "待核验"}</span></div>
          <div>主要客群：<span className="text-paper/85">{project.targetUsers.slice(0, 2).join(" / ") || "待核验"}</span></div>
          <div>官方信息：<span className="text-paper/85">{getProjectVerificationStatus(project)}</span></div>
        </div>
        <AccessGate
          requiredTier="registered"
          fallback={
            <div className="mt-4 rounded border border-gold/20 bg-gold/[0.05] p-3 text-xs leading-5 text-linen">
              <div className="text-gold">登录后查看完整评分理由</div>
              <p className="mt-1 text-paper/62">公开市场证据摘要、主要短板和收藏入口将在登录后开放。</p>
              <div className="mt-3">
                <UpgradeCTA label="登录后查看" href="/login" variant="secondary" />
              </div>
            </div>
          }
        >
          <p className="mt-3 text-xs leading-5 text-paper/60">{getProjectUniqueValue(project)}</p>
        </AccessGate>
        <AccessGate
          requiredTier="paid"
          fallback={
            <div className="mt-3 rounded border border-paper/10 bg-ink/35 p-3 text-xs leading-5 text-paper/62">
              <div className="text-gold">升级后查看产品与体验方案</div>
              <p className="mt-1">产品建议、体验模型、收益路径和项目对比功能将在会员层级开放。</p>
            </div>
          }
        >
          <div className="mt-4 text-xs leading-5 text-paper/65">
            建议内容：<span className="text-paper/85">{getProjectSkuCount(project)} 类产品建议 · {getProjectExperienceCount(project)} 个体验模型 · {getProjectRevenueCount(project)} 种收益路径</span>
          </div>
        </AccessGate>
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
          <span className="text-paper/60">{risks.slice(0, 1).join(" / ") || "风险待核验"}</span>
          <Link href={`/projects/${project.id}`} className="text-gold hover:text-paper">
            查看研究档案
          </Link>
        </div>
      </div>
    </article>
  );
}
