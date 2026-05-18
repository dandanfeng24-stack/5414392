import Link from "next/link";

export function Hero() {
  return (
    <section className="grain relative min-h-[calc(100vh-64px)] overflow-hidden border-b border-paper/10">
      <div className="hero-light pointer-events-none absolute left-[7%] top-0 h-56 w-[42rem] -rotate-12 bg-gradient-to-r from-transparent via-gold/18 to-transparent blur-2xl" />
      <div className="pointer-events-none absolute right-0 top-12 h-64 w-96 bg-[radial-gradient(circle,rgba(184,154,94,0.12),transparent_62%)] blur-xl" />
      <div className="section-shell relative grid min-h-[calc(100vh-64px)] items-center gap-10 py-20 lg:grid-cols-[1fr_0.95fr]">
        <div className="relative z-10">
          <h1 className="font-serif text-6xl leading-tight text-gold md:text-8xl">非遗造物</h1>
          <p className="mt-7 max-w-3xl font-serif text-3xl leading-snug text-paper md:text-5xl">
            中国非遗产品化与文旅转化研究平台
          </p>
          <p className="mt-8 max-w-2xl whitespace-pre-line text-base leading-8 text-linen md:text-lg">
            研究中国非遗如何转化为产品、{"\n"}空间、体验、研学与文旅消费场景。
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/database" className="rounded bg-gold px-8 py-3 text-sm text-ink transition hover:bg-paper">
              进入数据库
            </Link>
            <Link href="#themes" className="rounded border border-paper/25 px-8 py-3 text-sm text-paper transition hover:border-gold hover:text-gold">
              探索六大主题
            </Link>
          </div>
        </div>
        <div className="relative min-h-[520px]">
          <div className="absolute right-10 top-6 h-16 w-80 rotate-12 rounded-full bg-[radial-gradient(circle,rgba(232,221,197,.32),transparent_64%)] opacity-60 blur-md" />
          <div className="absolute right-0 top-4 hidden h-40 w-72 rotate-12 border-t border-gold/25 lg:block">
            <span className="absolute right-7 top-1 h-2 w-2 rounded-full bg-gold/70 shadow-[0_0_22px_rgba(184,154,94,.6)]" />
            <span className="absolute right-24 top-5 h-1.5 w-1.5 rounded-full bg-paper/50" />
            <span className="absolute right-36 top-1 h-1 w-1 rounded-full bg-gold/60" />
          </div>
          <div className="steam left-[44%]" />
          <div className="steam left-[50%]" style={{ animationDelay: "1.7s" }} />
          <div className="steam left-[56%]" style={{ animationDelay: "3.1s" }} />
          <div className="hero-object absolute bottom-16 left-1/2 h-48 w-[25rem] -translate-x-1/2 rounded-[50%] border border-gold/20 bg-[radial-gradient(ellipse_at_center,rgba(232,221,197,.16),rgba(11,10,8,.2)_42%,transparent_66%)] shadow-[0_26px_80px_rgba(0,0,0,.65)]" />
          <div className="hero-object absolute bottom-32 left-1/2 h-36 w-80 -translate-x-1/2 overflow-hidden rounded-b-[84px] rounded-t-[22px] border border-paper/12 bg-gradient-to-br from-[#342E24] via-[#11100D] to-[#050504] shadow-[0_28px_90px_rgba(0,0,0,.75)]">
            <div className="absolute inset-x-7 top-7 h-12 rounded-[50%] border-t border-gold/60 bg-gradient-to-b from-paper/10 to-transparent" />
            <div className="absolute left-14 top-14 h-16 w-36 rounded-full border-t border-paper/15" />
            <div className="absolute right-16 top-14 h-20 w-7 rotate-45 rounded bg-gradient-to-b from-gold to-[#6F5425] blur-[.4px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_32%,rgba(232,221,197,.16),transparent_18%),repeating-linear-gradient(35deg,rgba(232,221,197,.035)_0_1px,transparent_1px_12px)]" />
          </div>
          <div className="absolute bottom-24 left-1/2 h-2 w-[34rem] -translate-x-1/2 rounded-full bg-gold/20 blur-sm" />
          <div className="absolute right-2 top-14 hidden max-w-28 border-l border-paper/20 pl-5 text-xs leading-6 text-linen lg:block">
            让非遗<br />走进当代生活<br />创造未来价值
          </div>
        </div>
      </div>
    </section>
  );
}
