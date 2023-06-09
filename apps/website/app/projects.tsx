import clsx from "clsx";
import { AppWindow, Star } from "lucide-react";
import ProjectCard from "~/components/project-card";
import Section from "./section";

type CardProps = React.PropsWithChildren<{
  featured?: boolean;
  title: string;
  href: string;
}>;
function Card({ featured, title, href, children }: CardProps) {
  return (
    <ProjectCard href={href} className={clsx(featured && "col-span-full", "card relative group")}>
      <h3 className="text-lg font-medium">
        {title}
        {featured && (
          <span className="ml-3 inline-block text-xs uppercase bg-blue/20 text-blue px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </h3>
      <p>{children}</p>
    </ProjectCard>
  );
}

export default function Projects() {
  return (
    <Section
      left={
        <div className="flex flex-col w-12 items-center gap-6">
          <div className="bg-daw-main-200 w-12 h-12 rounded-full grid place-items-center">
            <AppWindow strokeWidth={1.5} />
          </div>
          <h2 style={{ writingMode: "vertical-rl" }} className="text-2xl font-thin tracking-wider">
            Projects
          </h2>
        </div>
      }
    >
      <p className="mb-6">
        Here are some of the projects I have worked on, most of which won&apos;t be updated for a
        while if ever, as I am relatively busy now.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card featured title="ezkomment" href="https://ezkomment.joulev.dev">
          A simple but fully-featured and fully-customisable comment service for the web.
        </Card>
        <Card title="tailwind-dark-aware" href="https://npmjs.com/tailwind-dark-aware">
          Tailwind CSS plugin to generate shorthands for light mode and dark mode colour classes.
        </Card>
        <Card title="tategaki at joulev.dev" href="https://tategaki.joulev.dev">
          My attempt to set up a Japanese-language website that uses vertical writing style.
        </Card>
        <Card title="link at joulev.dev" href="https://link.joulev.dev">
          My personal URL shortener, built with Nuxt 3 and MongoDB.
        </Card>
        <Card title="anime at joulev.dev" href="https://anime.joulev.dev">
          An alternative interface for AniList that I built for my own use.
        </Card>
        <Card title="presentation at joulev.dev" href="https://presentation.joulev.dev">
          An app where I make (interactive) presentation slides with code and web technologies.
        </Card>
        <Card title="irasuto at joulev.dev" href="https://irasuto.joulev.dev">
          My collection of some of the most gorgeous Japanese illustrations that I&rsquo;ve found on
          Twitter.
        </Card>
        {/* <div className="hidden sm:grid rounded border border-daw-main-100 place-items-center text-daw-main-400">
          and more to come &hellip;
        </div> */}
      </div>
    </Section>
  );
}
