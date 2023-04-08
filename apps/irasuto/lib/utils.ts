import { Illustration } from "@prisma/client";
import { getTweet as _getTweet } from "next-tweet/api";
import { TweetWithPhoto } from "~/types";

export async function getTweet(illustration: Illustration): Promise<TweetWithPhoto | null> {
  const id = illustration.tweetId;
  if (!id) return null;
  const tweet = await _getTweet(id);
  if (!tweet || !tweet.photos) return null;
  // why do I have to do this?
  const photos = tweet.photos;
  return { ...tweet, photos } satisfies TweetWithPhoto;
}
