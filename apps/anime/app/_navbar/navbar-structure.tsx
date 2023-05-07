"use client";

import { X, Menu, Home, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Logo from "~/app/logo";

export default function NavbarStructure({
  isLoggedIn,
  children,
}: React.PropsWithChildren<{ isLoggedIn: boolean }>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const NavbarToggleIcon = isExpanded ? X : Menu;
  return (
    <header className="lg:w-72 shrink-0">
      <div className="flex flex-col sticky top-18">
        <div className="flex flex-row justify-between items-center">
          <button
            className="lg:hidden text-daw-main-500 hover:text-daw-main-950"
            onClick={() => setIsExpanded(x => !x)}
          >
            <NavbarToggleIcon strokeWidth={1} />
          </button>
          <Link href="/watching">
            <Logo />
          </Link>
          <div className="flex flex-row gap-6">
            <a href="https://joulev.dev" className="btn btn-tertiary btn-nopadding hidden lg:block">
              <Home strokeWidth={1} />
            </a>
            <a
              href="https://github.com/joulev/webapps/tree/main/apps/anime"
              className="btn btn-tertiary btn-nopadding"
            >
              <Github strokeWidth={1} />
            </a>
          </div>
        </div>
        <div
          className="grid lg:!grid-rows-[1fr] lg:!opacity-100 transition-all duration-300 ease-in-out"
          style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr", opacity: isExpanded ? 1 : 0 }}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-9 pt-9">
              {isLoggedIn ? (
                <Link className="btn btn-secondary" href="/add">
                  Add anime to PTW
                </Link>
              ) : (
                <Link className="btn btn-primary" href="/auth">
                  Log in as joulev
                </Link>
              )}
              <nav className="flex flex-col">{children}</nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
