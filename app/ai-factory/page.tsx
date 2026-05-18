import { SectionHeading } from "@/components/ui/SectionHeading";

const modules = [
  "创建AI内容任务",
  "生成项目草稿",
  "生成案例草稿",
  "生成榜单草稿",
  "生成资料包草稿",
  "进入后台审核队列"
];

export default function AiFactoryPage() {
  return (
    <div className="section-shell py-16">
      <SectionHeading
        title="AI内容工厂预留"
        description="首版仅保留结构说明，不实现真实自动检索、后台、多用户队列或自动发布。"
      />
      <div className="surface rounded p-8">
        <div className="grid gap-4 md:grid-cols-3">
          {modules.map((module) => (
            <div key={module} className="rounded border border-paper/10 bg-ink/50 p-5 text-paper">
              {module}
              <p className="mt-3 text-sm leading-6 text-linen">后续可接入后台任务、AI 草稿生成、人工审核与 JSON/数据库同步。</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
