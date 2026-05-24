# 项目封面图接入报告

更新时间：2026-05-24T13:29:19.691Z

## 结果

- 成功写入 image 的项目数量：70
- 未找到的项目 id：无
- 图片文件缺失的项目 id：无
- 仍然回退到占位图的目标项目 id：无

## 修改文件

- data/projects.json
- reports/project-cover-image-update.md

## 确认项

- 仅按项目 id 精确写入 image 字段。
- 原有 30 条非目标项目图片路径未被覆盖。
- 评分字段快照比对通过，未修改 score、scores、totalScore、conversionGrade、scoreReason、scoreExplanation、scoreDetails。
- manifest.csv 和 README.txt 未参与页面引用。

## 构建检查

- node scripts/validate-projects.js：待运行
- npm.cmd run build：待运行
