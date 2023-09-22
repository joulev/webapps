import Collage from "~/app/collage";
import getPhotos from "~/app/get-photos";

export default async function Page() {
  const photos = await getPhotos();
  return (
    <Collage
      photos={photos
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)}
      buildTime={new Date().toISOString()}
    />
  );
}
