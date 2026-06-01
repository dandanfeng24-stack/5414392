"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export function LoginForm({ nextPath, error }: { nextPath: string; error?: string }) {
  const [formError, setFormError] = useState(error);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setFormError(undefined);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: new FormData(event.currentTarget),
      credentials: "same-origin",
      cache: "no-store"
    });
    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.ok) {
      setFormError(data?.error ?? "登录失败，请稍后再试");
      setIsPending(false);
      return;
    }

    window.location.assign(data.next || nextPath || "/account");
  }

  return (
    <section className="mx-auto mt-10 max-w-xl surface rounded p-6 md:p-8">
      <form onSubmit={handleSubmit} className="grid gap-5">
        <input type="hidden" name="next" value={nextPath} />
        <label className="grid gap-2 text-sm text-linen">
          邮箱
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="请输入注册邮箱"
            className="rounded border border-paper/15 bg-ink/60 px-4 py-3 text-paper outline-none placeholder:text-linen/45 focus:border-gold"
          />
        </label>
        <label className="grid gap-2 text-sm text-linen">
          密码
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="请输入密码"
            className="rounded border border-paper/15 bg-ink/60 px-4 py-3 text-paper outline-none placeholder:text-linen/45 focus:border-gold"
          />
        </label>
        {formError ? (
          <p className="rounded border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">{formError}</p>
        ) : null}
        <button
          disabled={isPending}
          className="rounded bg-gold px-5 py-3 text-sm text-ink transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "登录中..." : "登录"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap gap-4 border-t border-paper/10 pt-6 text-sm">
        <Link href="/register" className="text-gold hover:text-paper">
          去注册
        </Link>
        <Link href="/account/membership" className="text-linen hover:text-gold">
          查看会员权益
        </Link>
      </div>
    </section>
  );
}
