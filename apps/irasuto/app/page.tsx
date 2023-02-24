import { prisma } from "~/lib/db";
import { getTweet } from "~/lib/utils";
import { TweetPhotoProps } from "~/types";
import TweetPhoto from "./tweet-photo";

async function getPhotos(): Promise<TweetPhotoProps[]> {
  const illustrations = await prisma.illustration.findMany();
  const tweets = await Promise.all(illustrations.map(getTweet));
  const photos: TweetPhotoProps[] = tweets
    .map(tweet => tweet.photos.map(({ url, width, height }) => ({ tweet, url, width, height })))
    .flat()
    // https://stackoverflow.com/a/46545530, nice
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return photos;
}

export default async function Page() {
  const photos = await getPhotos();
  return (
    <div>
      {photos.map(photo => (
        <TweetPhoto key={photo.url} {...photo} />
      ))}
    </div>
  );
}
