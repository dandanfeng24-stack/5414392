"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { assessProject } from "@/lib/ai-assessment";
import { aiRules } from "@/lib/data";
import type { AiAssessmentInput } from "@/lib/types";

const initialInput: AiAssessmentInput = {
  region: "江南",
  projectType: "历史街区",
  targetUsers: "亲子家庭",
  budget: "10-30万",
  goal: "提升停留",
  localResources: "有老街铺面、周末家庭客流和地方纸艺资源"
};

export function AiAssessmentPanel() {
  const [input, setInput] = useState(initialInput);
  const result = useMemo(() => assessProject(input), [input]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="surface rounded p-6">
        <h2 className="font-serif text-2xl text-paper">结构化输入</h2>
        <div className="mt-6 grid gap-4">
          <SelectInput label="地区" field="region" input={input} setInput={setInput} />
          <SelectInput label="项目类型" field="projectType" input={input} setInput={setInput} />
          <SelectInput label="目标客群" field="targetUsers" input={input} setInput={setInput} />
          <SelectInput label="预算" field="budget" input={input} setInput={setInput} />
          <SelectInput label="目标" field="goal" input={input} setInput={setInput} />
          <label>
            <span className="mb-2 block text-xs text-paper/55">本地文化资源</span>
            <textarea
              value={input.localResources}
              onChange={(event) => setInput((current) => ({ ...current, localResources: event.target.value }))}
              rows={5}
              className="w-full rounded border border-paper/15 bg-ink px-4 py-3 text-sm text-paper outline-none focus:border-gold"
            />
          </label>
        </div>
      </section>
      <section className="surface rounded p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl text-paper">结构化输出</h2>
            <p className="mt-2 text-sm text-linen">基于非遗转化规则模型生成方向参考。</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-linen">适配度</div>
            <div className="font-serif text-5xl text-gold">{result.score}</div>
          </div>
        </div>
        <div className="mt-6 rounded border border-gold/25 bg-gold/10 p-5 text-paper">{result.conclusion}</div>
        <ResultList title="推荐非遗方向" items={result.recommendedThemes} />
        <ResultList title="风险提示" items={result.risks} />
        <ResultList title="场景建议" items={result.sceneSuggestions} />
        <div className="mt-8">
          <h3 className="font-serif text-xl text-paper">推荐项目</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {result.recommendedProjects.slice(0, 2).map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        </div>
        <ResultList title="推荐案例" items={result.recommendedCases.map((item) => item.title)} />
        <ResultList title="推荐资料包" items={result.recommendedPackages.map((item) => item.title)} />
      </section>
    </div>
  );
}

function SelectInput({
  label,
  field,
  input,
  setInput
}: {
  label: string;
  field: keyof AiAssessmentInput;
  input: AiAssessmentInput;
  setInput: React.Dispatch<React.SetStateAction<AiAssessmentInput>>;
}) {
  const options = aiRules.inputOptions[field] ?? [];
  return (
    <label>
      <span className="mb-2 block text-xs text-paper/55">{label}</span>
      <select
        value={input[field]}
        onChange={(event) => setInput((current) => ({ ...current, [field]: event.target.value }))}
        className="w-full rounded border border-paper/15 bg-ink px-4 py-3 text-sm text-paper outline-none focus:border-gold"
      >
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function ResultList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6">
      <h3 className="font-serif text-xl text-paper">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-linen">
        {items.length ? items.map((item) => <li key={item}>· {item}</li>) : <li>· 暂无匹配，建议补充本地资源信息。</li>}
      </ul>
    </div>
  );
}
