import localFont from "@next/font/local";
import ClientLayout from "./layout-client";
import "./styles.css";

const font = localFont({ src: "./synonym.woff2" });

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={font.className}>
      <head />
      <body className="text-daw-main-600">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
