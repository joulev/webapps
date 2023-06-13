import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env.mjs";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!secret || secret !== env.JOULEV_PASSWORD)
    return new Response("Incorrect credentials", { status: 401 });

  const maxAge = 400 * 24 * 60 * 60; // 400 days, maximum possible for Chrome, higher values will still result in 400 days limit
  return NextResponse.redirect(new URL("/", request.url), {
    headers: {
      "Set-Cookie": `secret=${secret}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${maxAge}`,
    },
  });
}

export const runtime = "experimental-edge";
