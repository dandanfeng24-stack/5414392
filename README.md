# 非遗造物 MVP

中国非遗产品化与文旅转化研究平台 MVP。项目使用 Next.js App Router、React、TypeScript、Tailwind CSS，页面以静态生成为主，内容由 `data` 目录下的 JSON 驱动。

## 在线预览

本项目推荐通过 Vercel 部署后预览。部署完成后，请使用 Vercel 自动生成的线上地址访问，例如：

```text
https://5414392-xxxx.vercel.app
```

如果已经绑定自定义域名，请使用你的正式域名访问。GitHub 仓库本身只保存代码，不直接提供网站预览页面。

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

## 本地开发预览

```bash
npm install
npm run dev
```

本地开发时打开 `http://localhost:3000` 查看网站。这个地址只在你的电脑上有效，不能用于线上分享。

如果只想预览静态导出版本，也可以运行：

```bash
npm run build
node preview-server.mjs
```

然后打开 `http://127.0.0.1:3000`。

## 数据修改

主要内容文件：

- `data/themes.json`：六大主题
- `data/projects.json`：非遗项目与研究档案
- `data/cases.json`：案例研究
- `data/rankings.json`：产品化榜单
- `data/tags.json`：标签体系
- `data/packages.json`：资料包
- `data/ai-rules.json`：AI 初评本地规则

修改 JSON 后重新运行开发服务器即可查看更新。数据类型定义在 `lib/types.ts`。

## 页面路由

- `/` 首页
- `/themes/[id]` 六大主题页
- `/database` 非遗产品化数据库
- `/projects/[id]` 项目研究档案
- `/cases` 案例列表
- `/cases/[id]` 案例详情
- `/ai-assessment` AI 项目初评演示
- `/packages` 资料包列表
- `/packages/[id]` 资料包落地页
- `/methodology` 关于与方法论
- `/ai-factory` AI 内容工厂预留

## MVP 边界

首版不接支付系统、复杂会员、真实 AI API、爬虫、多用户后台和 APP。AI 初评为本地规则模拟，资料包只保留预约或样张入口。

## 部署

可部署到支持 Next.js 的平台。正式上线前建议替换邮箱、补充真实来源链、接入已授权图片或自有视觉资产，并根据实际业务完善免责声明。
