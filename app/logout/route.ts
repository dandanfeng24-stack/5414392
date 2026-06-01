import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function GET() {
  return logout();
}

export async function POST() {
  await clearSessionCookie();
  return NextResponse.json(
    { ok: true, next: "/" },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}

async function logout() {
  await clearSessionCookie();
  return new NextResponse(null, {
    status: 303,
    headers: {
      Location: "/"
    }
  });
}
