"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AccessGate } from "@/components/access/AccessGate";
import { LockedContent } from "@/components/access/LockedContent";
import { assessProject } from "@/lib/ai-assessment";
import { aiRules } from "@/lib/data";
import type { AiAssessmentDimension, AiAssessmentInput } from "@/lib/types";

const dimensionLabels: Record<AiAssessmentDimension, string> = {
  productization: "产品化适配度",
  experience: "体验化适配度",
  course: "课程化适配度",
  gift: "礼品化适配度",
  scene: "场景适配度",
  operation: "运营可行性",
  riskControl: "风险可控度"
};

const initialInput: AiAssessmentInput = {
  region: "华东地区",
  city: "",
  heritageType: "传统技艺",
  projectStage: "只有文化资源，还没有产品或活动",
  userRole: "文旅项目方",
  conversionGoals: ["开发游客体验活动"],
  applicationScenario: "历史文化街区",
  targetUsers: ["亲子家庭"],
  expectedOutputs: ["判断项目是否适合商业化"],
  existingConditions: ["有传承人 / 手艺人"],
  productFoundation: "暂不确定",
  experienceFoundation: "暂不确定",
  courseFoundation: "暂不确定",
  giftFoundation: "暂不确定",
  businessFoundation: "暂不确定",
  budgetStage: "希望先低成本测试",
  timeline: "1-3 个月",
  riskFactors: ["暂不确定"],
  localResources: ""
};

const steps = [
  "项目基本情况",
  "转化目标与应用场景",
  "转化基础",
  "落地条件与风险"
];

export function AiAssessmentPanel() {
  const [input, setInput] = useState(initialInput);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const stepIsValid = isStepValid(input, currentStep);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="surface rounded p-6">
        <div className="flex flex-wrap gap-2">
          {steps.map((step, index) => (
            <button
              key={step}
              type="button"
              onClick={() => {
                setCurrentStep(index);
                setShowResult(false);
              }}
              className={`rounded border px-3 py-2 text-xs transition-colors ${
                currentStep === index
                  ? "border-gold/50 bg-gold/15 text-gold"
                  : "border-paper/10 text-linen hover:border-gold/35 hover:text-gold"
              }`}
            >
              {index + 1}. {step}
            </button>
          ))}
        </div>

        <div className="mt-7">
          <h2 className="font-serif text-2xl text-paper">{steps[currentStep]}</h2>
          <p className="mt-2 text-sm leading-6 text-linen">核心字段用于生成评分，其余字段可跳过或选择“暂不确定”。</p>
        </div>

        <div className="mt-6">
          {currentStep === 0 && <BasicStep input={input} setInput={setInput} />}
          {currentStep === 1 && <GoalStep input={input} setInput={setInput} />}
          {currentStep === 2 && <FoundationStep input={input} setInput={setInput} />}
          {currentStep === 3 && <RiskStep input={input} setInput={setInput} />}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-paper/10 pt-5">
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
            className="rounded border border-paper/20 px-5 py-2 text-sm text-paper transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
          >
            上一步
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              disabled={!stepIsValid}
              onClick={() => setCurrentStep((step) => Math.min(steps.length - 1, step + 1))}
              className="rounded bg-gold px-5 py-2 text-sm text-ink transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-45"
            >
              下一步
            </button>
          ) : (
            <button
              type="button"
              disabled={!stepIsValid}
              onClick={() => setShowResult(true)}
              className="rounded bg-gold px-5 py-2 text-sm text-ink transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-45"
            >
              生成智能初评
            </button>
          )}
          {!stepIsValid && <span className="text-xs text-gold/80">请先补齐本步骤核心字段。</span>}
        </div>
      </section>

      <section className="surface rounded p-6">
        {showResult ? (
          <AssessmentResult input={input} onRestart={() => {
            setShowResult(false);
            setCurrentStep(0);
          }} />
        ) : (
          <div>
            <h2 className="font-serif text-2xl text-paper">结构化输出</h2>
            <p className="mt-3 text-sm leading-7 text-linen">
              完成四步问卷后，系统会基于你选择的条件生成七维评分、适配等级、推荐路径、风险提示和资料包建议。该分数只用于当前输入条件判断，不影响数据库项目评分。
            </p>
            <div className="mt-6 rounded border border-gold/20 bg-gold/10 p-5 text-sm leading-7 text-paper">
              当前进度：{currentStep + 1} / {steps.length} · {steps[currentStep]}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function BasicStep({ input, setInput }: StepProps) {
  return (
    <div className="grid gap-4">
      <SelectInput label="项目所在地区" field="region" input={input} setInput={setInput} required />
      <TextInput label="具体城市 / 县区" field="city" input={input} setInput={setInput} placeholder="例如：浙江杭州 / 四川成都 / 江西宜春" />
      <SelectInput label="非遗资源类型" field="heritageType" input={input} setInput={setInput} required />
      <SelectInput label="当前项目阶段" field="projectStage" input={input} setInput={setInput} required />
      <SelectInput label="用户身份" field="userRole" input={input} setInput={setInput} required />
    </div>
  );
}

function GoalStep({ input, setInput }: StepProps) {
  return (
    <div className="grid gap-5">
      <CheckboxGroup label="主要转化目标" field="conversionGoals" input={input} setInput={setInput} max={3} required />
      <SelectInput label="计划应用场景" field="applicationScenario" input={input} setInput={setInput} required />
      <CheckboxGroup label="目标客群" field="targetUsers" input={input} setInput={setInput} required />
      <CheckboxGroup label="希望获得的输出" field="expectedOutputs" input={input} setInput={setInput} max={3} />
    </div>
  );
}

function FoundationStep({ input, setInput }: StepProps) {
  return (
    <div className="grid gap-5">
      <CheckboxGroup label="当前拥有的基础条件" field="existingConditions" input={input} setInput={setInput} />
      <SelectInput label="产品化基础" field="productFoundation" input={input} setInput={setInput} />
      <SelectInput label="体验化基础" field="experienceFoundation" input={input} setInput={setInput} />
      <SelectInput label="课程化基础" field="courseFoundation" input={input} setInput={setInput} />
      <SelectInput label="礼品化基础" field="giftFoundation" input={input} setInput={setInput} />
      <SelectInput label="商业化基础" field="businessFoundation" input={input} setInput={setInput} />
    </div>
  );
}

function RiskStep({ input, setInput }: StepProps) {
  return (
    <div className="grid gap-5">
      <SelectInput label="预算阶段" field="budgetStage" input={input} setInput={setInput} required />
      <SelectInput label="计划推进周期" field="timeline" input={input} setInput={setInput} />
      <CheckboxGroup label="风险情况" field="riskFactors" input={input} setInput={setInput} required />
      <label>
        <span className="mb-2 block text-xs text-paper/55">本地文化资源描述</span>
        <textarea
          value={input.localResources}
          onChange={(event) => setInput((current) => ({ ...current, localResources: event.target.value }))}
          rows={6}
          placeholder="请简要描述项目的地方文化资源、传承人情况、已有产品或计划使用场景，例如：某县传统竹编，已有传承人和少量样品，希望导入历史街区做亲子体验和伴手礼。"
          className="w-full rounded border border-paper/15 bg-ink px-4 py-3 text-sm leading-7 text-paper outline-none focus:border-gold"
        />
      </label>
    </div>
  );
}

function AssessmentResult({ input, onRestart }: { input: AiAssessmentInput; onRestart: () => void }) {
  const result = useMemo(() => assessProject(input), [input]);

  return (
    <div>
      <div className="flex items-start justify-between gap-5">
        <div>
          <h2 className="font-serif text-2xl text-paper">智能初评结果</h2>
          <p className="mt-2 text-sm leading-6 text-linen">基于当前输入条件生成，不等同于数据库项目评分。</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-linen">综合适配分</div>
          <div className="font-serif text-5xl text-gold">{result.totalScore}</div>
        </div>
      </div>

      <div className="mt-6 rounded border border-gold/25 bg-gold/10 p-5 text-paper">
        <div className="font-serif text-xl text-gold">{result.grade}</div>
        <p className="mt-3 text-sm leading-7 text-linen">{result.conclusion}</p>
        {result.gradeNote && <p className="mt-2 text-sm leading-7 text-gold/85">{result.gradeNote}</p>}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {(Object.entries(result.dimensionScores) as Array<[AiAssessmentDimension, number]>).map(([dimension, score]) => (
          <div key={dimension} className="rounded border border-paper/10 bg-ink/45 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-linen">{dimensionLabels[dimension]}</span>
              <span className="font-serif text-xl text-gold">{score}</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded bg-paper/10">
              <div className="h-full rounded bg-gold" style={{ width: score + "%" }} />
            </div>
          </div>
        ))}
      </div>

      <AccessGate
        requiredTier="registered"
        fallback={
          <LockedContent
            requiredTier="registered"
            title="登录后查看完整初评解释"
            description="综合分、等级和基础评分概览已开放；完整加分项、扣分项、推荐路径、风险提示和补齐条件需要登录后查看。"
            ctaLabel="登录 / 注册后查看"
            ctaHref="/login"
          />
        }
      >
        <ResultList title="主要加分项" items={result.positiveFactors} />
        <ResultList title="主要扣分项" items={result.negativeFactors} />
        <ResultList title="推荐转化路径" items={result.recommendedPaths} />
        <ResultList title="不建议优先做的方向" items={result.notRecommendedDirections} />
        <ResultList title="风险提示" items={result.risks} />
        <ResultList title="建议先补齐的条件" items={result.conditionsToImprove} />
      </AccessGate>

      <AccessGate
        requiredTier="paid"
        fallback={
          <LockedContent
            requiredTier="paid"
            title="升级后查看推荐资料包"
            description="推荐资料包及匹配理由属于深度解释内容。你也可以先提交项目诊断，获取更具体的项目建议。"
            ctaLabel="查看会员权益"
            ctaHref="/account/membership"
          />
        }
      >
        <div className="mt-7">
          <h3 className="font-serif text-xl text-paper">推荐资料包</h3>
          <div className="mt-4 grid gap-3">
            {result.recommendedPackages.length ? result.recommendedPackages.map((item) => (
              <div key={item.id} className="rounded border border-paper/10 bg-ink/45 p-4">
                <div className="text-sm font-medium text-paper">{item.title}</div>
                <p className="mt-2 text-sm leading-6 text-linen">{item.reason}</p>
                <Link href={"/packages/" + item.id} className="mt-3 inline-flex text-sm text-gold hover:text-paper">查看资料包</Link>
              </div>
            )) : <p className="text-sm text-linen">暂未匹配到明确资料包，建议先提交项目诊断进一步梳理。</p>}
          </div>
        </div>
      </AccessGate>

      <div className="mt-8 flex flex-wrap gap-3 border-t border-paper/10 pt-5">
        <button type="button" onClick={onRestart} className="rounded border border-paper/20 px-5 py-2 text-sm text-paper transition hover:border-gold hover:text-gold">
          重新测评
        </button>
        <Link href="/diagnosis" className="rounded bg-gold px-5 py-2 text-sm text-ink transition hover:bg-paper">
          提交项目诊断
        </Link>
      </div>
    </div>
  );
}

type StepProps = {
  input: AiAssessmentInput;
  setInput: React.Dispatch<React.SetStateAction<AiAssessmentInput>>;
};

function SelectInput({
  label,
  field,
  input,
  setInput,
  required
}: StepProps & { label: string; field: keyof AiAssessmentInput; required?: boolean }) {
  const options = aiRules.inputOptions[field] ?? [];
  const value = String(input[field] ?? "");

  return (
    <label>
      <span className="mb-2 block text-xs text-paper/55">{label}{required ? " *" : ""}</span>
      <select
        value={value}
        onChange={(event) => setInput((current) => ({ ...current, [field]: event.target.value }))}
        className="w-full rounded border border-paper/15 bg-ink px-4 py-3 text-sm text-paper outline-none focus:border-gold"
      >
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function TextInput({
  label,
  field,
  input,
  setInput,
  placeholder
}: StepProps & { label: string; field: keyof AiAssessmentInput; placeholder?: string }) {
  return (
    <label>
      <span className="mb-2 block text-xs text-paper/55">{label}</span>
      <input
        value={String(input[field] ?? "")}
        onChange={(event) => setInput((current) => ({ ...current, [field]: event.target.value }))}
        placeholder={placeholder}
        className="w-full rounded border border-paper/15 bg-ink px-4 py-3 text-sm text-paper outline-none focus:border-gold"
      />
    </label>
  );
}

function CheckboxGroup({
  label,
  field,
  input,
  setInput,
  max,
  required
}: StepProps & { label: string; field: keyof AiAssessmentInput; max?: number; required?: boolean }) {
  const options = aiRules.inputOptions[field] ?? [];
  const values = Array.isArray(input[field]) ? input[field] as string[] : [];

  return (
    <div>
      <div className="mb-3 text-xs text-paper/55">{label}{required ? " *" : ""}{max ? `（最多 ${max} 项）` : ""}</div>
      <div className="grid gap-2 md:grid-cols-2">
        {options.map((option) => {
          const checked = values.includes(option);
          const disabled = Boolean(max && !checked && values.length >= max);
          return (
            <label
              key={option}
              className={`flex cursor-pointer items-start gap-2 rounded border p-3 text-sm leading-6 transition ${
                checked
                  ? "border-gold/45 bg-gold/10 text-paper"
                  : "border-paper/10 bg-ink/35 text-linen hover:border-gold/30"
              } ${disabled ? "cursor-not-allowed opacity-45" : ""}`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => setInput((current) => ({ ...current, [field]: toggleOption(field, values, option, max) }))}
                className="mt-1 accent-[#B89A5E]"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ResultList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-7">
      <h3 className="font-serif text-xl text-paper">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-linen">
        {items.length ? items.map((item) => <li key={item}>· {item}</li>) : <li>· 暂无明确匹配，建议补充项目条件。</li>}
      </ul>
    </div>
  );
}

function toggleOption(field: keyof AiAssessmentInput, values: string[], option: string, max?: number) {
  let next = values.includes(option) ? values.filter((item) => item !== option) : [...values, option];

  if (field === "riskFactors" && option === "暂无明显风险" && next.includes(option)) {
    return ["暂无明显风险"];
  }
  if (field === "riskFactors" && option !== "暂无明显风险") {
    next = next.filter((item) => item !== "暂无明显风险");
  }
  if (field === "courseFoundation" && option === "不考虑课程化" && next.includes(option)) {
    return ["不考虑课程化"];
  }
  if (field === "courseFoundation" && option !== "不考虑课程化") {
    next = next.filter((item) => item !== "不考虑课程化");
  }
  if (field === "productFoundation" && option === "目前不适合做实物产品" && next.includes(option)) {
    return ["目前不适合做实物产品"];
  }
  if (field === "productFoundation" && option !== "目前不适合做实物产品") {
    next = next.filter((item) => item !== "目前不适合做实物产品");
  }
  if (next.includes("暂不确定") && option !== "暂不确定") {
    next = next.filter((item) => item !== "暂不确定");
  }
  if (option === "暂不确定" && next.includes(option)) {
    next = ["暂不确定"];
  }

  return max ? next.slice(0, max) : next;
}

function isStepValid(input: AiAssessmentInput, step: number) {
  if (step === 0) return Boolean(input.region && input.heritageType && input.projectStage && input.userRole);
  if (step === 1) return Boolean(input.conversionGoals.length && input.applicationScenario && input.targetUsers.length);
  if (step === 2) return true;
  return Boolean(input.budgetStage && input.riskFactors.length);
}
