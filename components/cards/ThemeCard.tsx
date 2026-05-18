import Link from "next/link";
import type { Theme } from "@/lib/types";

export function ThemeCard({ theme, index }: { theme: Theme; index: number }) {
  const imageClass = {
    "tea-life": "theme-tea",
    "ceramic-craft": "theme-ceramic",
    "textile-pattern": "theme-textile",
    "local-flavor": "theme-food",
    "craft-study": "theme-craft",
    "guofeng-photo": "theme-photo"
  }[theme.id] ?? "theme-tea";

  return (
    <Link
      href={`/themes/${theme.id}`}
      className="quiet-hover group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded surface p-5"
    >
      <div className={`theme-image ${imageClass}`} />
      <div className="relative z-10 mb-auto flex items-center justify-between text-sm text-paper/70">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="grid h-6 w-6 place-items-center rounded-full border border-paper/35 transition group-hover:border-gold group-hover:text-gold">+</span>
      </div>
      <h3 className="relative z-10 font-serif text-2xl text-paper">{theme.shortName}</h3>
      <p className="relative z-10 mt-3 line-clamp-3 text-sm leading-6 text-linen">{theme.description}</p>
      <div className="relative z-10 mt-5 flex flex-wrap gap-2">
        {theme.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs text-paper/65">{tag}</span>
        ))}
      </div>
    </Link>
  );
}
