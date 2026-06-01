import { NextResponse } from "next/server";
import { hashPassword, setSessionCookie } from "@/lib/auth";
import { query } from "@/lib/db";

type RegisterRow = {
  id: string;
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const displayName = String(formData.get("displayName") ?? "").trim() || null;

  if (!isValidEmail(email)) {
    return errorResponse("请填写有效邮箱");
  }

  if (password.length < 8) {
    return errorResponse("密码至少需要 8 位");
  }

  if (password !== confirmPassword) {
    return errorResponse("两次输入的密码不一致");
  }

  try {
    const result = await query<RegisterRow>(
      "INSERT INTO users (email, password_hash, display_name, tier) VALUES ($1, $2, $3, 'registered') RETURNING id",
      [email, await hashPassword(password), displayName]
    );

    await setSessionCookie(result.rows[0].id);
  } catch (error) {
    if (isUniqueViolation(error)) {
      return errorResponse("该邮箱已注册，请直接登录");
    }

    return errorResponse("注册失败，请稍后再试");
  }

  return NextResponse.json(
    { ok: true, next: "/account" },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isUniqueViolation(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "23505";
}

function errorResponse(error: string) {
  return NextResponse.json(
    { ok: false, error },
    {
      status: 400,
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
