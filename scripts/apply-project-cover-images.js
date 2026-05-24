const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const projectsPath = path.join(root, "data", "projects.json");
const reportsDir = path.join(root, "reports");
const reportPath = path.join(reportsDir, "project-cover-image-update.md");

const mapping = {
  "anji-white-tea": "/images/projects/project-001-anji-white-tea.png",
  "huangshan-maofeng": "/images/projects/project-002-huangshan-maofeng.png",
  "xinyang-maojian": "/images/projects/project-003-xinyang-maojian.png",
  "fuzhou-jasmine-tea": "/images/projects/project-004-fuzhou-jasmine-tea.png",
  "chaozhou-gongfu-tea": "/images/projects/project-005-chaozhou-gongfu-tea.png",
  "puer-tea": "/images/projects/project-006-puer-tea.png",
  "liubao-tea": "/images/projects/project-007-liubao-tea.png",
  "taiping-houkui": "/images/projects/project-008-taiping-houkui.png",
  "dehua-porcelain": "/images/projects/project-009-dehua-porcelain.png",
  "jizhou-ware": "/images/projects/project-010-jizhou-ware.png",
  "cizhou-ware": "/images/projects/project-011-cizhou-ware.png",
  "ru-porcelain": "/images/projects/project-012-ru-porcelain.png",
  "jianzhan": "/images/projects/project-013-jianzhan.png",
  "jun-porcelain": "/images/projects/project-014-jun-porcelain.png",
  "fahua-pottery": "/images/projects/project-015-fahua-pottery.png",
  "nanjing-yunjin": "/images/projects/project-016-nanjing-yunjin.png",
  "chengdu-shujin": "/images/projects/project-017-chengdu-shujin.png",
  "suzhou-songjin": "/images/projects/project-018-suzhou-songjin.png",
  "zhuang-brocade": "/images/projects/project-019-zhuang-brocade.png",
  "dong-brocade": "/images/projects/project-020-dong-brocade.png",
  "tujia-brocade": "/images/projects/project-021-tujia-brocade.png",
  "li-brocade": "/images/projects/project-022-li-brocade.png",
  "kesi-weaving": "/images/projects/project-023-kesi-weaving.png",
  "gu-embroidery": "/images/projects/project-024-gu-embroidery.png",
  "shu-embroidery": "/images/projects/project-025-shu-embroidery.png",
  "chaozhou-embroidery": "/images/projects/project-026-chaozhou-embroidery.png",
  "dali-tie-dye": "/images/projects/project-027-dali-tie-dye.png",
  "miao-batik": "/images/projects/project-028-miao-batik.png",
  "plant-dyeing": "/images/projects/project-029-plant-dyeing.png",
  "jinhua-ham": "/images/projects/project-030-jinhua-ham.png",
  "zhenjiang-vinegar": "/images/projects/project-031-zhenjiang-vinegar.png",
  "shanxi-aged-vinegar": "/images/projects/project-032-shanxi-aged-vinegar.png",
  "longkou-vermicelli": "/images/projects/project-033-longkou-vermicelli.png",
  "crossing-bridge-rice-noodles": "/images/projects/project-034-crossing-bridge-rice-noodles.png",
  "nanjing-salted-duck": "/images/projects/project-035-nanjing-salted-duck.png",
  "guilin-rice-noodles": "/images/projects/project-036-guilin-rice-noodles.png",
  "osmanthus-cake": "/images/projects/project-037-osmanthus-cake.png",
  "fermented-beancurd": "/images/projects/project-038-fermented-beancurd.png",
  "chaoshan-beef-ball": "/images/projects/project-039-chaoshan-beef-ball.png",
  "palace-lantern": "/images/projects/project-040-palace-lantern.png",
  "fan-making": "/images/projects/project-041-fan-making.png",
  "wood-carving": "/images/projects/project-042-wood-carving.png",
  "nut-carving": "/images/projects/project-043-nut-carving.png",
  "wheat-straw-painting": "/images/projects/project-044-wheat-straw-painting.png",
  "lacquer-thread-sculpture": "/images/projects/project-045-lacquer-thread-sculpture.png",
  "puppet-head-carving": "/images/projects/project-046-puppet-head-carving.png",
  "cloth-tiger": "/images/projects/project-047-cloth-tiger.png",
  "straw-plaiting": "/images/projects/project-048-straw-plaiting.png",
  "paper-flower": "/images/projects/project-049-paper-flower.png",
  "gourd-carving": "/images/projects/project-050-gourd-carving.png",
  "new-year-print-rubbing": "/images/projects/project-051-new-year-print-rubbing.png",
  "shadow-cutting": "/images/projects/project-052-shadow-cutting.png",
  "bamboo-paper-lamp": "/images/projects/project-053-bamboo-paper-lamp.png",
  "velvet-flower": "/images/projects/project-054-velvet-flower.png",
  "filigree-inlay": "/images/projects/project-055-filigree-inlay.png",
  "tongcao-flower": "/images/projects/project-056-tongcao-flower.png",
  "frog-button": "/images/projects/project-057-frog-button.png",
  "traditional-hairpin": "/images/projects/project-058-traditional-hairpin.png",
  "theatrical-makeup": "/images/projects/project-059-theatrical-makeup.png",
  "embroidered-shoes": "/images/projects/project-060-embroidered-shoes.png",
  "fish-lantern": "/images/projects/project-061-fish-lantern.png",
  "shehuo": "/images/projects/project-062-shehuo.png",
  "nuo-mask": "/images/projects/project-063-nuo-mask.png",
  "iron-flower": "/images/projects/project-064-iron-flower.png",
  "lion-dance": "/images/projects/project-065-lion-dance.png",
  "flower-lantern-festival": "/images/projects/project-066-flower-lantern-festival.png",
  "sachet-making": "/images/projects/project-067-sachet-making.png",
  "moxa-herbal-sachet": "/images/projects/project-068-moxa-herbal-sachet.png",
  "chinese-flower-arrangement": "/images/projects/project-069-chinese-flower-arrangement.png",
  "seasonal-customs": "/images/projects/project-070-seasonal-customs.png"
};

const scoringFields = [
  "score",
  "scores",
  "totalScore",
  "conversionGrade",
  "scoreReason",
  "scoreExplanation",
  "scoreDetails"
];

function fileExists(publicPath) {
  return fs.existsSync(path.join(root, "public", publicPath.replace(/^\//, "")));
}

const projects = JSON.parse(fs.readFileSync(projectsPath, "utf8"));
const byId = new Map(projects.map((project) => [project.id, project]));
const targetIds = new Set(Object.keys(mapping));
const missingProjectIds = [];
const missingImageFiles = [];
const written = [];

const scoringSnapshot = new Map();
const nonTargetImageSnapshot = new Map();
for (const project of projects) {
  scoringSnapshot.set(project.id, Object.fromEntries(scoringFields.map((field) => [field, project[field]])));
  if (!targetIds.has(project.id)) nonTargetImageSnapshot.set(project.id, project.image);
}

for (const [id, imagePath] of Object.entries(mapping)) {
  const project = byId.get(id);
  if (!project) {
    missingProjectIds.push(id);
    continue;
  }
  if (!fileExists(imagePath)) {
    missingImageFiles.push({ id, imagePath });
    continue;
  }
  project.image = imagePath;
  written.push(id);
}

for (const project of projects) {
  const snapshot = scoringSnapshot.get(project.id);
  for (const field of scoringFields) {
    if (JSON.stringify(project[field]) !== JSON.stringify(snapshot[field])) {
      throw new Error(`${project.id}: scoring field changed: ${field}`);
    }
  }
  if (!targetIds.has(project.id) && project.image !== nonTargetImageSnapshot.get(project.id)) {
    throw new Error(`${project.id}: non-target image changed`);
  }
}

const stillPlaceholder = Object.entries(mapping)
  .filter(([id]) => {
    const project = byId.get(id);
    if (!project) return false;
    return !project.image || project.image.includes("/textures/") || !fileExists(project.image);
  })
  .map(([id]) => id);

fs.writeFileSync(projectsPath, `${JSON.stringify(projects, null, 2)}\n`, "utf8");
fs.mkdirSync(reportsDir, { recursive: true });

const report = [
  "# 项目封面图接入报告",
  "",
  `更新时间：${new Date().toISOString()}`,
  "",
  "## 结果",
  "",
  `- 成功写入 image 的项目数量：${written.length}`,
  `- 未找到的项目 id：${missingProjectIds.length ? missingProjectIds.join(", ") : "无"}`,
  `- 图片文件缺失的项目 id：${missingImageFiles.length ? missingImageFiles.map((item) => `${item.id} (${item.imagePath})`).join(", ") : "无"}`,
  `- 仍然回退到占位图的目标项目 id：${stillPlaceholder.length ? stillPlaceholder.join(", ") : "无"}`,
  "",
  "## 修改文件",
  "",
  "- data/projects.json",
  "- reports/project-cover-image-update.md",
  "",
  "## 确认项",
  "",
  "- 仅按项目 id 精确写入 image 字段。",
  "- 原有 30 条非目标项目图片路径未被覆盖。",
  "- 评分字段快照比对通过，未修改 score、scores、totalScore、conversionGrade、scoreReason、scoreExplanation、scoreDetails。",
  "- manifest.csv 和 README.txt 未参与页面引用。",
  "",
  "## 构建检查",
  "",
  "- node scripts/validate-projects.js：待运行",
  "- npm.cmd run build：待运行",
  ""
].join("\n");

fs.writeFileSync(reportPath, report, "utf8");

console.log(JSON.stringify({
  written: written.length,
  missingProjectIds,
  missingImageFiles,
  stillPlaceholder
}, null, 2));
