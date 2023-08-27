import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Photo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getTweet as _getTweet } from "react-tweet/api";
import { z } from "zod";
import { env } from "~/env.mjs";
import { prisma } from "~/lib/db";

const schema = z.object({ password: z.literal(env.JOULEV_PASSWORD), url: z.string().url() });

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: env.R2_ACCESS_KEY, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
});

function convertUrlToPhotoId(url: string) {
  return url.replace("https://pbs.twimg.com/media/", "");
}

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

async function getPhotos(id: string): Promise<Omit<Photo, "id">[] | null> {
  const tweet = await _getTweet(id);
  if (!tweet || !tweet.photos) return null;
  return tweet.photos.map(photo => ({
    url: photo.url,
    width: photo.width,
    height: photo.height,
    tweetUrl: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
    authorName: tweet.user.name,
    authorHandle: tweet.user.screen_name,
    date: new Date(tweet.created_at),
  }));
}

export async function POST(request: Request) {
  const e = new Error();
  try {
    const url = new URL(schema.parse(await request.json()).url);
    if (url.hostname !== "twitter.com") throw e;

    const id = url.pathname.split("/").at(-1);
    if (!id) throw e;

    const photos = await getPhotos(id);
    if (!photos) throw new Error();

    await Promise.all(
      photos.map(async photo => {
        await uploadPhoto(photo.url, photo.tweetUrl);
        // We don't parallelise this because we don't want to have db items without photos
        await prisma.photo.create({
          data: {
            ...photo,
            url: `https://r2.irasuto.joulev.dev/irasuto/${convertUrlToPhotoId(photo.url)}`,
          },
        });
      }),
    );

    revalidatePath("/");
    revalidatePath("/newest");

    return new Response("Ok!");
  } catch (e) {
    console.error(e);
    return new Response("Invalid request", { status: 400 });
  }
}
