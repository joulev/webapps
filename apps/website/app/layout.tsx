import { Preload } from "~/app/preload";
import ClientLayout from "./layout-client";
import "./styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-daw-main-600">
        <ClientLayout>{children}</ClientLayout>
      </body>
      <Preload />
    </html>
  );
}
