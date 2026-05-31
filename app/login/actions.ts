"use server";

import { redirect } from "next/navigation";
import { setSessionCookie, verifyPassword } from "@/lib/auth";
import { query } from "@/lib/db";

type LoginRow = {
  id: string;
  password_hash: string;
};

export type LoginState = {
  error?: string;
};

export async function loginAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const nextPath = sanitizeNextPath(String(formData.get("next") ?? ""));

  if (!email || !password) {
    return { error: "请填写邮箱和密码" };
  }

  const result = await query<LoginRow>("SELECT id, password_hash FROM users WHERE email = $1 LIMIT 1", [email]);
  const user = result.rows[0];

  if (!user) {
    return { error: "邮箱或密码不正确" };
  }

  const isValid = await verifyPassword(password, user.password_hash);

  if (!isValid) {
    return { error: "邮箱或密码不正确" };
  }

  await setSessionCookie(user.id);
  redirect(nextPath);
}

function sanitizeNextPath(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) return "/account";
  return value;
}
