import ClientLayout from "./layout-client";
import "./styles.css";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="https://static.joulev.dev/fonts/Synonym-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="text-daw-main-600">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
