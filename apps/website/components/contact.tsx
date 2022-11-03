import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import Link from "~/components/link";
import animate from "~/lib/motion";

export default function Contact() {
  return (
    <motion.section variants={animate}>
      <h2>Contact</h2>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3 items-center">
          <Mail size={18} width={24} strokeWidth={4 / 3} />
          <Link href="mailto:me@joulev.dev">me@joulev.dev</Link>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Github size={18} width={24} strokeWidth={4 / 3} />
          <Link href="https://github.com/joulev">@joulev</Link>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Linkedin size={18} width={24} strokeWidth={4 / 3} />
          <Link href="https://linkedin.com/in/joulev/">/in/joulev</Link>
        </div>
      </div>
    </motion.section>
  );
}
