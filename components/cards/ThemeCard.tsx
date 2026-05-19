import Link from "next/link";
import type { Theme } from "@/lib/types";

const fallbackImage = "/images/textures/dark-paper.png";
const themeImages: Record<string, string> = {
  "tea-life": "/images/themes/tea.jpg",
  "ceramic-craft": "/images/themes/ceramics.jpg",
  "textile-pattern": "/images/themes/textile.jpg",
  "local-flavor": "/images/themes/food.jpg",
  "craft-study": "/images/themes/craft.jpg",
  "guofeng-photo": "/images/themes/zanhua.jpg"
};

export function ThemeCard({ theme, index }: { theme: Theme; index: number }) {
  const image = themeImages[theme.id] || theme.image || fallbackImage;

  return (
    <Link
      href={`/themes/${theme.id}`}
      className="image-card-text quiet-hover group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded surface p-5"
    >
      <div
        className="theme-image"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(232,221,197,.03), rgba(184,154,94,.08)), url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      />
      <div className="relative z-10 mb-auto flex items-center justify-between text-sm text-paper/70">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="grid h-6 w-6 place-items-center rounded-full border border-paper/35 transition group-hover:border-gold group-hover:text-gold">
          +
        </span>
      </div>
      <h3 className="relative z-10 font-serif text-2xl text-paper">{theme.shortName}</h3>
      <p className="relative z-10 mt-3 line-clamp-3 text-sm leading-6 text-linen">{theme.description}</p>
      <div className="relative z-10 mt-5 flex flex-wrap gap-2">
        {theme.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs text-paper/65">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
