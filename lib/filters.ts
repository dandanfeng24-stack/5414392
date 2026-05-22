import type { Project } from "./types";
import { getProjectCommercialTags, getProjectGrade, getProjectScenes } from "./project-utils";

export type ProjectFilters = {
  query?: string;
  themeId?: string;
  scene?: string;
  targetUser?: string;
  businessTag?: string;
  riskTag?: string;
  conversionGrade?: string;
};

export function filterProjects(projects: Project[], filters: ProjectFilters) {
  const query = filters.query?.trim().toLowerCase();

  return projects.filter((project) => {
    const text = [
      project.name,
      project.alias,
      project.theme,
      project.summary,
      project.positioning,
      project.region,
      project.province,
      project.city,
      ...project.targetUsers,
      ...getProjectScenes(project),
      ...getProjectCommercialTags(project),
      ...project.riskTags
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!query || text.includes(query)) &&
      (!filters.themeId || project.themeId === filters.themeId || project.theme === filters.themeId) &&
      (!filters.scene || getProjectScenes(project).includes(filters.scene) || project.scenes.includes(filters.scene)) &&
      (!filters.targetUser || project.targetUsers.includes(filters.targetUser)) &&
      (!filters.businessTag || getProjectCommercialTags(project).includes(filters.businessTag)) &&
      (!filters.riskTag || project.riskTags.includes(filters.riskTag)) &&
      (!filters.conversionGrade || getProjectGrade(project) === filters.conversionGrade)
    );
  });
}

export function uniqueValues(projects: Project[], picker: (project: Project) => string[]) {
  return Array.from(new Set(projects.flatMap(picker))).sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
}
