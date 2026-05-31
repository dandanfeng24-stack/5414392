import { NextResponse } from "next/server";
import { setSessionCookie, verifyPassword } from "@/lib/auth";
import { query } from "@/lib/db";

type LoginRow = {
  id: string;
  password_hash: string;
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const nextPath = sanitizeNextPath(String(formData.get("next") ?? ""));

  if (!email || !password) {
    return redirectWithError(request.url, nextPath, "请填写邮箱和密码");
  }

  const result = await query<LoginRow>("SELECT id, password_hash FROM users WHERE email = $1 LIMIT 1", [email]);
  const user = result.rows[0];

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return redirectWithError(request.url, nextPath, "邮箱或密码不正确");
  }

  await setSessionCookie(user.id);
  return NextResponse.redirect(new URL(nextPath, request.url), 303);
}

function sanitizeNextPath(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) return "/account";
  return value;
}

function redirectWithError(requestUrl: string, nextPath: string, error: string) {
  const url = new URL("/login", requestUrl);
  url.searchParams.set("error", error);
  url.searchParams.set("next", nextPath);
  return NextResponse.redirect(url, 303);
}
