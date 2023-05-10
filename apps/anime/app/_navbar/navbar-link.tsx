"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLink({ href, children }: React.PropsWithChildren<{ href: string }>) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      prefetch={false}
      className={clsx(
        "flex flex-row justify-between items-center transition py-3 hover:text-daw-main-950",
        pathname !== href && "text-daw-main-500",
      )}
    >
      {children}
    </Link>
  );
}
