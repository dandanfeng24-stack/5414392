import type { Metadata } from "next";
import { ThemeCard } from "@/components/cards/ThemeCard";
import { themes } from "@/lib/data";

export const metadata: Metadata = {
  title: "非遗主题 | 非遗造物",
  description: "持续扩展的非遗主题聚合入口，围绕不同非遗主题进入项目研究、场景判断与产品化方向。"
};

export default function ThemesPage() {
  return (
    <div className="section-shell py-16">
      <section className="surface rounded p-8">
        <div className="text-sm text-gold">非遗主题</div>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-paper">非遗主题</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-linen">
          这里不是固定数量的主题清单，而是持续扩展的非遗主题聚合入口。当前页面先展示平台正在重点研究的主题方向，后续可继续接入新的非遗门类、地域专题和文旅场景主题。
        </p>
      </section>

      <section className="mt-12">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm text-gold">当前重点主题</div>
            <h2 className="mt-2 font-serif text-3xl text-paper">从主题入口进入项目库</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-linen">
            非遗主题不是独立数据库，而是面向项目库的主题化筛选入口，用于帮助项目方快速理解不同非遗方向的产品化、体验化和场景适配可能。
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {themes.map((theme, index) => <ThemeCard key={theme.id} theme={theme} index={index} />)}
        </div>
      </section>
    </div>
  );
}
