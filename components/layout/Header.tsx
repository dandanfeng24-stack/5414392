import Link from "next/link";
import { Menu, Search } from "lucide-react";

const nav = [
  ["六大主题", "/#themes"],
  ["数据库", "/database"],
  ["案例研究", "/cases"],
  ["AI初评", "/ai-assessment"],
  ["资料包", "/packages"],
  ["方法论", "/methodology"]
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-paper/10 bg-ink/78 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center overflow-hidden rounded border border-gold/30 bg-charcoal/70 shadow-[0_0_24px_rgba(184,154,94,.12)]">
            <img
              src="/images/brand/zaowu-vessel-logo.png"
              alt="非遗造物"
              className="h-8 w-8 object-cover opacity-90"
            />
          </span>
          <span className="font-serif text-xl tracking-[0.18em] text-paper">非遗造物</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-linen md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-gold">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/database"
            className="hidden rounded border border-gold/50 px-4 py-2 text-sm text-gold transition hover:bg-gold hover:text-ink sm:inline-flex"
          >
            进入数据库
          </Link>
          <Search aria-hidden className="h-5 w-5 text-paper/65" />
          <Menu aria-hidden className="h-5 w-5 text-paper/65" />
        </div>
      </div>
    </header>
  );
}
