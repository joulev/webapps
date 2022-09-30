import { NextSeo } from "next-seo";
import { FC } from "react";

const Seo: FC = () => {
  const title = "Vu Van Dung";
  const description =
    "Burning enthusiasm for web development and web design. " +
    "Crafting interfaces and applications with highest focus on user experience and artistic beauty. " +
    "A fast-learner who is passionate in cutting-edge technologies.";
  const url = "https://joulev.dev";
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
      }}
      twitter={{ cardType: "summary_large_image", handle: "@joulev_3" }}
      additionalLinkTags={[
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon", sizes: "any" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      ]}
    />
  );
};

export default Seo;
