import Link from "next/link";
import { Menu, Search } from "lucide-react";

const nav = [
  ["非遗主题", "/themes"],
  ["数据库", "/database"],
  ["案例研究", "/cases"],
  ["AI初评", "/ai-assessment"],
  ["资料包", "/packages"],
  ["方法论", "/methodology"],
  ["服务与交付", "/services"],
  ["项目诊断", "/diagnosis"]
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/[0.14] bg-warmblack/[0.86] backdrop-blur-sm">
      <div className="section-shell flex h-16 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3.5">
          <span className="grid h-9 w-9 place-items-center overflow-hidden rounded border border-gold/[0.22] bg-ink/80 shadow-[0_0_14px_rgba(184,154,94,.08)]">
            <img
              src="/images/brand/logo-icon.png"
              alt="非遗造物"
              className="h-8 w-8 object-contain opacity-100"
            />
          </span>
          <span className="font-serif text-xl font-medium tracking-[0.2em] text-paper/90">非遗造物</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium tracking-[0.08em] text-linen/82 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="transition-colors duration-200 hover:text-gold/90">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/database"
            className="hidden rounded border border-gold/[0.38] bg-gold/[0.04] px-4 py-2 text-sm text-gold/90 transition-colors duration-200 hover:border-gold/55 hover:bg-gold/[0.09] hover:text-paper sm:inline-flex"
          >
            进入数据库
          </Link>
          <Search aria-hidden className="h-5 w-5 text-paper/58 transition-colors duration-200 hover:text-gold/80" />
          <Menu aria-hidden className="h-5 w-5 text-paper/58 transition-colors duration-200 hover:text-gold/80" />
        </div>
      </div>
    </header>
  );
}
