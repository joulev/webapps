import { motion } from "framer-motion";
import { FC } from "react";
import Link from "~/components/link";
import animate from "~/lib/motion";

const Now: FC = () => (
  <motion.section variants={animate}>
    <h2>What I Do Now</h2>
    <div className="flex flex-col gap-6">
      <p>
        I am currently a second-year undergraduate student majoring in Computer Engineering at
        National University of Singapore (NUS).{" "}
        <Link href="https://credentials.nus.edu.sg/profile/joulev/wallet">
          View some of my academic certificates
        </Link>
        .
      </p>
      <p>
        In free time, I usually either work on side projects or learn about new stuff related to web
        development. Or just randomly walk around in a quiet park, because Singapore has a lot of
        them and I find them very peaceful.
      </p>
      <p>
        I almost always listen to music whenever I can. My taste ranges from beautiful classical
        masterpieces or movie soundtracks to catchy Japanese popular music.
      </p>
    </div>
  </motion.section>
);

export default Now;
