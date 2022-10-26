import clsx from "clsx";
import { motion } from "framer-motion";
import { FC, PropsWithChildren } from "react";
import Button from "~/components/button";
import Link from "~/components/link";
import animate from "~/lib/motion";
import { Star } from "./icons";

const Card: FC<
  PropsWithChildren<{
    featured?: boolean;
    title: string;
    buttons: { href: string; content: string }[];
  }>
> = ({ featured, title, children, buttons }) => (
  <div
    className={clsx(featured && "col-span-full", "flex flex-col gap-6 p-6 bg-daw-main-200 rounded")}
  >
    {featured && (
      <div className="flex flex-row items-center gap-1.5 text-daw-green-700 text-sm font-medium">
        <Star />
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
  </div>
);

const Projects: FC = () => (
  <motion.section variants={animate}>
    <h2>Projects</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Card
        featured
        title="ezkomment — Commenting made easy."
        buttons={[
          { href: "https://ezkomment.joulev.dev", content: "Visit the app" },
          { href: "https://github.com/joulev/ezkomment", content: "Source code" },
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
    </div>
  </motion.section>
);

export default Projects;
