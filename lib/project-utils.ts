import type { PackageItem, Project, ProjectResearchScore } from "./types";

export const projectFallbackImage = "/images/textures/dark-paper.png";

export function getProjectTitle(project: Project) {
  return project.name;
}

export function getProjectRegion(project: Project) {
  return project.region || [project.province, project.city].filter(Boolean).join("") || "待核验";
}

export function getProjectScore(project: Project): ProjectResearchScore {
  if (project.score) return project.score;
  return {
    commercialization: project.scores?.commodity ?? 0,
    experience: project.scores?.experience ?? 0,
    sceneFit: project.scores?.scenario ?? 0,
    spread: project.scores?.spread ?? 0,
    gift: project.scores?.gift ?? 0,
    operation: project.scores?.operation ?? 0,
    total: project.totalScore ?? 0
  };
}

export function getProjectTotalScore(project: Project) {
  return getProjectScore(project).total;
}

export function getProjectGrade(project: Project) {
  if (project.conversionGrade) return project.conversionGrade;
  const total = getProjectTotalScore(project);
  if (total >= 82) return "A";
  if (total >= 74) return "B";
  if (total >= 65) return "C";
  return "D";
}

export function getProjectImage(project: Project) {
  return project.image || projectFallbackImage;
}

export function getProjectRisks(project: Project) {
  return project.riskTags?.length ? project.riskTags : project.risks?.slice(0, 2) ?? [];
}

export function getProjectScenes(project: Project) {
  return project.bestScenes?.length ? project.bestScenes : project.suitableScenes?.length ? project.suitableScenes : project.scenes ?? [];
}

export function getProjectCommercialTags(project: Project) {
  return project.commercialTags?.length ? project.commercialTags : project.businessTags ?? [];
}

export function getProjectRelatedCases(project: Project) {
  return project.relatedCases?.length ? project.relatedCases : project.cases ?? [];
}

export function getProjectRelatedPackages(project: Project, packages: PackageItem[] = []) {
  if (project.relatedPackages?.length) return project.relatedPackages;
  return packages.filter((item) => item.relatedProjects.includes(project.id)).map((item) => item.id);
}

export function getProjectJudgement(project: Project) {
  return project.positioning || project.summary;
}

export function getProjectContentStatus(project: Project) {
  return [project.contentStatus || project.reviewStatus, project.contentStatusNote].filter(Boolean).join(" · ");
}

export function getProjectUniqueValue(project: Project) {
  return project.uniqueValue || project.summary || project.positioning || "该项目的独特价值需结合材料、工艺和落地场景继续补充。";
}

export function getProjectSkuCount(project: Project) {
  return project.recommendedSkus?.length ?? 0;
}

export function getProjectExperienceCount(project: Project) {
  return project.recommendedExperiences?.length ?? 0;
}

export function getProjectRevenueCount(project: Project) {
  return project.revenueModels?.length ?? 0;
}

export function getProjectVerificationStatus(project: Project) {
  return project.officialVerification?.status || "待核验";
}
