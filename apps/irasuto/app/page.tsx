import { formatDistanceToNowStrict } from "date-fns";
import Collage from "./collage";
import { prisma } from "~/lib/db";
import { getTweet } from "~/lib/utils";
import { Photo } from "~/types";

async function getPhotos(): Promise<Photo[]> {
  const illustrations = await prisma.illustration.findMany();
  const tweets = await Promise.all(illustrations.map(getTweet));
  const photos: Photo[] = tweets
    .map(tweet =>
      tweet.photos.map(({ url, width, height }) => ({
        url,
        width,
        height,
        tweetUrl: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
        author: { name: tweet.user.name, handle: tweet.user.screen_name },
        dateAgo: formatDistanceToNowStrict(new Date(tweet.created_at), { addSuffix: true }),
      })),
    )
    .flat()
    // https://stackoverflow.com/a/46545530, nice
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return photos;
}

export default async function Page() {
  const photos = await getPhotos();
  return <Collage photos={photos} />;
}
