import Footer from "~/app/footer";
import Header from "~/app/header";
import Now from "~/app/now";
import Projects from "~/app/projects";
import Skills from "~/app/skills";

export default function Home() {
  return (
    <div>
      <main className="mb-24 mt-36 flex flex-col gap-24">
        <Header />
        <Skills />
        <Projects />
        <Now />
      </main>
      <Footer updated={new Date()} />
      <div className="fixed top-0 inset-x-0 h-36 bg-gradient-to-b from-daw-main-50 to-transparent backdrop-blur-sm mask pointer-events-none z-20" />
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
  metadataBase: new URL(
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://joulev.dev",
  ),
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
