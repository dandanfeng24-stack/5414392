"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { FilterGroup } from "@/components/ui/FilterGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { filterProjects, uniqueValues } from "@/lib/filters";
import type { Project, Theme } from "@/lib/types";

export function DatabaseClient({ projects, themes }: { projects: Project[]; themes: Theme[] }) {
  const [query, setQuery] = useState("");
  const [themeId, setThemeId] = useState("");
  const [scene, setScene] = useState("");
  const [targetUser, setTargetUser] = useState("");
  const [businessTag, setBusinessTag] = useState("");
  const [riskTag, setRiskTag] = useState("");

  const result = useMemo(
    () => filterProjects(projects, { query, themeId, scene, targetUser, businessTag, riskTag }),
    [projects, query, themeId, scene, targetUser, businessTag, riskTag]
  );

  return (
    <div className="section-shell py-16">
      <SectionHeading
        title="非遗产品化数据库"
        description="按场景、客群、商业属性与风险筛选适合产品化和文旅转化的非遗方向。"
      />
      <div className="surface mb-8 rounded p-5">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索项目、地区、场景、标签"
          className="mb-5 w-full rounded border border-paper/15 bg-ink px-4 py-4 text-paper outline-none focus:border-gold"
        />
        <div className="grid gap-4 md:grid-cols-5">
          <FilterGroup label="主题" value={themeId} onChange={setThemeId} options={themes.map((theme) => ({ label: theme.shortName, value: theme.id }))} />
          <FilterGroup label="场景" value={scene} onChange={setScene} options={uniqueValues(projects, (project) => project.scenes).map((value) => ({ label: value, value }))} />
          <FilterGroup label="客群" value={targetUser} onChange={setTargetUser} options={uniqueValues(projects, (project) => project.targetUsers).map((value) => ({ label: value, value }))} />
          <FilterGroup label="商业属性" value={businessTag} onChange={setBusinessTag} options={uniqueValues(projects, (project) => project.businessTags).map((value) => ({ label: value, value }))} />
          <FilterGroup label="风险" value={riskTag} onChange={setRiskTag} options={uniqueValues(projects, (project) => project.riskTags).map((value) => ({ label: value, value }))} />
        </div>
      </div>
      <div className="mb-5 text-sm text-linen">共筛选出 <span className="text-gold">{result.length}</span> 个方向</div>
      {result.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {result.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      ) : (
        <EmptyState title="没有找到匹配的项目方向，请调整筛选条件。" />
      )}
    </div>
  );
}
