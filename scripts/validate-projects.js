const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const projects = JSON.parse(fs.readFileSync(path.join(root, "data/projects.json"), "utf8"));
const cases = JSON.parse(fs.readFileSync(path.join(root, "data/cases.json"), "utf8"));
const packages = JSON.parse(fs.readFileSync(path.join(root, "data/packages.json"), "utf8"));

const mode = process.argv.includes("--sample") ? "sample" : "full";
const allowedGrades = new Set(["A", "B", "C", "D"]);
const allowedStatus = new Set(["AI 初稿", "人工初审", "已复核", "待补充", "待核验"]);
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

function validateProject(project, index) {
  const label = project.id || project.name || `index ${index}`;
  for (const key of ["id", "name", "theme", "summary", "conversionGrade", "score"]) {
    if (!project[key]) fail(`${label}: missing ${key}`);
  }
  if (!allowedGrades.has(project.conversionGrade)) fail(`${label}: invalid conversionGrade ${project.conversionGrade}`);
  if (!project.score || typeof project.score.total !== "number") fail(`${label}: score.total must be a number`);
  if (project.contentStatus && !allowedStatus.has(project.contentStatus)) fail(`${label}: invalid contentStatus ${project.contentStatus}`);
  for (const key of ["productDirections", "experienceDirections", "bestScenes", "riskTags"]) {
    if (!isArray(project[key])) fail(`${label}: ${key} must be an array`);
  }
  for (const key of ["productDirections", "experienceDirections", "bestScenes", "riskTags", "riskControl", "priceBands"]) {
    if (isArray(project[key]) && project[key].length === 0) fail(`${label}: ${key} should not be empty`);
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
  const distribution = projects.reduce((acc, project) => {
    acc[project.theme] = (acc[project.theme] || 0) + 1;
    return acc;
  }, {});
  for (const [theme, count] of Object.entries(expectedDistribution)) {
    if (distribution[theme] !== count) fail(`theme distribution mismatch for ${theme}: expected ${count}, got ${distribution[theme] || 0}`);
  }
}

for (const warning of warnings) console.warn(`[WARN] ${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`[ERROR] ${error}`);
  process.exit(1);
}

console.log(`Project validation passed (${mode}). Records: ${projects.length}`);
