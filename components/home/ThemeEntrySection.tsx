import { ThemeCard } from "@/components/cards/ThemeCard";
import type { Theme } from "@/lib/types";

export function ThemeEntrySection({ themes }: { themes: Theme[] }) {
  return (
    <section id="themes" className="border-b border-paper/10 py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[220px_1fr]">
        <div>
          <div className="mb-8 max-w-3xl">
            <div className="mb-3 text-sm text-gold">当前重点主题</div>
            <h2 className="font-serif text-3xl leading-tight text-paper md:text-5xl">
              <span className="md:hidden">探索非遗的多元可能</span>
              <span className="hidden md:inline">
                探索非遗
                <br />
                的多元可能
              </span>
            </h2>
            <p className="mt-4 text-base leading-8 text-linen">
              从传统技艺到当代生活方式，从文化传承到产业创新，发现非遗的无限价值。
            </p>
          </div>
          <a className="inline-flex rounded border border-paper/25 px-6 py-3 text-sm text-paper hover:border-gold hover:text-gold" href="/themes">
            查看非遗主题入口
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {themes.map((theme, index) => <ThemeCard key={theme.id} theme={theme} index={index} />)}
        </div>
      </div>
    </section>
  );
}
