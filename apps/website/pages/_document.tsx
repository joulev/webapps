import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-c-100 text-c-600 dark:bg-c-900 dark:text-c-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
