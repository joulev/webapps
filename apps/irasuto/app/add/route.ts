import { revalidatePath } from "next/cache";
import { z } from "zod";
import { env } from "~/env.mjs";
import { prisma } from "~/lib/db";
import { getTweet } from "~/lib/utils";

const schema = z.object({ password: z.literal(env.JOULEV_PASSWORD), url: z.string().url() });

export async function POST(request: Request) {
  const e = new Error();
  try {
    const url = new URL(schema.parse(await request.json()).url);
    if (url.hostname !== "twitter.com") throw e;
    const id = url.pathname.split("/").at(-1);
    if (!id) throw e;
    const tweetInfo = await getTweet({ id: "", tweetId: id });
    if (!tweetInfo) throw new Error();
    await prisma.illustration.create({ data: { tweetId: id } });
    revalidatePath("/");
    revalidatePath("/newest");
    return new Response("Ok!");
  } catch {
    return new Response("Invalid request", { status: 400 });
  }
}
