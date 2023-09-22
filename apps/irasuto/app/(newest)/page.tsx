import Collage from "~/app/collage";
import getPhotos from "~/app/get-photos";

export default async function Page() {
  const photos = await getPhotos();
  return <Collage photos={photos} buildTime={new Date().toISOString()} />;
}
