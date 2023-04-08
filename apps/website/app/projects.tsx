import clsx from "clsx";
import { Star } from "lucide-react";
import Button from "~/components/button";
import Link from "~/components/link";
import Motion from "~/components/motion";
import ProjectCard from "~/components/project-card";

type CardProps = React.PropsWithChildren<{
  featured?: boolean;
  title: string;
  buttons: { href: string; content: string }[];
}>;
function Card({ featured, title, children, buttons }: CardProps) {
  return (
    <ProjectCard className={clsx(featured && "col-span-full", "card relative group")}>
      {featured && (
        <div className="flex flex-row items-center gap-1.5 text-daw-green-700 text-sm font-medium">
          <Star size={18} strokeWidth={4 / 3} />
          <span>Featured</span>
        </div>
      )}
      <h3 className="text-lg font-medium">{title}</h3>
      <p>{children}</p>
      <div className="flex flex-row flex-wrap gap-x-3 sm:gap-x-6 gap-y-3">
        {buttons.map(({ href, content }, index) => (
          <Button href={href} key={index}>
            {content}
          </Button>
        ))}
      </div>
    </ProjectCard>
  );
}

export default function Projects() {
  return (
    <Motion as="section">
      <h2>Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card
          featured
          title="ezkomment"
          buttons={[
            { href: "https://ezkomment.joulev.dev", content: "Visit" },
            { href: "https://github.com/joulev/ezkomment", content: "Source" },
            {
              href: "https://credentials.nus.edu.sg/8d536e9a-86ba-4e36-9e30-e17b8dc21bd3",
              content: "Certificate",
            },
          ]}
        >
          A simple but fully-featured and fully-customisable comment service for the web.{" "}
          <Link href="https://orbital.comp.nus.edu.sg">NUS Orbital</Link> project (level Artemis).
        </Card>
        <Card
          title="tailwind-dark-aware"
          buttons={[
            { href: "https://npmjs.com/tailwind-dark-aware", content: "NPM" },
            { href: "https://github.com/joulev/tailwind-dark-aware", content: "Source" },
          ]}
        >
          <Link href="https://tailwindcss.com">Tailwind CSS</Link> plugin to generate shorthands for
          light mode and dark mode colour classes.
        </Card>
        <Card
          title="tategaki at joulev.dev"
          buttons={[
            { href: "https://tategaki.joulev.dev", content: "Deployment" },
            {
              href: "https://github.com/joulev/webapps/tree/main/apps/tategaki",
              content: "Source",
            },
          ]}
        >
          My attempt to set up a Japanese-language website that uses{" "}
          <Link href="https://tategaki.github.io">vertical writing style</Link>.
        </Card>
        <Card
          title="link at joulev.dev"
          buttons={[
            { href: "https://link.joulev.dev", content: "Deployment" },
            {
              href: "https://github.com/joulev/webapps/tree/main/apps/link",
              content: "Source",
            },
          ]}
        >
          My personal URL shortener, built with Nuxt 3 and MongoDB.
        </Card>
        <Card
          title="anime at joulev.dev"
          buttons={[
            { href: "https://anime.joulev.dev", content: "Deployment" },
            {
              href: "https://github.com/joulev/webapps/tree/main/apps/anime",
              content: "Source",
            },
          ]}
        >
          An alternative interface for AniList that I built for my own use.
        </Card>
        <Card
          title="presentation at joulev.dev"
          buttons={[
            { href: "https://presentation.joulev.dev", content: "Deployment" },
            {
              href: "https://github.com/joulev/webapps/tree/main/apps/presentation",
              content: "Source",
            },
          ]}
        >
          An app where I make (interactive) presentation slides with code and web technologies.
        </Card>
        <Card
          title="irasuto at joulev.dev"
          buttons={[
            { href: "https://irasuto.joulev.dev", content: "Deployment" },
            {
              href: "https://github.com/joulev/webapps/tree/main/apps/irasuto",
              content: "Source",
            },
          ]}
        >
          My collection of some of the most gorgeous Japanese illustrations that I&rsquo;ve found on
          Twitter.
        </Card>
        {/* <div className="hidden sm:grid rounded border border-daw-main-100 place-items-center text-daw-main-400">
          and more to come &hellip;
        </div> */}
      </div>
    </Motion>
  );
}
