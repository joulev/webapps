import { Illustration } from "@prisma/client";
import { getTweet as _getTweet } from "next-tweet/api";
import { TweetWithPhoto } from "~/types";

// https://stackoverflow.com/a/7327859
function getTimestampOfObjectId(id: string): Date {
  return new Date(parseInt(id.slice(0, 8), 16) * 1000);
}

export async function getTweet(illustration: Illustration): Promise<TweetWithPhoto | null> {
  const id = illustration.tweetId;
  if (!id) return null;
  const tweet = await _getTweet(id);
  if (!tweet || !tweet.photos) return null;
  return {
    ...tweet,
    photos: tweet.photos,
    addedDate: getTimestampOfObjectId(illustration.id),
  } satisfies TweetWithPhoto;
}

export function convertUrlToPhotoId(url: string) {
  return url.replace("https://pbs.twimg.com/media/", "");
}
