import Collage from "../collage";
import getPhotos from "../get-photos";

export default async function Page() {
  const photos = await getPhotos({ randomised: false });
  return <Collage photos={photos} />;
}

export const revalidate = 86400; // 24 hours
