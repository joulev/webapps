import { Metadata } from "next";

import Navbar from "~/app/_navbar/navbar";
import { Preload } from "~/app/preload";
import MobileHeading from "~/app/mobile-heading";
import "~/app/globals.css";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container flex flex-col lg:flex-row gap-x-18 gap-y-12 pb-18 pt-6 lg:pt-18">
          {/* @ts-expect-error */}
          <Navbar />
          <div className="flex-1">
            <main className="flex flex-col gap-6">
              <MobileHeading />
              {children}
            </main>
          </div>
        </div>
      </body>
      <Preload />
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://anime.joulev.dev",
  ),
  title: {
    template: "%s | anime at joulev.dev",
    default: "anime at joulev.dev",
  },
  description: "My anime list",
  robots: { index: true, follow: true },
  twitter: { card: "summary_large_image", creator: "@joulev_3" },
  openGraph: {
    title: {
      template: "%s | anime at joulev.dev",
      default: "anime at joulev.dev",
    },
    description: "My anime list",
    url: "/",
    siteName: "anime at joulev.dev",
    images: [
      {
        url: "https://static.joulev.dev/og?title=anime",
        alt: "anime at joulev.dev",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "https://static.joulev.dev/images/favicon.svg", type: "image/svg+xml" },
      { url: "https://static.joulev.dev/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
    apple: [{ url: "https://static.joulev.dev/images/apple-touch-icon.png", sizes: "180x180" }],
  },
};
