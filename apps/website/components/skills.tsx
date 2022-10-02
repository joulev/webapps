import clsx from "clsx";
import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { Code, Terminal, Graph, Globe } from "~/components/icons";
import Link from "~/components/link";
import animate from "~/lib/motion";

const Card: FC<{ title: string; icon: FC; children: ReactNode }> = ({
  title,
  icon: Icon,
  children,
}) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-row gap-3 items-center">
      <Icon />
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
    {children}
  </div>
);

const Skills: FC = () => (
  <motion.div variants={animate}>
    <h2>Skills</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
      <Card title="Web development" icon={Code}>
        <p>
          Avid user of Next.js and React. Confident in working with HTML, CSS, and JavaScript (and
          TypeScript).
        </p>
        <p>Have some experience working on server-side Node.js-based apps.</p>
      </Card>
      <Card title="Other technologies" icon={Terminal}>
        <p>
          Familiar with and frequent user of common software development tools, such as git and
          basic Unix commands.
        </p>
        <p>
          Know how to utilise <span className="peer">assistive </span>
          <span
            className={clsx(
              "relative after:absolute after:content-['Yes,_they_are_Google_and_StackOverflow!'] after:text-xs",
              "after:right-0 after:bottom-full after:w-fit after:bg-same",
              "after:p-2 after:border after:rounded after:border-faded",
              "after:opacity-0 hover:after:opacity-100 peer-hover:after:opacity-100 after:transition",
            )}
          >
            technologies
          </span>{" "}
          to enhance productivity.
        </p>
      </Card>
      <Card title="Theoretical knowledge" icon={Graph}>
        <p>
          Have a good understanding of{" "}
          <Link href="https://www.comp.nus.edu.sg/~stevenha/cs2040c.html">
            several fundamental data structures and algorithms
          </Link>
          .
        </p>
        <p>Have experience in working in a team and following agile methodologies.</p>
      </Card>
      <Card title="Languages" icon={Globe}>
        <p>Native speaker of Vietnamese and fluent in English.</p>
        <p>
          Can speak{" "}
          <Link href="https://credentials.nus.edu.sg/e32231e5-025c-4da9-b3cd-181af6cf9a37">
            intermediate-level Japanese
          </Link>{" "}
          (JLPT N3 equivalent).
        </p>
      </Card>
    </div>
  </motion.div>
);

export default Skills;
