"use client";

import clsx from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Button from "~/components/button";
import Link from "~/components/link";
import animate from "~/lib/motion";

type CardProps = React.PropsWithChildren<{
  featured?: boolean;
  title: string;
  buttons: { href: string; content: string }[];
}>;
function Card({ featured, title, children, buttons }: CardProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  return (
    <div
      className={clsx(featured && "col-span-full", "bg-daw-main-200 rounded relative group")}
      style={{ "--left": `${mouse.x}px`, "--top": `${mouse.y}px` } as any}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <div className="flex flex-col gap-6 p-6 relative z-10">
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
      </div>
      <div
        className="absolute rounded inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          backgroundImage:
            "radial-gradient(900px circle at var(--left) var(--top), rgba(120, 113, 108, 0.12), transparent 30%)",
        }}
      />
    </div>
  );
}

export default function Projects() {
  return (
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
}
