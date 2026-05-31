import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = sanitizeNextPath(params?.next ?? "/account");

  return (
    <div className="section-shell py-16">
      <section className="surface rounded p-8 md:p-10">
        <div className="text-sm text-gold">账号入口</div>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-paper md:text-6xl">登录</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-linen">
          登录后可进入用户中心，查看账号等级，并解锁对应权限内容。
        </p>
      </section>

      <LoginForm nextPath={nextPath} />
    </div>
  );
}

function sanitizeNextPath(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) return "/account";
  return value;
}
