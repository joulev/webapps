import { Metadata } from "next";
import { Preload } from "~/app/preload";
import About from "~/app/about";
import "~/app/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <About />
      </body>
      <Preload />
    </html>
  );
}

const title = "irasuto at joulev.dev";
const description =
  "This is where I store my collection of some of the most gorgeous illustrations related to Japanese popular culture that I've found on Twitter.";
const url = "https://irasuto.joulev.dev";
export const metadata: Metadata = {
  metadataBase: new URL("https://irasuto.joulev.dev"),
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
        url: "https://static.joulev.dev/og?title=irasuto",
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
