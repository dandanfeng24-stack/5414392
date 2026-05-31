"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

const nav = [
  ["非遗主题", "/themes"],
  ["数据库", "/database"],
  ["案例研究", "/cases"],
  ["智能初评", "/ai-assessment"],
  ["资料包", "/packages"],
  ["方法论", "/methodology"],
  ["服务与交付", "/services"],
  ["项目诊断", "/diagnosis"]
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/[0.14] bg-warmblack/[0.86] backdrop-blur-sm">
      <div className="section-shell flex h-16 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3.5" onClick={closeMenu}>
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
          {user ? (
            <>
              <Link
                href="/account"
                className="hidden rounded border border-paper/[0.22] bg-transparent px-4 py-2 text-sm text-paper/82 transition-colors duration-200 hover:border-gold/45 hover:text-gold/90 sm:inline-flex"
              >
                用户中心
              </Link>
              <Link
                href="/logout"
                className="hidden rounded border border-gold/[0.38] bg-gold/[0.16] px-4 py-2 text-sm text-gold/95 transition-colors duration-200 hover:border-gold/55 hover:bg-gold/[0.24] hover:text-paper sm:inline-flex"
              >
                退出
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded border border-paper/[0.22] bg-transparent px-4 py-2 text-sm text-paper/82 transition-colors duration-200 hover:border-gold/45 hover:text-gold/90 sm:inline-flex"
              >
                登录
              </Link>
              <Link
                href="/register"
                className="hidden rounded border border-gold/[0.38] bg-gold/[0.16] px-4 py-2 text-sm text-gold/95 transition-colors duration-200 hover:border-gold/55 hover:bg-gold/[0.24] hover:text-paper sm:inline-flex"
              >
                注册
              </Link>
            </>
          )}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-paper/[0.16] text-paper/64 transition-colors duration-200 hover:border-gold/40 hover:text-gold/85 md:hidden"
            aria-label={isMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="border-t border-gold/[0.14] bg-warmblack/[0.96] shadow-[0_18px_40px_rgba(0,0,0,0.28)] md:hidden">
          <nav className="section-shell grid gap-2 py-4 text-sm tracking-[0.08em] text-linen/86">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded border border-transparent px-3 py-2 transition-colors duration-200 hover:border-gold/[0.22] hover:bg-gold/[0.06] hover:text-gold/90"
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-3 border-t border-paper/[0.10] pt-4">
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="rounded border border-paper/[0.22] px-4 py-2 text-center text-paper/82 transition-colors duration-200 hover:border-gold/45 hover:text-gold/90"
                    onClick={closeMenu}
                  >
                    用户中心
                  </Link>
                  <Link
                    href="/logout"
                    className="rounded border border-gold/[0.38] bg-gold/[0.16] px-4 py-2 text-center text-gold/95 transition-colors duration-200 hover:border-gold/55 hover:bg-gold/[0.24] hover:text-paper"
                    onClick={closeMenu}
                  >
                    退出
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded border border-paper/[0.22] px-4 py-2 text-center text-paper/82 transition-colors duration-200 hover:border-gold/45 hover:text-gold/90"
                    onClick={closeMenu}
                  >
                    登录
                  </Link>
                  <Link
                    href="/register"
                    className="rounded border border-gold/[0.38] bg-gold/[0.16] px-4 py-2 text-center text-gold/95 transition-colors duration-200 hover:border-gold/55 hover:bg-gold/[0.24] hover:text-paper"
                    onClick={closeMenu}
                  >
                    注册
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
