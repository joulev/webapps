"use client";

import clsx from "clsx";
import { Home, Github, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import A from "~/app/anchor";
import Logo from "~/app/logo";

export default function About() {
  const pathname = usePathname();
  const isNewest = pathname === "/";
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);
  return (
    <div
      className={clsx(
        "fixed inset-0 transition duration-300 ease-in-out",
        expanded ? "bg-main-950/50" : "pointer-events-none",
      )}
      onClick={() => setExpanded(false)}
    >
      <div
        className="w-screen max-w-md fixed bottom-0 left-1/2 -translate-x-1/2 p-3 pointer-events-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="card p-6 pb-0">
          <div className="flex flex-row justify-between items-center mb-6">
            <Logo />
            <div className="flex flex-row gap-3">
              <A href="https://joulev.dev" className="btn btn-tertiary btn-nopadding">
                <Home strokeWidth={1} />
              </A>
              <A
                href="https://github.com/joulev/webapps/tree/main/apps/irasuto"
                className="btn btn-tertiary btn-nopadding"
              >
                <Github strokeWidth={1} />
              </A>
              <button
                className="btn btn-tertiary btn-nopadding"
                onClick={() => setExpanded(x => !x)}
              >
                <ChevronDown
                  strokeWidth={1}
                  className={clsx(expanded ? "rotate-0" : "rotate-180", "transition")}
                />
              </button>
            </div>
          </div>
          <div
            className="grid transition-all duration-300 ease-in-out"
            style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
          >
            <div
              className={clsx(
                "overflow-hidden transition-opacity duration-600",
                expanded ? "opacity-100 text-daw-main-950" : "opacity-0 text-daw-main-200",
              )}
            >
              <p className="mb-6">
                This is where I store my collection of some of the most gorgeous illustrations
                related to Japanese popular culture that I&rsquo;ve found on Twitter. Enjoy :)
              </p>
              <p className="mb-6">
                This app is made with the app directory in Next.js 13. If you are interested, you
                can click on the GitHub icon above to see the source code, including how the
                illustrations are rendered and how I can add new illustrations from my phone.
              </p>
              <Link href={isNewest ? "/random" : "/"} className="btn btn-secondary w-full mb-6">
                {isNewest ? "See randomised" : "See newest first"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
