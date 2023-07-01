import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { env } from "~/env.mjs";
import { prisma } from "~/lib/db";
import { convertUrlToPhotoId, getTweet } from "~/lib/utils";

const schema = z.object({ password: z.literal(env.JOULEV_PASSWORD), url: z.string().url() });

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: env.R2_ACCESS_KEY, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
});

async function uploadPhoto(url: string, tweetUrl: string) {
  const id = convertUrlToPhotoId(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download photo for id=${id} (${tweetUrl})`);

  const arrayBuffer = await res.arrayBuffer();
  const metadata = res.headers.get("content-type");
  const buffer = Buffer.from(arrayBuffer);

  const result = await S3.send(
    new PutObjectCommand({
      Bucket: "webapps-irasuto",
      Key: `irasuto/${id}`,
      Body: buffer,
      ContentType: metadata ?? undefined,
    }),
  );
  if (result.$metadata.httpStatusCode !== 200)
    throw new Error(`Failed to upload photo for id=${id} (${tweetUrl})`);
}

export async function POST(request: Request) {
  const e = new Error();
  try {
    const url = new URL(schema.parse(await request.json()).url);
    if (url.hostname !== "twitter.com") throw e;

    const id = url.pathname.split("/").at(-1);
    if (!id) throw e;

    const tweetInfo = await getTweet({ id: "", tweetId: id });
    if (!tweetInfo) throw new Error();

    const tweetUrl = `https://twitter.com/${tweetInfo.user.screen_name}/status/${tweetInfo.id_str}`;
    await Promise.all(tweetInfo.photos.map(photo => uploadPhoto(photo.url, tweetUrl)));

    await prisma.illustration.create({ data: { tweetId: id } });

    revalidatePath("/");
    fetch("https://irasuto.joulev.dev");
    revalidatePath("/newest");
    fetch("https://irasuto.joulev.dev/newest");

    return new Response("Ok!");
  } catch (e) {
    console.error(e);
    return new Response("Invalid request", { status: 400 });
  }
}
