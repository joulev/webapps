import Link from "~/components/link";
import Logo from "./logo";
import Section from "./section";
import { Github, LucideIcon, Mail } from "lucide-react";

function SocialLink({ href, icon: Icon }: { href: string; icon: LucideIcon }) {
  return (
    <Link
      href={href}
      className="w-12 h-9 rounded-full grid place-items-center text-daw-main-500 hover:text-daw-main-950 transition"
    >
      <Icon strokeWidth={1.5} />
    </Link>
  );
}

export default function Header() {
  return (
    <Section
      left={
        <div className="flex flex-col gap-6">
          <Logo className="mt-2 mb-3 ml-1.5" />
          <SocialLink href="https://github.com/joulev" icon={Github} />
          <SocialLink href="mailto:me@joulev.dev" icon={Mail} />
        </div>
      }
    >
      <div className="flex flex-col">
        <h1 className="text-3xl sm:text-4xl font-medium">Vu Van Dung</h1>
        <p>@joulev</p>
      </div>
      <hr className="border-daw-main-300 my-9" />
      <div className="flex flex-col gap-6">
        <p>I am a software developer.</p>
        <p>
          In free time, I usually either work on side projects or learn about new stuff related to
          web development. Or just randomly walk around in a quiet park, because Singapore has a lot
          of them and I find them very peaceful.
        </p>
        <p>
          I almost always listen to music whenever I can. My taste ranges from beautiful classical
          masterpieces or movie soundtracks to catchy Japanese popular music.
        </p>
        <p>
          I am also active on Discord and you can find me as a moderator on the{" "}
          <Link href="https://nextjs.org/discord">official Next.js Discord server</Link>.
        </p>
      </div>
    </Section>
  );
}
