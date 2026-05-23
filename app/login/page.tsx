import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="section-shell py-16">
      <section className="surface rounded p-8 md:p-10">
        <div className="text-sm text-gold">账号入口</div>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-paper md:text-6xl">登录</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-linen">
          当前页面为登录功能前端占位。后续接入真实认证系统后，用户可在这里进入账号、订单、会员和服务记录。
        </p>
      </section>

      <section className="mx-auto mt-10 max-w-xl surface rounded p-6 md:p-8">
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm text-linen">
            手机号 / 邮箱
            <input
              disabled
              placeholder="后续接入真实登录后开放"
              className="rounded border border-paper/15 bg-ink/60 px-4 py-3 text-paper placeholder:text-linen/45"
            />
          </label>
          <label className="grid gap-2 text-sm text-linen">
            密码
            <input
              disabled
              type="password"
              placeholder="当前不保存、不校验任何账号信息"
              className="rounded border border-paper/15 bg-ink/60 px-4 py-3 text-paper placeholder:text-linen/45"
            />
          </label>
          <button disabled className="rounded bg-gold/45 px-5 py-3 text-sm text-ink/70">
            登录功能待接入
          </button>
          <p className="text-sm leading-7 text-linen/75">该按钮不会提交接口，不会写入本地状态，也不会伪造登录结果。</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 border-t border-paper/10 pt-6 text-sm">
          <Link href="/register" className="text-gold hover:text-paper">
            去注册
          </Link>
          <Link href="/account" className="text-linen hover:text-gold">
            查看用户中心占位
          </Link>
        </div>
      </section>
    </div>
  );
}
