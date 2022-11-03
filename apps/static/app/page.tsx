import { Home, Github } from "lucide-react";

import A from "~/components/anchor";
import Circles from "~/components/circle";
import Logo from "~/components/logo";

export default function Page() {
  return (
    <main className="w-screen h-screen grid place-items-center relative overflow-hidden">
      <a href="https://joulev.dev" className="[&_path]:!fill-daw-main-900 animate-fadein-fast">
        <Logo />
      </a>
      <div
        className="fixed top-6 left-1/2 -translate-x-1/2 flex flex-row gap-6 animate-fadein-fast"
        style={{ animationDelay: "1s", animationDuration: "0.3s" }}
      >
        <A href="https://joulev.dev">
          <Home strokeWidth={1} />
        </A>
        <A href="https://github.com/joulev/webapps/tree/main/apps/static">
          <Github strokeWidth={1} />
        </A>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -z-10">
        <Circles />
      </div>
    </main>
  );
}
