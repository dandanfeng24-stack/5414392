const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const projects = JSON.parse(fs.readFileSync(path.join(root, "data/projects.json"), "utf8"));
const cases = JSON.parse(fs.readFileSync(path.join(root, "data/cases.json"), "utf8"));
const packages = JSON.parse(fs.readFileSync(path.join(root, "data/packages.json"), "utf8"));

const mode = process.argv.includes("--sample") ? "sample" : "full";
const allowedGrades = new Set(["A", "B", "C", "D"]);
const allowedStatus = new Set(["AI 初稿", "人工初审", "已复核", "待补充", "待核验"]);
const allowedVerification = new Set(["已核验", "部分核验", "待核验"]);
const bannedPlaceholders = ["TODO", "待填写", "Lorem", "example.com", "随便补充"];
const coreTextFields = ["summary", "uniqueValue", "scoreReason", "scoreExplanation", "operationNotes", "riskExplanation"];
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
  if (field !== "sourceNotes" && value.trim() === "待补充") fail(`${label}: ${field} should not use 待补充 as data content`);
}

function validateProject(project, index) {
  const label = project.id || project.name || `index ${index}`;
  for (const key of ["id", "name", "theme", "summary", "conversionGrade", "score"]) {
    if (!project[key]) fail(`${label}: missing ${key}`);
  }
  if (!allowedGrades.has(project.conversionGrade)) fail(`${label}: invalid conversionGrade ${project.conversionGrade}`);
  if (!project.score || typeof project.score.total !== "number") fail(`${label}: score.total must be a number`);
  if (!project.contentStatus) fail(`${label}: contentStatus is required`);
  if (project.contentStatus && !allowedStatus.has(project.contentStatus)) fail(`${label}: invalid contentStatus ${project.contentStatus}`);
  for (const field of coreTextFields) {
    if (!hasText(project[field])) fail(`${label}: ${field} is required`);
    checkNoPlaceholder(label, field, project[field]);
  }
  if (!isArray(project.sourceLinks)) fail(`${label}: sourceLinks must be an array`);
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
}

if (mode === "full" && projects.length !== 100) fail(`projects.json must contain exactly 100 records, got ${projects.length}`);

const ids = new Set();
for (const project of projects) {
  if (ids.has(project.id)) fail(`duplicate id: ${project.id}`);
  ids.add(project.id);
}

const targetProjects = mode === "sample" ? sampleIds.map((id) => projects.find((item) => item.id === id)) : projects;
if (mode === "sample") {
  targetProjects.forEach((project, index) => {
    if (!project) fail(`sample project missing: ${sampleIds[index]}`);
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
