import { NextResponse } from "next/server";
import { prisma } from "~/lib/db";

export async function GET() {
  const { tweetUrl } = await prisma.photo.findFirstOrThrow({
    orderBy: { id: "desc" },
    select: { tweetUrl: true },
  });
  return NextResponse.redirect(tweetUrl);
}

export const dynamic = "force-dynamic";
