import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env.mjs";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!secret || secret !== env.JOULEV_PASSWORD)
    return new Response("Incorrect credentials", { status: 401 });

  return NextResponse.redirect(new URL("/", request.url), {
    headers: { "Set-Cookie": `secret=${secret}; Path=/; HttpOnly; SameSite=Lax; Secure` },
  });
}

export const runtime = "experimental-edge";
