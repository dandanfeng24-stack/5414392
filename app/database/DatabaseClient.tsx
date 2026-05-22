"use client";

import { useEffect, useMemo, useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { FilterGroup } from "@/components/ui/FilterGroup";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { filterProjects, uniqueValues } from "@/lib/filters";
import { getProjectCommercialTags, getProjectScenes, getProjectScore, getProjectTotalScore } from "@/lib/project-utils";
import type { Project, Theme } from "@/lib/types";

const pageSize = 24;

export function DatabaseClient({ projects, themes }: { projects: Project[]; themes: Theme[] }) {
  const [query, setQuery] = useState("");
  const [themeId, setThemeId] = useState("");
  const [scene, setScene] = useState("");
  const [targetUser, setTargetUser] = useState("");
  const [businessTag, setBusinessTag] = useState("");
  const [riskTag, setRiskTag] = useState("");
  const [conversionGrade, setConversionGrade] = useState("");
  const [sortBy, setSortBy] = useState("total");
  const [page, setPage] = useState(1);

  const themeOptions = useMemo(() => uniqueValues(projects, (project) => [project.theme || project.themeId]).map((value) => ({ label: value, value })), [projects]);

  const result = useMemo(() => {
    const filtered = filterProjects(projects, { query, themeId, scene, targetUser, businessTag, riskTag, conversionGrade });
    return [...filtered].sort((a, b) => {
      const scoreA = getProjectScore(a);
      const scoreB = getProjectScore(b);
      if (sortBy === "commercialization") return scoreB.commercialization - scoreA.commercialization;
      if (sortBy === "experience") return scoreB.experience - scoreA.experience;
      if (sortBy === "operation") return scoreB.operation - scoreA.operation;
      return getProjectTotalScore(b) - getProjectTotalScore(a);
    });
  }, [projects, query, themeId, scene, targetUser, businessTag, riskTag, conversionGrade, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [query, themeId, scene, targetUser, businessTag, riskTag, conversionGrade, sortBy]);

  const pageCount = Math.max(1, Math.ceil(result.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedResult = result.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-7">
          <FilterGroup label="主题" value={themeId} onChange={setThemeId} options={themeOptions} />
          <FilterGroup label="场景" value={scene} onChange={setScene} options={uniqueValues(projects, getProjectScenes).map((value) => ({ label: value, value }))} />
          <FilterGroup label="客群" value={targetUser} onChange={setTargetUser} options={uniqueValues(projects, (project) => project.targetUsers).map((value) => ({ label: value, value }))} />
          <FilterGroup label="商业属性" value={businessTag} onChange={setBusinessTag} options={uniqueValues(projects, getProjectCommercialTags).map((value) => ({ label: value, value }))} />
          <FilterGroup label="风险" value={riskTag} onChange={setRiskTag} options={uniqueValues(projects, (project) => project.riskTags).map((value) => ({ label: value, value }))} />
          <FilterGroup label="转化等级" value={conversionGrade} onChange={setConversionGrade} options={["A", "B", "C", "D"].map((value) => ({ label: `${value}级`, value }))} />
          <FilterGroup
            label="排序"
            value={sortBy}
            onChange={setSortBy}
            options={[
              { label: "综合分", value: "total" },
              { label: "商品化", value: "commercialization" },
              { label: "体验化", value: "experience" },
              { label: "运营友好", value: "operation" }
            ]}
          />
        </div>
        <p className="mt-5 rounded border border-gold/20 bg-gold/[0.05] p-4 text-xs leading-6 text-paper/68">
          本数据库为《非遗造物》围绕非遗产品化、体验化、课程化、礼品化与文旅场景适配建立的研究型数据库。部分内容为平台研究判断，不等同于官方结论；涉及非遗级别、保护单位、项目编号等信息，以官方公开资料为准。
        </p>
      </div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-linen">
        <div>共筛选出 <span className="text-gold">{result.length}</span> 个方向</div>
        <div className="text-paper/55">第 {currentPage} / {pageCount} 页，每页 {pageSize} 条</div>
      </div>
      {result.length ? (
        <>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pagedResult.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
          <div className="mt-8 flex justify-center gap-3">
            <button
              className="rounded border border-paper/20 px-4 py-2 text-sm text-paper disabled:cursor-not-allowed disabled:opacity-40"
              disabled={currentPage <= 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
            >
              上一页
            </button>
            <button
              className="rounded border border-paper/20 px-4 py-2 text-sm text-paper disabled:cursor-not-allowed disabled:opacity-40"
              disabled={currentPage >= pageCount}
              onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            >
              下一页
            </button>
          </div>
        </>
      ) : (
        <EmptyState title="没有找到匹配的项目方向，请调整筛选条件。" />
      )}
    </div>
  );
}
