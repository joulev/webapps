export default function Head() {
  const title = "static at joulev.dev";
  const description = "Static files used by all joulev.dev applications.";
  const url = "https://static.joulev.dev";
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="noindex" />
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@joulev_3" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://static.joulev.dev/api/og?title=static" />
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
