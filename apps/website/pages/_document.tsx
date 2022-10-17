import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="preload"
          href="https://joulev.dev/fonts/Synonym-Variable.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="text-daw-main-600">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
