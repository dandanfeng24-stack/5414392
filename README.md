# 非遗造物 MVP

中国非遗产品化与文旅转化研究平台 MVP。项目使用 Next.js App Router、React、TypeScript、Tailwind CSS，页面以静态生成和 JSON 数据驱动为主。

## 在线预览

当前生产预览地址：

[https://feiyi-zaowu.vercel.app](https://feiyi-zaowu.vercel.app)

备用部署地址：

[https://feiyi-zaowu-pin5ug5vl-feiyi.vercel.app](https://feiyi-zaowu-pin5ug5vl-feiyi.vercel.app)

GitHub 仓库本身只保存代码，不直接提供网站预览页面。请使用上面的 Vercel 地址访问网站。

## Vercel 部署设置

在 Vercel 导入 `dandanfeng24-stack/5414392` 仓库时，使用以下设置：

```text
Framework Preset: Next.js
Install Command: npm install
Build Command: npm run build
Output Directory: 留空，使用 Next.js default
Root Directory: /
```

环境变量无需填写。部署成功后，Vercel 项目页会显示可访问的 Preview/Production URL。


## 数据修改

主要内容文件：

- `data/themes.json`：非遗主题
- `data/projects.json`：非遗项目与研究档案
- `data/cases.json`：案例研究
- `data/rankings.json`：产品化榜单
- `data/tags.json`：标签体系
- `data/packages.json`：资料包
- `data/ai-rules.json`：AI 初评本地规则

修改 JSON 后重新运行开发服务器即可查看更新。数据类型定义在 `lib/types.ts`。

## 页面路由

- `/`：首页
- `/themes`：非遗主题总览
- `/themes/[id]`：非遗主题页
- `/database`：非遗产品化数据库
- `/projects/[id]`：项目研究档案
- `/cases`：案例列表
- `/cases/[id]`：案例详情
- `/ai-assessment`：AI 项目初评演示
- `/packages`：资料包列表
- `/packages/[id]`：资料包落地页
- `/methodology`：关于与方法论
- `/ai-factory`：AI 内容工厂预留

## MVP 边界

首版不接支付系统、复杂会员、真实 AI API、爬虫、多用户后台和 APP。AI 初评为本地规则模拟，资料包只保留预约或样张入口。

## 部署说明

项目已按 Vercel 原生 Next.js 部署方式配置。不要把 Output Directory 设置为 `out`，否则 Vercel 会找不到 Next.js 的构建清单。
