import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="section-shell py-16">
      <section className="surface rounded p-8 md:p-10">
        <div className="text-sm text-gold">账号入口</div>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-paper md:text-6xl">注册</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-linen">
          当前页面为注册功能前端占位。后续接入账号体系后，可用于保存诊断记录、资料包订单、会员权益和服务进度。
        </p>
      </section>

      <section className="mx-auto mt-10 max-w-xl surface rounded p-6 md:p-8">
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm text-linen">
            联系方式
            <input
              disabled
              placeholder="手机号 / 邮箱 / 微信号"
              className="rounded border border-paper/15 bg-ink/60 px-4 py-3 text-paper placeholder:text-linen/45"
            />
          </label>
          <label className="grid gap-2 text-sm text-linen">
            账号用途
            <select disabled className="rounded border border-paper/15 bg-ink/60 px-4 py-3 text-linen/60">
              <option>非遗项目诊断</option>
            </select>
          </label>
          <button disabled className="rounded bg-gold/45 px-5 py-3 text-sm text-ink/70">
            注册功能待接入
          </button>
          <p className="text-sm leading-7 text-linen/75">该页面不生成假用户，不写入 localStorage，也不创建任何会员状态。</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 border-t border-paper/10 pt-6 text-sm">
          <Link href="/login" className="text-gold hover:text-paper">
            已有账号，去登录
          </Link>
          <Link href="/account/membership" className="text-linen hover:text-gold">
            查看会员权益占位
          </Link>
        </div>
      </section>
    </div>
  );
}
