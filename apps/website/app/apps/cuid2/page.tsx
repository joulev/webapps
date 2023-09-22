import { Metadata } from "next";
import Content from "./content";
import "./remove-number-input-spin-button.css";

export default function Home() {
  return <Content />;
}

const title = "cuid2 at joulev.dev";
const description = "cuid2 generator";
const url = "https://cuid2.joulev.dev";
export const metadata: Metadata = {
  metadataBase: new URL("https://cuid2.joulev.dev"),
  title,
  description,
  twitter: { card: "summary_large_image", creator: "@joulev_3" },
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    images: [
      { url: "https://static.joulev.dev/og?title=cuid2", alt: title, width: 1200, height: 630 },
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

