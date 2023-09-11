import { formatDistanceToNowStrict } from "date-fns";
import { unstable_cache } from "next/cache";
import { prisma } from "~/lib/db";
import { Photo } from "~/types";

const getPhotos = unstable_cache(
  async (): Promise<Photo[]> => {
    const photos = await prisma.photo.findMany({ orderBy: { id: "desc" } });
    return photos.map(({ date, ...rest }) => ({
      ...rest,
      dateAgo: formatDistanceToNowStrict(date, { addSuffix: true }),
    }));
  },
  [],
  { tags: ["photos"] },
);

export default getPhotos;
