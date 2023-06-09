import Projects from "./projects";
import Header from "./header";
import Footer from "./footer";

export default function Page() {
  return (
    <div className="container max-w-screen-md pt-36 flex flex-col gap-36">
      <Header />
      <Projects />
      <Footer />
    </div>
  );
}

const title = "Vu Van Dung";
const description =
  "Burning enthusiasm for web development and web design. " +
  "Crafting interfaces and applications with highest focus on user experience and artistic beauty. " +
  "A fast-learner passionate in cutting-edge technologies.";
const url = "https://joulev.dev";
export const metadata = {
  metadataBase: new URL("https://joulev.dev"),
  title,
  description,
  robots: { index: true, follow: true },
  twitter: { card: "summary_large_image", creator: "@joulev_3" },
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    images: [
      {
        url: "https://static.joulev.dev/og?title=Vu+Van+Dung&subtitle=Full+stack+developer",
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
