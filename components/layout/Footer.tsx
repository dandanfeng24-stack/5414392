import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink/80 py-12">
      <div className="section-shell grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="font-serif text-2xl tracking-[0.16em] text-paper">非遗造物</div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-linen">
            中国非遗产品化与文旅转化研究平台。本站内容用于研究参考，不构成投资、法律、财务或商业保证建议。
          </p>
        </div>
        <div className="space-y-3 text-sm text-linen">
          <Link className="block hover:text-gold" href="/database">非遗产品化数据库</Link>
          <Link className="block hover:text-gold" href="/ai-assessment">AI项目初评</Link>
          <Link className="block hover:text-gold" href="/ai-factory">AI内容工厂预留</Link>
        </div>
        <div className="text-sm leading-7 text-linen">
          联系方式：contact@example.com
          <br />
          内容状态：MVP 示例数据
          <br />
          © 2026 非遗造物
        </div>
      </div>
    </footer>
  );
}
