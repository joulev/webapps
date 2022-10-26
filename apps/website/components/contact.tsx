import { motion } from "framer-motion";
import { Email, GitHub, LinkedIn } from "~/components/icons";
import Link from "~/components/link";
import animate from "~/lib/motion";

export default function Contact() {
  return (
    <motion.section variants={animate}>
      <h2>Contact</h2>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <Email />
          <Link href="mailto:me@joulev.dev">me@joulev.dev</Link>
        </div>
        <div className="flex flex-row gap-3">
          <GitHub />
          <Link href="https://github.com/joulev">@joulev</Link>
        </div>
        <div className="flex flex-row gap-3">
          <LinkedIn />
          <Link href="http://linkedin.com/in/joulev/">/in/joulev</Link>
        </div>
      </div>
    </motion.section>
  );
}
