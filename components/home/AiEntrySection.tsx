import Link from "next/link";

export function AiEntrySection() {
  return (
    <section className="border-y border-paper/10 py-20">
      <div className="section-shell grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="text-sm text-gold">AI项目初评</div>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-paper">不是聊天机器人，而是结构化项目判断工作台。</h2>
          <p className="mt-5 text-base leading-8 text-linen">
            输入地区、项目类型、客群、预算、目标和本地文化资源，系统用本地规则生成适配度、推荐方向、风险提示和资料包建议。
          </p>
          <Link href="/ai-assessment" className="mt-8 inline-flex rounded bg-gold px-6 py-3 text-sm text-ink hover:bg-paper">开始初评</Link>
        </div>
        <div className="surface rounded p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {["地区", "项目类型", "目标客群", "预算", "目标", "本地文化资源"].map((label) => (
              <div key={label} className="rounded border border-paper/10 bg-ink/45 p-4 text-sm text-linen">{label}</div>
            ))}
          </div>
          <div className="mt-5 rounded border border-gold/25 bg-gold/10 p-5 text-sm leading-7 text-paper">
            适配度结论 · 推荐非遗方向 · 风险提示 · 场景建议 · 推荐案例 · 推荐资料包
          </div>
        </div>
      </div>
    </section>
  );
}
