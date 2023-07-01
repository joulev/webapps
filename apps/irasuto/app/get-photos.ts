import { formatDistanceToNowStrict } from "date-fns";
import { prisma } from "~/lib/db";
import { Photo } from "~/types";

export default async function getPhotos({ randomised }: { randomised: boolean }): Promise<Photo[]> {
  const photos = (await prisma.photo.findMany({ orderBy: { id: "desc" } })).map(
    ({ date, ...rest }) => ({
      ...rest,
      dateAgo: formatDistanceToNowStrict(date, { addSuffix: true }),
    }),
  );
  if (!randomised) return photos;
  return photos
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
