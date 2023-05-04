import { formatDistanceToNowStrict } from "date-fns";
import { prisma } from "~/lib/db";
import { getTweet } from "~/lib/utils";
import { Photo } from "~/types";

export default async function getPhotos({ randomised }: { randomised: boolean }): Promise<Photo[]> {
  const illustrations = await prisma.illustration.findMany();
  const tweets = await Promise.all(illustrations.map(getTweet));
  const photos: Photo[] = tweets
    .filter((tweet): tweet is NonNullable<typeof tweet> => tweet !== null)
    .map(({ addedDate, ...tweet }) =>
      tweet.photos.map(({ url, width, height }) => ({
        url,
        width,
        height,
        tweetUrl: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
        author: { name: tweet.user.name, handle: tweet.user.screen_name },
        addedDate,
        dateAgo: formatDistanceToNowStrict(new Date(tweet.created_at), { addSuffix: true }),
      })),
    )
    .flat();

  if (randomised)
    // https://stackoverflow.com/a/46545530, nice
    return photos
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  return photos.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
}
