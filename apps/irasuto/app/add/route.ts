import { z } from "zod";
import { prisma } from "~/lib/db";
import { getTweet } from "~/lib/utils";

// Please, on demand revalidation please arrives in the app directory!!!
function revalidate() {
  const origin =
    process.env.NODE_ENV === "production" ? "https://irasuto.joulev.dev" : "http://localhost:3000";
  // we don't wait. If it works it works, otherwise ISR will take care of it (hopefully)
  fetch(`${origin}/api/revalidate?secret=${process.env.JOULEV_PASSWORD}`);
}

export async function POST(request: Request) {
  const e = new Error();
  if (!process.env.JOULEV_PASSWORD) throw new Response("Server error", { status: 500 });
  const schema = z.object({
    password: z.literal(process.env.JOULEV_PASSWORD),
    url: z.string().url(),
  });
  try {
    const url = new URL(schema.parse(await request.json()).url);
    if (url.hostname !== "twitter.com") throw e;
    const id = url.pathname.split("/").at(-1);
    if (!id) throw e;
    await getTweet({ id: "", tweetId: id }); // should throw if tweet is not satisfactory
    await prisma.illustration.create({ data: { tweetId: id } });
    revalidate();
    return new Response("Ok!");
  } catch {
    return new Response("Invalid request", { status: 400 });
  }
}
