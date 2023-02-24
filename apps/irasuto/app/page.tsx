import { formatDistanceToNowStrict } from "date-fns";
import About from "./about";
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
  return (
    <>
      <Collage photos={photos} />
      <About />
    </>
  );
}

export const revalidate = 86400; // 24 hours

const title = "irasuto at joulev.dev";
const description =
  "This is where I store my collection of some of the most gorgeous illustrations related to Japanese popular culture that I've found on Twitter.";
const url = "https://irasuto.joulev.dev";
export const metadata = {
  title,
  description,
  robots: { index: false },
  twitter: { card: "summary_large_image", creator: "@joulev_3" },
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    images: [
      {
        url: "https://static.joulev.dev/api/og?title=irasuto",
        alt: title,
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  alternates: { canonical: url },
  icons: {
    icon: [
      { url: "https://static.joulev.dev/images/favicon.svg", type: "image/svg+xml" },
      { url: "https://static.joulev.dev/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
    apple: [{ url: "https://static.joulev.dev/images/apple-touch-icon.png", sizes: "180x180" }],
  },
};
