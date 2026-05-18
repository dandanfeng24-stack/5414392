import type { Project } from "./types";

export type ProjectFilters = {
  query?: string;
  themeId?: string;
  scene?: string;
  targetUser?: string;
  businessTag?: string;
  riskTag?: string;
};

export function filterProjects(projects: Project[], filters: ProjectFilters) {
  const query = filters.query?.trim().toLowerCase();

  return projects.filter((project) => {
    const text = [
      project.name,
      project.alias,
      project.summary,
      project.positioning,
      project.region,
      ...project.targetUsers,
      ...project.scenes,
      ...project.businessTags,
      ...project.riskTags
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!query || text.includes(query)) &&
      (!filters.themeId || project.themeId === filters.themeId) &&
      (!filters.scene || project.scenes.includes(filters.scene)) &&
      (!filters.targetUser || project.targetUsers.includes(filters.targetUser)) &&
      (!filters.businessTag || project.businessTags.includes(filters.businessTag)) &&
      (!filters.riskTag || project.riskTags.includes(filters.riskTag))
    );
  });
}

export function uniqueValues(projects: Project[], picker: (project: Project) => string[]) {
  return Array.from(new Set(projects.flatMap(picker))).sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
}
