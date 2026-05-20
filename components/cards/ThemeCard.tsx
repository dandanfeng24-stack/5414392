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
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      />
      <div className="relative z-10 mb-auto flex items-center justify-between text-sm text-paper/70 transition-colors duration-300 group-hover:text-[#c9a45a] group-focus-visible:text-[#c9a45a]">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="grid h-6 w-6 place-items-center rounded-full border border-paper/20 text-paper/35 opacity-55 transition-colors duration-300 group-hover:border-gold/55 group-hover:text-[#c9a45a] group-hover:opacity-100 group-focus-visible:border-gold/55 group-focus-visible:text-[#c9a45a] group-focus-visible:opacity-100">
          +
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 max-h-[92px] overflow-hidden border-t border-gold/[0.12] bg-[#18110a]/[0.56] p-4 backdrop-blur-[6px] transition-[max-height,background-color] duration-500 ease-out group-hover:max-h-[156px] group-hover:bg-[#18110a]/[0.72] group-focus-visible:max-h-[156px] group-focus-visible:bg-[#18110a]/[0.72]">
        <h3 className="font-serif text-2xl text-paper transition-colors duration-300 group-hover:text-[#c9a45a] group-focus-visible:text-[#c9a45a]">
          {theme.shortName}
        </h3>
        <p className="mt-2 max-h-6 overflow-hidden text-sm leading-6 text-paper/72 transition-[max-height,color] duration-500 ease-out group-hover:max-h-[72px] group-hover:text-amber-100/86 group-focus-visible:max-h-[72px] group-focus-visible:text-amber-100/86">
          {theme.description}
        </p>
        <div className="mt-3 flex max-h-0 flex-wrap gap-2 overflow-hidden opacity-0 transition-[max-height,opacity] duration-500 ease-out group-hover:max-h-12 group-hover:opacity-100 group-focus-visible:max-h-12 group-focus-visible:opacity-100">
          {theme.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs text-[#c9a45a]/65">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
