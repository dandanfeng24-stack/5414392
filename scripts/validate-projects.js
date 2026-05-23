const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const projects = JSON.parse(fs.readFileSync(path.join(root, "data/projects.json"), "utf8"));
const cases = JSON.parse(fs.readFileSync(path.join(root, "data/cases.json"), "utf8"));
const packages = JSON.parse(fs.readFileSync(path.join(root, "data/packages.json"), "utf8"));

const mode = process.argv.includes("--sample")
  ? "sample"
  : process.argv.includes("--market-sample")
    ? "market-sample"
    : "full";

const allowedGrades = new Set(["A", "B", "C", "D"]);
const allowedStatus = new Set(["AI 初稿", "人工初审", "已复核", "待补充", "待核验"]);
const allowedVerification = new Set(["已核验", "部分核验", "待核验"]);
const allowedMarketEvidence = new Set(["强证据", "中证据", "弱证据", "待核验"]);
const bannedPlaceholders = ["TODO", "待填写", "Lorem", "example.com", "随便补充"];
const coreTextFields = ["summary", "uniqueValue", "scoreReason", "scoreExplanation", "operationNotes", "riskExplanation"];
const marketScoreWeights = {
  commercialization: 0.2,
  experience: 0.2,
  sceneFit: 0.18,
  spread: 0.16,
  gift: 0.12,
  operation: 0.14
};
const scoreKeys = Object.keys(marketScoreWeights);
function derivedGrade(total) {
  if (total >= 88) return "A";
  if (total >= 78) return "B";
  if (total >= 65) return "C";
  return "D";
}
const expectedDistribution = {
  "茶文化": 12,
  "陶瓷器物": 14,
  "织染刺绣": 18,
  "地方风味": 14,
  "手作研学": 20,
  "妆造旅拍": 10,
  "民俗夜游": 8,
  "生活方式": 4
};
const sampleIds = [
  "wuyi-rock-tea",
  "longquan-celadon",
  "suzhou-embroidery",
  "blue-calico",
  "shaoxing-rice-wine",
  "paper-cut",
  "kite-making",
  "hanfu-makeup",
  "dragon-lantern",
  "incense-making"
];
const marketSampleIds = [
  "wuyi-rock-tea",
  "jingdezhen-porcelain",
  "suzhou-embroidery",
  "blue-calico",
  "zhoucun-sesame-cake",
  "paper-cut",
  "dragon-lantern",
  "hanfu-makeup",
  "nanjing-yunjin",
  "iron-flower"
];

const caseIds = new Set(cases.map((item) => item.id));
const packageIds = new Set(packages.map((item) => item.id));
const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function isArray(value) {
  return Array.isArray(value);
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function checkNoPlaceholder(label, field, value) {
  if (typeof value !== "string") return;
  for (const word of bannedPlaceholders) {
    if (value.includes(word)) fail(`${label}: ${field} contains placeholder word ${word}`);
  }
  if (field !== "sourceNotes" && value.trim() === "待补充") {
    fail(`${label}: ${field} should not use 待补充 as data content`);
  }
}

function looksLikeInvalidLink(url) {
  return (
    typeof url !== "string" ||
    !/^https?:\/\//i.test(url) ||
    /example\.com|localhost|127\.0\.0\.1|\s/i.test(url)
  );
}

function weightedTotal(score) {
  return Math.round(scoreKeys.reduce((sum, key) => sum + Number(score[key] || 0) * marketScoreWeights[key], 0));
}

function validateMarketEvidence(project, required) {
  const label = project.id || project.name;
  const evidence = project.marketEvidence;

  if (!evidence) {
    if (required) fail(`${label}: marketEvidence is required for market sample`);
    return;
  }

  if (!hasText(evidence.summary)) fail(`${label}: marketEvidence.summary is required`);
  if (!allowedMarketEvidence.has(evidence.evidenceLevel)) {
    fail(`${label}: invalid marketEvidence.evidenceLevel ${evidence.evidenceLevel}`);
  }
  if (!isArray(evidence.sources)) fail(`${label}: marketEvidence.sources must be an array`);
  for (const source of evidence.sources || []) {
    if (looksLikeInvalidLink(source)) fail(`${label}: invalid marketEvidence source link ${source}`);
  }
  if (!evidence.searchVisibility || typeof evidence.searchVisibility !== "object") {
    fail(`${label}: marketEvidence.searchVisibility is required`);
  } else {
    for (const field of ["level", "resultDensity", "commercialSignal", "experienceSignal", "notes"]) {
      if (!hasText(evidence.searchVisibility[field])) fail(`${label}: marketEvidence.searchVisibility.${field} is required`);
    }
    if (!isArray(evidence.searchVisibility.sourceDiversity) || evidence.searchVisibility.sourceDiversity.length === 0) {
      fail(`${label}: marketEvidence.searchVisibility.sourceDiversity must be a non-empty array`);
    }
  }
  if ((evidence.sources || []).length === 0 && project.score && project.score.total >= 80) {
    fail(`${label}: no-source project should not score 80 or above under L1 search rules`);
  }

  for (const key of scoreKeys) {
    const dimension = evidence.dimensions && evidence.dimensions[key];
    if (!dimension) {
      fail(`${label}: marketEvidence.dimensions.${key} is required`);
      continue;
    }
    if (!hasText(dimension.summary)) fail(`${label}: marketEvidence.dimensions.${key}.summary is required`);
    if (!allowedMarketEvidence.has(dimension.evidenceLevel)) {
      fail(`${label}: invalid marketEvidence.dimensions.${key}.evidenceLevel ${dimension.evidenceLevel}`);
    }
    if (!isArray(dimension.evidenceTypes) || dimension.evidenceTypes.length === 0) {
      fail(`${label}: marketEvidence.dimensions.${key}.evidenceTypes must be a non-empty array`);
    }
    if (project.scoreDetails && hasText(project.scoreDetails[key])) {
      const firstEvidencePhrase = String(dimension.summary).slice(0, 10);
      if (!project.scoreDetails[key].includes(firstEvidencePhrase)) {
        fail(`${label}: scoreDetails.${key} should cite its matching market evidence summary`);
      }
    }
    if (project.score && project.score[key] > 85 && (!evidence.sources || evidence.sources.length === 0) && !/人工复核|已有项目资料/.test(dimension.summary)) {
      fail(`${label}: score.${key} is over 85 but has no real source link or review note`);
    }
  }

  if (project.score) {
    const expectedTotal = weightedTotal(project.score);
    if (project.score.total !== expectedTotal) {
      fail(`${label}: score.total should be weighted market score ${expectedTotal}, got ${project.score.total}`);
    }
    if (project.totalScore !== expectedTotal) {
      fail(`${label}: totalScore should equal weighted market score ${expectedTotal}, got ${project.totalScore}`);
    }
    const legacy = project.scores || {};
    const legacyPairs = [
      ["commodity", "commercialization"],
      ["experience", "experience"],
      ["scenario", "sceneFit"],
      ["spread", "spread"],
      ["gift", "gift"],
      ["operation", "operation"]
    ];
    for (const [legacyKey, scoreKey] of legacyPairs) {
      if (legacy[legacyKey] !== project.score[scoreKey]) {
        fail(`${label}: scores.${legacyKey} must match score.${scoreKey}`);
      }
    }
  }

  const scoringText = [project.scoreReason, project.scoreExplanation, ...Object.values(project.scoreDetails || {})].join("");
  for (const riskWord of ["风险", "扣分", "安全", "不稳定", "成本难以控制"]) {
    if (scoringText.includes(riskWord) && riskWord !== "扣分") {
      warn(`${label}: scoring text mentions "${riskWord}"; confirm it is evidence context, not risk-based scoring`);
    }
  }
}

function validateProject(project, index) {
  const label = project.id || project.name || `index ${index}`;
  for (const key of ["id", "name", "theme", "summary", "conversionGrade", "score"]) {
    if (!project[key]) fail(`${label}: missing ${key}`);
  }
  if (!allowedGrades.has(project.conversionGrade)) fail(`${label}: invalid conversionGrade ${project.conversionGrade}`);
  if (!project.score || typeof project.score.total !== "number") fail(`${label}: score.total must be a number`);
  if (project.score && project.conversionGrade !== derivedGrade(project.score.total)) {
    fail(`${label}: conversionGrade ${project.conversionGrade} should match score.total derived grade ${derivedGrade(project.score.total)}`);
  }
  if (!project.contentStatus) fail(`${label}: contentStatus is required`);
  if (project.contentStatus && !allowedStatus.has(project.contentStatus)) fail(`${label}: invalid contentStatus ${project.contentStatus}`);
  for (const field of coreTextFields) {
    if (!hasText(project[field])) fail(`${label}: ${field} is required`);
    checkNoPlaceholder(label, field, project[field]);
  }
  if (!isArray(project.sourceLinks)) fail(`${label}: sourceLinks must be an array`);
  for (const source of project.sourceLinks || []) {
    if (looksLikeInvalidLink(source)) fail(`${label}: invalid sourceLinks item ${source}`);
  }
  for (const key of ["productDirections", "experienceDirections", "bestScenes", "riskTags"]) {
    if (!isArray(project[key])) fail(`${label}: ${key} must be an array`);
  }
  for (const key of ["productDirections", "experienceDirections", "bestScenes", "riskTags", "riskControl", "priceBands"]) {
    if (isArray(project[key]) && project[key].length === 0) fail(`${label}: ${key} should not be empty`);
  }
  if (!isArray(project.riskControl) || project.riskControl.length < 2) fail(`${label}: riskControl must contain at least 2 items`);
  if (!isArray(project.recommendedSkus) || project.recommendedSkus.length < 4) fail(`${label}: recommendedSkus must contain at least 4 items`);
  if (!isArray(project.recommendedExperiences) || project.recommendedExperiences.length < 2) fail(`${label}: recommendedExperiences must contain at least 2 items`);
  if (!project.implementationConditions || typeof project.implementationConditions !== "object") fail(`${label}: implementationConditions is required`);
  if (!isArray(project.revenueModels) || project.revenueModels.length < 3) fail(`${label}: revenueModels must contain at least 3 items`);
  if (!project.officialVerification || typeof project.officialVerification !== "object") {
    fail(`${label}: officialVerification is required`);
  } else {
    if (!allowedVerification.has(project.officialVerification.status)) fail(`${label}: invalid officialVerification.status ${project.officialVerification.status}`);
    if (!isArray(project.officialVerification.verifiedFields)) fail(`${label}: officialVerification.verifiedFields must be an array`);
    if (!isArray(project.officialVerification.pendingFields)) fail(`${label}: officialVerification.pendingFields must be an array`);
  }
  for (const sku of project.recommendedSkus || []) {
    for (const field of ["name", "priceBand", "targetUser", "salesScene", "reason"]) {
      if (!hasText(sku[field])) fail(`${label}: recommendedSkus item missing ${field}`);
      checkNoPlaceholder(label, `recommendedSkus.${field}`, sku[field]);
    }
  }
  for (const experience of project.recommendedExperiences || []) {
    for (const field of ["title", "duration", "capacity", "takeaway", "staffing", "riskNotes"]) {
      if (!hasText(experience[field])) fail(`${label}: recommendedExperiences item missing ${field}`);
      checkNoPlaceholder(label, `recommendedExperiences.${field}`, experience[field]);
    }
    if (!isArray(experience.process) || experience.process.length < 3) fail(`${label}: recommendedExperiences process must contain at least 3 steps`);
    for (const step of experience.process || []) {
      if (/^\s*\d+[.、)]/.test(step)) fail(`${label}: recommendedExperiences process step should not start with numbering: ${step}`);
    }
  }
  for (const model of project.revenueModels || []) {
    for (const field of ["type", "description", "suitableScene", "difficulty", "notes"]) {
      if (!hasText(model[field])) fail(`${label}: revenueModels item missing ${field}`);
      checkNoPlaceholder(label, `revenueModels.${field}`, model[field]);
    }
  }
  if (project.image) {
    const imagePath = path.join(root, "public", project.image.replace(/^\//, ""));
    if (!fs.existsSync(imagePath)) warn(`${label}: image missing, page should use fallback: ${project.image}`);
  }
  for (const id of project.relatedCases || project.cases || []) {
    if (!caseIds.has(id)) warn(`${label}: related case not found: ${id}`);
  }
  for (const id of project.relatedPackages || []) {
    if (!packageIds.has(id)) warn(`${label}: related package not found: ${id}`);
  }

  validateMarketEvidence(project, mode === "full" || (mode === "market-sample" && marketSampleIds.includes(project.id)));
}

if (mode === "full" && projects.length !== 100) fail(`projects.json must contain exactly 100 records, got ${projects.length}`);

const ids = new Set();
for (const project of projects) {
  if (ids.has(project.id)) fail(`duplicate id: ${project.id}`);
  ids.add(project.id);
}

const targetIds = mode === "sample" ? sampleIds : mode === "market-sample" ? marketSampleIds : null;
const targetProjects = targetIds ? targetIds.map((id) => projects.find((item) => item.id === id)) : projects;
if (targetIds) {
  targetProjects.forEach((project, index) => {
    if (!project) fail(`${mode} project missing: ${targetIds[index]}`);
  });
}
targetProjects.filter(Boolean).forEach(validateProject);

if (mode === "full") {
  const seenSummary = new Map();
  const seenUniqueValue = new Map();
  for (const project of projects) {
    if (seenSummary.has(project.summary)) fail(`duplicate summary: ${project.id} and ${seenSummary.get(project.summary)}`);
    seenSummary.set(project.summary, project.id);
    if (seenUniqueValue.has(project.uniqueValue)) fail(`duplicate uniqueValue: ${project.id} and ${seenUniqueValue.get(project.uniqueValue)}`);
    seenUniqueValue.set(project.uniqueValue, project.id);
  }
  const distribution = projects.reduce((acc, project) => {
    acc[project.theme] = (acc[project.theme] || 0) + 1;
    return acc;
  }, {});
  for (const [theme, count] of Object.entries(expectedDistribution)) {
    if (distribution[theme] !== count) fail(`theme distribution mismatch for ${theme}: expected ${count}, got ${distribution[theme] || 0}`);
  }

  const phraseMap = new Map();
  for (const project of projects) {
    const seenInProject = new Set();
    for (const field of coreTextFields) {
      const compact = String(project[field] || "").replace(/[^\u4e00-\u9fa5]/g, "");
      for (let i = 0; i <= compact.length - 8; i += 1) {
        seenInProject.add(compact.slice(i, i + 8));
      }
    }
    for (const phrase of seenInProject) phraseMap.set(phrase, (phraseMap.get(phrase) || 0) + 1);
  }
  [...phraseMap.entries()]
    .filter(([, count]) => count > 5)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .forEach(([phrase, count]) => warn(`high frequency phrase "${phrase}" appears in ${count} records; review for template wording`));
}

for (const warning of warnings) console.warn(`[WARN] ${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`[ERROR] ${error}`);
  process.exit(1);
}

console.log(`Project validation passed (${mode}). Records: ${projects.length}`);
