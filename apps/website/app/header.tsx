import { Mail, Github } from "lucide-react";
import Image from "next/image";
import Button from "~/components/button";
import me from "~/assets/joulev.png";
import Motion from "~/components/motion";

export default function Header() {
  return (
    <div className="flex flex-col gap-9">
      <Motion
        as="header"
        className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-end gap-6 mb-3 opacity-50"
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl sm:text-4xl font-medium">Vu Van Dung</h1>
          <p className="text-lg md:text-xl">Full-stack Web Developer</p>
        </div>
        <div className="card rounded-full">
          <Image
            src={me}
            alt="Vu Van Dung"
            className="saturate-50 brightness-100 dark:brightness-90"
            width={144}
            height={144}
            priority
          />
        </div>
      </Motion>
      <Motion as="p" className="text-lg">
        <strong className="font-medium">
          Burning enthusiasm for web development and web design.
        </strong>{" "}
        Crafting interfaces and applications with highest focus on user experience and artistic
        beauty. A fast-learner passionate in cutting-edge technologies.
      </Motion>
      <Motion as="div" className="flex flex-row gap-3">
        <Button href="/cv" primary isExternal disablePrefetch>
          View résumé
        </Button>
        <Button href="mailto:me@joulev.dev" className="btn-nopadding p-1.5">
          <Mail size={24} width={24} strokeWidth={1} />
        </Button>
        <Button href="https://github.com/joulev" className="btn-nopadding p-1.5">
          <Github size={24} width={24} strokeWidth={1} />
        </Button>
      </Motion>
    </div>
  );
}
