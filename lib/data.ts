import aiRulesJson from "@/data/ai-rules.json";
import casesJson from "@/data/cases.json";
import packagesJson from "@/data/packages.json";
import projectsJson from "@/data/projects.json";
import rankingsJson from "@/data/rankings.json";
import tagsJson from "@/data/tags.json";
import themesJson from "@/data/themes.json";
import type { AiRules, CaseStudy, PackageItem, Project, Ranking, Tag, Theme } from "./types";

export const themes = themesJson as Theme[];
export const projects = projectsJson as Project[];
export const cases = casesJson as CaseStudy[];
export const rankings = rankingsJson as Ranking[];
export const tags = tagsJson as Tag[];
export const packages = packagesJson as PackageItem[];
export const aiRules = aiRulesJson as unknown as AiRules;

export function getTheme(id: string) {
  return themes.find((theme) => theme.id === id);
}

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

export function getCaseStudy(id: string) {
  return cases.find((item) => item.id === id);
}

export function getPackageItem(id: string) {
  return packages.find((item) => item.id === id);
}

export function getProjectsByTheme(themeId: string) {
  return projects.filter((project) => project.themeId === themeId);
}

export function getCasesForProject(projectId: string) {
  return cases.filter((item) => item.relatedProjects.includes(projectId));
}
