# 江西省国家级非物质文化遗产代表性项目官方清单

## 数据状态

- 状态：需人工复核
- 采集日期：2026-06-02
- 主数据源：中国非物质文化遗产网-国家级非物质文化遗产代表性项目名录
- 来源链接：https://www.ihchina.cn/project.html
- 筛选条件：所属地区为“江西省”，批次/类别/类型均为全部

## 本次处理说明

本轮仅建立江西省国家级非遗官方清单的数据底稿结构和人工复核报告模板，暂未写入任何项目记录。

原因：国家非遗官网为动态筛选页面，当前本地环境无法稳定自动读取江西省筛选后的完整表格结果。2026-06-02 再次尝试读取江西筛选页时，本地环境仍无法连接到远程服务器。为避免误录、漏录或用第三方资料补写，本次不生成猜测数据，不使用百科、新闻稿或第三方整理表覆盖官网字段。

后续人工复核时，应直接在中国非物质文化遗产网“国家级非物质文化遗产代表性项目名录”页面中筛选“江西省”，再按官网表格逐条录入。

## 统计

- 记录总数：0
- 目标核验口径：江西省国家级非遗代表性项目 88 项
- 官网当前可自动核验条数：未能稳定获取
- 类别统计：待人工录入后生成
- 批次统计：待人工录入后生成
- 新增项目 / 扩展项目统计：待人工录入后生成

## JSON 字段模板

录入到 `data/official-ich/jiangxi-national.json` 时，每条记录使用以下结构：

```json
{
  "officialId": "jx-national-001",
  "province": "江西省",
  "serialNo": "",
  "projectNo": "",
  "officialCode": "",
  "name": "",
  "category": "",
  "batchYear": null,
  "batchName": "",
  "rawBatch": "",
  "itemType": "",
  "isExtension": false,
  "applicantRegionOrUnit": "",
  "protectionUnit": "",
  "rawApplicant": "",
  "rawProtectionUnit": "",
  "sourceName": "中国非物质文化遗产网-国家级非物质文化遗产代表性项目名录",
  "sourceUrl": "https://www.ihchina.cn/project.html",
  "collectedAt": "2026-06-02"
}
```

## 人工录入表头模板

| officialId | province | serialNo | projectNo | officialCode | name | category | batchYear | batchName | rawBatch | itemType | isExtension | applicantRegionOrUnit | protectionUnit | rawApplicant | rawProtectionUnit | sourceName | sourceUrl | collectedAt |
|---|---|---|---|---|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|
| jx-national-001 | 江西省 |  |  |  |  |  |  |  |  |  | false |  |  |  |  | 中国非物质文化遗产网-国家级非物质文化遗产代表性项目名录 | https://www.ihchina.cn/project.html | 2026-06-02 |

## 官网字段映射

| 官网字段 | 本地字段 | 说明 |
|---|---|---|
| 序号 | serialNo | 按官网表格原文录入 |
| 项目序号 | projectNo | 按官网表格原文录入 |
| 编号 | officialCode | 国家级项目编号 |
| 名称 | name | 项目或子项名称 |
| 类别 | category | 例如传统技艺、传统美术、民俗等 |
| 公布时间 / 批次 | rawBatch | 保留官网原文 |
| 公布时间 / 批次 | batchYear / batchName | 可从原文拆分；无法可靠拆分时 batchYear 设为 null |
| 类型 | itemType / isExtension | itemType 按官网原文；若为扩展项目则 isExtension 为 true |
| 申报地区或单位 | applicantRegionOrUnit / rawApplicant | 标准化字段和原文字段保持一致 |
| 保护单位 | protectionUnit / rawProtectionUnit | 标准化字段和原文字段保持一致 |

## 复核规则

1. 以官网“所属地区：江西省”筛选结果为准。
2. 以官网表格中的子项为最小记录单位，不按项目名称自行合并。
3. 不使用第三方来源覆盖官网字段。
4. 扩展项目需要保留，并将 `isExtension` 设置为 `true`。
5. `officialId` 按官网结果顺序生成：`jx-national-001`、`jx-national-002`、`jx-national-003`。
6. 录入后应抽查至少 10 条，核对编号、名称、类别、批次、类型、申报地区或单位、保护单位是否错位。
