"use client";

import { usePathname } from "next/navigation";

export default function MobileHeading() {
  const pathname = usePathname();

  const title = (() => {
    switch (pathname) {
      case "/watching":
        return "Watching";
      case "/rewatching":
        return "Rewatching";
      case "/completed/tv":
        return "Completed TV";
      case "/completed/movies":
        return "Completed Movies";
      case "/completed/others":
        return "Completed (others)";
      case "/paused":
        return "Paused";
      case "/dropped":
        return "Dropped";
      case "/planning":
        return "Planning";
      default:
        return null;
    }
  })();

  return title ? <h1 className="lg:hidden text-2xl font-semibold">{title}</h1> : null;
}
