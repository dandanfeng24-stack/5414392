import Link from "next/link";

export function Hero() {
  return (
    <section className="hero-paper-texture relative min-h-[calc(100vh-64px)] overflow-hidden border-b border-paper/10">
      <div className="hero-light pointer-events-none absolute left-[4%] top-0 h-52 w-[38rem] -rotate-12 bg-gradient-to-r from-transparent via-gold/12 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(184,154,94,0.10),transparent_66%)] blur-3xl" />
      <div className="hero-tea-steam pointer-events-none" aria-hidden="true">
        <span className="hero-steam hero-steam-a" />
        <span className="hero-steam hero-steam-b" />
        <span className="hero-steam hero-steam-c" />
      </div>
      <div className="section-shell relative grid min-h-[calc(100vh-64px)] items-center gap-10 py-20 lg:grid-cols-[0.92fr_1fr]">
        <div className="relative z-10 max-w-3xl">
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
            <Link
              href="#themes"
              className="rounded border border-paper/25 px-8 py-3 text-sm text-paper transition hover:border-gold hover:text-gold"
            >
              探索六大主题
            </Link>
          </div>
        </div>

        <div className="relative hidden min-h-[520px] lg:block">
          <div className="absolute right-2 top-14 max-w-28 border-l border-paper/15 pl-5 text-xs leading-6 text-linen/80">
            让非遗<br />走进当代生活<br />创造未来价值
          </div>
        </div>
      </div>
    </section>
  );
}
