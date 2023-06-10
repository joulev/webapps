import Projects from "./projects";
import Header from "./header";
import Footer from "./footer";
import ClientWrapper from "./client-wrapper";

export default function Page() {
  return (
    <ClientWrapper>
      <div className="container max-w-screen-md pt-36 flex flex-col gap-36">
        <Header />
        <Projects />
        <Footer />
      </div>
    </ClientWrapper>
  );
}

const title = "Vu Van Dung";
const description = "Software developer. I build things for the web.";
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
        url: "https://static.joulev.dev/og?title=Vu+Van+Dung&subtitle=Software+developer",
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
