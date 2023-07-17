import { Metadata } from "next";
import { Preload } from "./preload";
import "./styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Preload />
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://chatgpt.joulev.dev"),
  title: "chatgpt at joulev.dev",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "https://static.joulev.dev/images/favicon.svg", type: "image/svg+xml" },
      { url: "https://static.joulev.dev/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
    apple: [{ url: "https://static.joulev.dev/images/apple-touch-icon.png", sizes: "180x180" }],
  },
};
