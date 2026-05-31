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
  return redirectTo(nextPath);
}

function sanitizeNextPath(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) return "/account";
  return value;
}

function redirectWithError(_requestUrl: string, nextPath: string, error: string) {
  const params = new URLSearchParams({ error, next: nextPath });
  return redirectTo(`/login?${params.toString()}`);
}

function redirectTo(path: string) {
  return new NextResponse(null, {
    status: 303,
    headers: {
      Location: path
    }
  });
}
