import { NextResponse } from "next/server";
import { prisma } from "~/lib/db";

export async function GET() {
  const { tweetId } = await prisma.illustration.findFirstOrThrow({
    orderBy: { id: "desc" },
    select: { tweetId: true },
  });
  return NextResponse.redirect(`https://static-tweet.vercel.app/${tweetId}`);
}

export const dynamic = "force-dynamic";
