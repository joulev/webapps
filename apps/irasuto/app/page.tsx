import Collage from "./collage";
import { prisma } from "~/lib/db";
import { getTweet } from "~/lib/utils";
import { Photo } from "~/types";

async function getPhotos(): Promise<Photo[]> {
  const illustrations = await prisma.illustration.findMany();
  const tweets = await Promise.all(illustrations.map(getTweet));
  const photos: Photo[] = tweets
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
    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <Collage photos={photos} />
    </div>
  );
}
