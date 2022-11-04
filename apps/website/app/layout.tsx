import ClientLayout from "./layout-client";
import "./styles.css";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body className="text-daw-main-600">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
