import Link from "next/link";

const heroCtas = [
  { label: "获取非遗商业化诊断", href: "/diagnosis", primary: true },
  { label: "查看文旅转化案例", href: "/cases" },
  { label: "下载资料包样张", href: "/packages" },
  { label: "预约项目咨询", href: "/methodology#contact" },
];

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
          <h1 className="leading-tight">
            <img
              src="/images/brand/feiyi-title-calligraphy-gold.png"
              alt="非遗造物"
              className="hero-title-image block select-none"
            />
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-9 tracking-[0.03em] text-linen/88 drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] md:text-lg">
            非遗造物面向政府、景区、历史街区、文旅公司、品牌与传承人，提供非遗产品化、文旅场景化、研学课程、互动体验和商业转化方案。
          </p>
          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            {heroCtas.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                className={
                  cta.primary
                    ? "rounded bg-gold px-6 py-3 text-center text-sm text-ink transition hover:bg-paper"
                    : "rounded border border-paper/25 px-6 py-3 text-center text-sm text-paper transition hover:border-gold hover:text-gold"
                }
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[520px] lg:block">
          <div className="absolute right-2 top-14 max-w-36 border-l border-gold/20 pl-5 font-serif text-sm leading-7 tracking-[0.12em] text-paper/82">
            让非遗变成<br />产品、体验<br />空间与文旅收入
          </div>
        </div>
      </div>
    </section>
  );
}
