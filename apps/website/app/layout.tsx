import { Analytics } from "@vercel/analytics/react";
import { Preload } from "~/app/preload";
import "./styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-daw-main-600">
        {children}
        <Analytics />
      </body>
      <Preload />
    </html>
  );
}
