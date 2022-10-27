export default function Head() {
  const title = "Vu Van Dung";
  const description =
    "Burning enthusiasm for web development and web design. " +
    "Crafting interfaces and applications with highest focus on user experience and artistic beauty. " +
    "A fast-learner who is passionate in cutting-edge technologies.";
  const url = "https://joulev.dev";
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index,follow" />
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@joulev_3" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://static.joulev.dev/images/og-image.png" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <link rel="canonical" href={url} />
      <link rel="icon" href="https://static.joulev.dev/images/favicon.svg" type="image/svg+xml" />
      <link
        rel="icon"
        href="https://static.joulev.dev/favicon.ico"
        type="image/x-icon"
        sizes="any"
      />
      <link
        rel="apple-touch-icon"
        href="https://static.joulev.dev/images/apple-touch-icon.png"
        sizes="180x180"
      />
    </>
  );
}
