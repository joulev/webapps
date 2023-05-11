import { Home, Github } from "lucide-react";

import A from "~/components/anchor";
import Circles from "~/components/circle";
import Logo from "~/components/logo";

export default function Page() {
  return (
    <main
      className="w-screen h-screen grid place-items-center relative overflow-hidden"
      style={{ width: "100dvw", height: "100dvh" }} // works even if browser doesn't support dv*
    >
      <a href="https://joulev.dev" className="[&_path]:!fill-daw-main-950 animate-fadein-fast">
        <Logo />
      </a>
      <div
        className="fixed top-6 left-1/2 -translate-x-1/2 flex flex-row gap-6 animate-fadein-fast"
        style={{ animationDelay: "1s", animationDuration: "0.3s" }}
      >
        <A href="https://joulev.dev">
          <Home strokeWidth={1} />
        </A>
        <A href="https://github.com/joulev/webapps/tree/main/apps/static">
          <Github strokeWidth={1} />
        </A>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -z-10">
        <Circles />
      </div>
    </main>
  );
}

const title = "static at joulev.dev";
const description = "Static files used by all joulev.dev applications.";
const url = "https://static.joulev.dev";
export const metadata = {
  metadataBase: new URL("https://static.joulev.dev"),
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
        url: "https://static.joulev.dev/og?title=static",
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
