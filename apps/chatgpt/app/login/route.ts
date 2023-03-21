import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.JOULEV_PASSWORD)
    return new Response("Incorrect credentials", { status: 401 });

  return NextResponse.redirect(new URL("/", request.url), {
    headers: { "Set-Cookie": `secret=${secret}; Path=/; HttpOnly; SameSite=Lax; Secure` },
  });
}

export const runtime = "experimental-edge";
