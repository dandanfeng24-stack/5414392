"use server";

import { redirect } from "next/navigation";
import { hashPassword, setSessionCookie } from "@/lib/auth";
import { query } from "@/lib/db";

type RegisterRow = {
  id: string;
};

export type RegisterState = {
  error?: string;
};

export async function registerAction(_state: RegisterState, formData: FormData): Promise<RegisterState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const displayName = String(formData.get("displayName") ?? "").trim() || null;

  if (!isValidEmail(email)) {
    return { error: "请填写有效邮箱" };
  }

  if (password.length < 8) {
    return { error: "密码至少需要 8 位" };
  }

  if (password !== confirmPassword) {
    return { error: "两次输入的密码不一致" };
  }

  const passwordHash = await hashPassword(password);

  try {
    const result = await query<RegisterRow>(
      "INSERT INTO users (email, password_hash, display_name, tier) VALUES ($1, $2, $3, 'registered') RETURNING id",
      [email, passwordHash, displayName]
    );
    const user = result.rows[0];

    await setSessionCookie(user.id);
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { error: "该邮箱已注册，请直接登录" };
    }

    return { error: "注册失败，请稍后再试" };
  }

  redirect("/account");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isUniqueViolation(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "23505";
}
