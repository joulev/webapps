import { Illustration } from "@prisma/client";
import { getTweet as _getTweet } from "next-tweet/api/get-tweet";
import { TweetWithPhoto } from "~/types";

export async function getTweet(illustration: Illustration): Promise<TweetWithPhoto> {
  const urlObj = new URL(illustration.url);
  const id = urlObj.pathname.split("/").at(-1);
  if (!id) throw new Error();
  const tweet = await _getTweet(id);
  if (!tweet || !tweet.photos) throw new Error();
  // why do I have to do this?
  const photos = tweet.photos;
  return { ...tweet, photos } satisfies TweetWithPhoto;
}
