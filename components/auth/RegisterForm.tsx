"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction, type RegisterState } from "@/app/register/actions";

const initialState: RegisterState = {};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <section className="mx-auto mt-10 max-w-xl surface rounded p-6 md:p-8">
      <form action={formAction} className="grid gap-5">
        <label className="grid gap-2 text-sm text-linen">
          邮箱
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="用于登录和接收服务通知"
            className="rounded border border-paper/15 bg-ink/60 px-4 py-3 text-paper outline-none placeholder:text-linen/45 focus:border-gold"
          />
        </label>
        <label className="grid gap-2 text-sm text-linen">
          昵称
          <input
            name="displayName"
            type="text"
            autoComplete="name"
            placeholder="可选，例如：某某工作室"
            className="rounded border border-paper/15 bg-ink/60 px-4 py-3 text-paper outline-none placeholder:text-linen/45 focus:border-gold"
          />
        </label>
        <label className="grid gap-2 text-sm text-linen">
          密码
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            placeholder="至少 8 位"
            className="rounded border border-paper/15 bg-ink/60 px-4 py-3 text-paper outline-none placeholder:text-linen/45 focus:border-gold"
          />
        </label>
        <label className="grid gap-2 text-sm text-linen">
          确认密码
          <input
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            placeholder="请再次输入密码"
            className="rounded border border-paper/15 bg-ink/60 px-4 py-3 text-paper outline-none placeholder:text-linen/45 focus:border-gold"
          />
        </label>
        {state.error ? (
          <p className="rounded border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">{state.error}</p>
        ) : null}
        <button
          disabled={isPending}
          className="rounded bg-gold px-5 py-3 text-sm text-ink transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "注册中..." : "注册并进入用户中心"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap gap-4 border-t border-paper/10 pt-6 text-sm">
        <Link href="/login" className="text-gold hover:text-paper">
          已有账号，去登录
        </Link>
        <Link href="/account/membership" className="text-linen hover:text-gold">
          查看会员权益
        </Link>
      </div>
    </section>
  );
}
