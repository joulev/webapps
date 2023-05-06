import { Preload } from "~/app/preload";
import "~/app/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Preload />
    </html>
  );
}
