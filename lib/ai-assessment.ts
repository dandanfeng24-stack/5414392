"use client";

import { aiRules, cases, packages, projects, themes } from "./data";
import type { AiAssessmentInput, AiAssessmentResult } from "./types";

export function assessProject(input: AiAssessmentInput): AiAssessmentResult {
  const text = Object.values(input).join(" ");
  const matchedRule = aiRules.matchingRules.find((rule) =>
    Object.entries(rule.when).every(([key, value]) =>
      String(input[key as keyof AiAssessmentInput] ?? "").includes(value)
    )
  );

  const keywordRisks = aiRules.riskRules
    .filter((rule) => text.includes(rule.keyword))
    .map((rule) => rule.risk);

  const recommendedThemes = matchedRule?.recommendThemes ?? ["craft-study", "tea-life"];
  const recommendedProjects = projects
    .filter((project) => recommendedThemes.includes(project.themeId) || matchedRule?.recommendProjects.includes(project.id))
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 4);

  const recommendedCases = cases
    .filter((caseStudy) => caseStudy.relatedProjects.some((id) => recommendedProjects.some((project) => project.id === id)))
    .slice(0, 2);

  const recommendedPackages = packages
    .filter((item) => item.relatedTags.some((tag) => text.includes(tag)) || recommendedProjects.some((project) => item.relatedProjects.includes(project.id)))
    .slice(0, 2);

  const avgScore = Math.round(
    recommendedProjects.reduce((sum, item) => sum + item.totalScore, 0) / Math.max(recommendedProjects.length, 1)
  );

  return {
    conclusion: avgScore >= 82 ? "适配度较高，适合进入小规模验证。" : "适配度中等，建议先做轻量内容和样板体验。",
    score: avgScore,
    recommendedThemes: recommendedThemes.map((id) => themes.find((theme) => theme.id === id)?.name ?? id),
    recommendedProjects,
    risks: Array.from(new Set([...(matchedRule?.risks ?? []), ...keywordRisks])).slice(0, 4),
    sceneSuggestions: Array.from(new Set(recommendedProjects.flatMap((project) => project.suitableScenes))).slice(0, 5),
    recommendedCases,
    recommendedPackages
  };
}
