import Link from "next/link";

export function Hero() {
  return (
    <section className="hero-paper-texture grain relative min-h-[calc(100vh-64px)] overflow-hidden border-b border-paper/10">
      <div className="hero-light pointer-events-none absolute left-[5%] top-0 h-56 w-[42rem] -rotate-12 bg-gradient-to-r from-transparent via-gold/18 to-transparent blur-2xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(184,154,94,0.16),transparent_64%)] blur-2xl" />
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
            <Link
              href="#themes"
              className="rounded border border-paper/25 px-8 py-3 text-sm text-paper transition hover:border-gold hover:text-gold"
            >
              探索六大主题
            </Link>
          </div>
        </div>

        <div className="relative min-h-[520px]">
          <div className="absolute right-2 top-14 hidden max-w-28 border-l border-paper/20 pl-5 text-xs leading-6 text-linen lg:block">
            让非遗<br />走进当代生活<br />创造未来价值
          </div>
          <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(184,154,94,.15),rgba(11,10,8,.08)_42%,transparent_68%)] blur-xl" />
          <div className="absolute bottom-14 left-1/2 h-3 w-[30rem] -translate-x-1/2 rounded-full bg-gold/20 blur-md" />
          <div className="vessel-float absolute left-1/2 top-1/2 w-[min(430px,82vw)] -translate-x-1/2 -translate-y-1/2">
            <img
              src="/images/hero/hero-vessel.png"
              alt="瓶器山水暗金浮雕标识"
              className="w-full select-none rounded-[6px] object-contain opacity-95 shadow-[0_34px_110px_rgba(0,0,0,.55)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
