"use client";

import { aiRules, packages } from "./data";
import type {
  AiAssessmentDimension,
  AiAssessmentEvidence,
  AiAssessmentInput,
  AiAssessmentResult
} from "./types";

const dimensionLabels: Record<AiAssessmentDimension, string> = {
  productization: "产品化适配度",
  experience: "体验化适配度",
  course: "课程化适配度",
  gift: "礼品化适配度",
  scene: "场景适配度",
  operation: "运营可行性",
  riskControl: "风险可控度"
};

const baseScores: Record<AiAssessmentDimension, number> = {
  productization: 55,
  experience: 55,
  course: 55,
  gift: 55,
  scene: 55,
  operation: 55,
  riskControl: 82
};

export function assessProject(input: AiAssessmentInput): AiAssessmentResult {
  const scores = { ...baseScores };
  const evidence: AiAssessmentEvidence[] = [];
  const selectedValues = getSelectedValues(input);

  for (const rule of aiRules.scoringRules) {
    const values = getFieldValues(input[rule.field]);
    if (!values.includes(rule.match)) continue;

    for (const [dimension, delta] of Object.entries(rule.effects) as Array<[AiAssessmentDimension, number]>) {
      scores[dimension] = clampScore(scores[dimension] + delta);
      evidence.push({
        option: rule.match,
        dimension,
        delta,
        reason: rule.reason
      });
    }
  }

  const riskEvidence = applyRiskRules(input.riskFactors, scores);
  evidence.push(...riskEvidence);

  const totalBeforeCap = calculateWeightedScore(scores);
  const gradeInfo = getGrade(totalBeforeCap, scores.riskControl);
  const totalScore = Math.min(totalBeforeCap, gradeInfo.maxScore);
  const finalGradeInfo = getGrade(totalScore, scores.riskControl);

  const positiveFactors = pickReasons(evidence.filter((item) => item.delta > 0), 5);
  const negativeFactors = pickReasons(evidence.filter((item) => item.delta < 0), 5);
  const risks = buildRisks(input.riskFactors, scores.riskControl);
  const recommendedPaths = buildRecommendedPaths(selectedValues);
  const notRecommendedDirections = buildNotRecommendedDirections(selectedValues, scores);
  const conditionsToImprove = buildConditions(selectedValues, scores);
  const recommendedPackages = buildRecommendedPackages(selectedValues);

  return {
    totalScore,
    score: totalScore,
    grade: finalGradeInfo.label,
    gradeNote: finalGradeInfo.note,
    conclusion: buildConclusion(totalScore, finalGradeInfo.label, scores.riskControl),
    dimensionScores: scores,
    evidence,
    positiveFactors,
    negativeFactors,
    recommendedPaths,
    notRecommendedDirections,
    risks,
    conditionsToImprove,
    recommendedPackages
  };
}

function applyRiskRules(riskFactors: string[], scores: Record<AiAssessmentDimension, number>) {
  if (riskFactors.includes("暂无明显风险")) {
    scores.riskControl = clampScore(scores.riskControl + 8);
    return [{
      option: "暂无明显风险",
      dimension: "riskControl" as AiAssessmentDimension,
      delta: 8,
      reason: "当前未识别明显风险，风险可控度基础较好。"
    }];
  }

  return aiRules.riskRules
    .filter((rule) => riskFactors.includes(rule.keyword))
    .map((rule) => {
      scores.riskControl = clampScore(scores.riskControl - rule.penalty);
      return {
        option: rule.keyword,
        dimension: "riskControl" as AiAssessmentDimension,
        delta: -rule.penalty,
        reason: rule.risk
      };
    });
}

function calculateWeightedScore(scores: Record<AiAssessmentDimension, number>) {
  const total = (Object.entries(aiRules.scoringWeights) as Array<[AiAssessmentDimension, number]>)
    .reduce((sum, [dimension, weight]) => sum + scores[dimension] * weight, 0);
  return Math.round(total);
}

function getGrade(score: number, riskControl: number) {
  let label = "";
  let note = "";
  let maxScore = 100;

  if (score >= 85) {
    label = "高适配，适合进入方案深化";
  } else if (score >= 75) {
    label = "中高适配，建议先做样板产品或样板体验";
  } else if (score >= 60) {
    label = "中等适配，建议先做基础梳理和小规模测试";
  } else if (score >= 45) {
    label = "低适配，建议先补齐主体、场景或产品基础";
  } else {
    label = "暂不建议直接商业化转化";
  }

  if (riskControl < 50) {
    note = "风险可控度偏低，需先处理关键风险。";
  }
  if (riskControl < 40) {
    maxScore = 74;
    note = "风险可控度较低，最终等级最高不超过中等适配。";
  }
  if (riskControl < 30) {
    maxScore = 59;
    note = "风险可控度很低，最终等级最高不超过低适配。";
  }

  return { label, note, maxScore };
}

function buildConclusion(score: number, grade: string, riskControl: number) {
  const riskNote = riskControl < 50 ? "但需要先处理关键风险，再进入放大投入。" : "可进入下一步样板验证和方案细化。";
  return `综合适配分 ${score}，评定为“${grade}”。${riskNote}`;
}

function buildRecommendedPaths(selectedValues: string[]) {
  const paths = aiRules.outputTemplates.paths
    .filter((item) => item.matchAny.some((keyword) => selectedValues.includes(keyword)))
    .sort((a, b) => b.priority - a.priority)
    .map((item) => item.text);

  return unique(paths).slice(0, 3);
}

function buildNotRecommendedDirections(selectedValues: string[], scores: Record<AiAssessmentDimension, number>) {
  const directions = aiRules.outputTemplates.notRecommended
    .filter((item) => item.matchAny.some((keyword) => selectedValues.includes(keyword)))
    .map((item) => item.text);

  if (scores.productization < 50) directions.push("不建议优先做大批量产品销售。");
  if (scores.course < 50) directions.push("不建议优先做复杂研学营。");
  if (scores.scene < 50) directions.push("不建议优先做重资产空间改造。");
  if (scores.gift < 50) directions.push("不建议优先做高客单价礼盒。");
  if (scores.operation < 50) directions.push("不建议优先进入线上电商。");

  return unique(directions).slice(0, 5);
}

function buildConditions(selectedValues: string[], scores: Record<AiAssessmentDimension, number>) {
  const conditions = aiRules.outputTemplates.conditions
    .filter((item) => item.matchAny.some((keyword) => selectedValues.includes(keyword)))
    .map((item) => item.text);

  if (scores.operation < 55) conditions.push("先补齐负责人、执行团队、预算边界和试运营复盘机制。");
  if (scores.riskControl < 50) conditions.push("先梳理安全、授权、资质或供应链风险，再推进对外销售。");
  if (scores.productization < 55) conditions.push("先完成 1-2 个可售样品、包装信息和成本测算。");

  return unique(conditions).slice(0, 6);
}

function buildRisks(riskFactors: string[], riskControl: number) {
  if (riskFactors.includes("暂无明显风险")) return ["当前未识别明显风险，仍建议在试运营前完成基础风险清单。"];

  const risks = aiRules.riskRules
    .filter((rule) => riskFactors.includes(rule.keyword))
    .map((rule) => rule.risk);

  if (riskControl < 50) risks.unshift("当前风险可控度偏低，建议先完成风险边界和现场执行预案。");
  return unique(risks).slice(0, 6);
}

function buildRecommendedPackages(selectedValues: string[]) {
  return aiRules.packageRules
    .filter((rule) => rule.matchAny.some((keyword) => selectedValues.includes(keyword)))
    .map((rule) => {
      const item = packages.find((packageItem) => packageItem.id === rule.packageId);
      return item ? { id: item.id, title: item.title, reason: rule.reason } : null;
    })
    .filter((item): item is { id: string; title: string; reason: string } => Boolean(item))
    .slice(0, 3);
}

function pickReasons(items: AiAssessmentEvidence[], limit: number) {
  return unique(
    items
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
      .map((item) => `${dimensionLabels[item.dimension]}：${item.reason}`)
  ).slice(0, limit);
}

function getSelectedValues(input: AiAssessmentInput) {
  return Object.values(input).flatMap(getFieldValues).filter((value) => value && !value.includes("暂不确定"));
}

function getFieldValues(value: unknown) {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function unique(items: string[]) {
  return Array.from(new Set(items));
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}
