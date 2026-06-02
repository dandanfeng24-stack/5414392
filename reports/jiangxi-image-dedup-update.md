# 江西项目图片去重生成与接入报告

更新时间：2026-06-02

## 处理范围

本轮只处理 12 个江西项目的封面图生成与 `image` 字段接入：

- `qianshan-liansi-paper`
- `jingdezhen-kiln-workshop`
- `porcelain-panel-painting`
- `xiabu-weaving-jiangxi`
- `xiabu-embroidery`
- `wengang-brush`
- `xiushui-inkstone`
- `shicheng-inkstone`
- `ninghong-tea`
- `wuyuan-green-tea`
- `zhangshu-medicine`
- `gannan-hakka-costume`

未修改页面结构、组件逻辑、CSS、评分、项目名称、分类、地区、等级或排序。

## 初始重复图片审计

更新前，以下图片路径被多个项目复用：

| 图片路径 | 复用项目 |
|---|---|
| `/images/projects/huizhou-ink.png` | `huizhou-ink`、`wengang-brush`、`xiushui-inkstone`、`shicheng-inkstone` |
| `/images/projects/jingdezhen-porcelain.png` | `jingdezhen-porcelain`、`jingdezhen-kiln-workshop`、`porcelain-panel-painting` |
| `/images/projects/wuyi-rock-tea.png` | `wuyi-rock-tea`、`ninghong-tea` |
| `/images/projects/blue-calico.png` | `blue-calico`、`xiabu-weaving-jiangxi` |

同时，目标项目还曾通过不同文件名复用旧图内容：

| 目标项目 | 原图片 |
|---|---|
| `qianshan-liansi-paper` | `/images/projects/paper-making.png` |
| `wuyuan-green-tea` | `/images/projects/jingshan-tea.png` |
| `xiabu-embroidery` | `/images/projects/suzhou-embroidery.png` |
| `gannan-hakka-costume` | `/images/projects/hanfu-makeup.png` |
| `zhangshu-medicine` | `/images/projects/incense-making.png` |

## 成功生成并接入

以下项目已生成独立图片并更新 `data/projects.json` 的 `image` 字段：

| 项目 id | 新图片路径 |
|---|---|
| `qianshan-liansi-paper` | `/images/projects/qianshan-liansi-paper.png` |
| `jingdezhen-kiln-workshop` | `/images/projects/jingdezhen-kiln-workshop.png` |
| `porcelain-panel-painting` | `/images/projects/porcelain-panel-painting.png` |
| `xiabu-weaving-jiangxi` | `/images/projects/xiabu-weaving-jiangxi.png` |
| `xiabu-embroidery` | `/images/projects/xiabu-embroidery.png` |
| `wengang-brush` | `/images/projects/wengang-brush.png` |
| `xiushui-inkstone` | `/images/projects/xiushui-inkstone.png` |
| `shicheng-inkstone` | `/images/projects/shicheng-inkstone.png` |
| `ninghong-tea` | `/images/projects/ninghong-tea.png` |
| `wuyuan-green-tea` | `/images/projects/wuyuan-green-tea.png` |
| `zhangshu-medicine` | `/images/projects/zhangshu-medicine.png` |
| `gannan-hakka-costume` | `/images/projects/gannan-hakka-costume.png` |

## 异常与缺失

- 未找到的项目 id：无。
- 图片文件缺失的项目 id：无。
- 生成失败或图片明显跑题的项目 id：无。
- 仍然复用旧图的目标项目 id：无。

## 更新后重复检查

- 路径复用检查：当前项目库实际引用的 `image` 路径无重复。
- 文件内容重复检查：当前项目库实际引用图片的 SHA256 无重复。
- 其它非目标重复图片路径：无。

说明：图片目录中可能仍存在未被项目引用的旧别名重复文件，本轮未清理，符合“不删除旧图片”的限制。

## 修改文件

- `data/projects.json`
- `public/images/projects/qianshan-liansi-paper.png`
- `public/images/projects/jingdezhen-kiln-workshop.png`
- `public/images/projects/porcelain-panel-painting.png`
- `public/images/projects/xiabu-weaving-jiangxi.png`
- `public/images/projects/xiabu-embroidery.png`
- `public/images/projects/wengang-brush.png`
- `public/images/projects/xiushui-inkstone.png`
- `public/images/projects/shicheng-inkstone.png`
- `public/images/projects/ninghong-tea.png`
- `public/images/projects/wuyuan-green-tea.png`
- `public/images/projects/zhangshu-medicine.png`
- `public/images/projects/gannan-hakka-costume.png`
- `reports/jiangxi-image-dedup-update.md`

## 限制确认

- 未覆盖原有老项目图片：是。
- 未删除旧图片：是。
- 未修改评分字段：是。
- 未修改项目名称、分类、地区、等级、排序：是。
- 未修改页面结构、组件逻辑或 CSS：是。
- 未上传 GitHub、未提交 commit：是。

## 验证结果

- `node scripts/validate-projects.js`：通过。
  - 仅出现项目库原有高频模板用语警告，不影响校验通过。
- `npm.cmd run build`：通过。
- 页面关键词 HTTP 检查：未完成，原因是当前本地开发服务未响应；正式构建已确认 `/database` 与 112 个项目详情页可生成。
