import Navbar from "~/app/_navbar/navbar";
import { Preload } from "~/app/preload";
import MobileHeading from "~/app/mobile-heading";
import "~/app/globals.css";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container flex flex-col lg:flex-row gap-x-18 gap-y-12 pb-18 pt-6 lg:pt-18">
          {/* @ts-expect-error */}
          <Navbar />
          <div className="flex-1">
            <main className="flex flex-col gap-6">
              <MobileHeading />
              {children}
            </main>
          </div>
        </div>
      </body>
      <Preload />
    </html>
  );
}
