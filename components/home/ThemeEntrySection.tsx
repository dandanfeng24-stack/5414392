import { ThemeCard } from "@/components/cards/ThemeCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Theme } from "@/lib/types";

export function ThemeEntrySection({ themes }: { themes: Theme[] }) {
  return (
    <section id="themes" className="border-b border-paper/10 py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[220px_1fr]">
        <div>
          <SectionHeading
            eyebrow="六大主题"
            title="探索非遗的多元可能"
            description="从传统技艺到当代生活方式，从文化传承到产业创新，发现非遗的无限价值。"
          />
          <a className="inline-flex rounded border border-paper/25 px-6 py-3 text-sm text-paper hover:border-gold hover:text-gold" href="/database">
            查看全部主题
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {themes.map((theme, index) => <ThemeCard key={theme.id} theme={theme} index={index} />)}
        </div>
      </div>
    </section>
  );
}
