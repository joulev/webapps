import { motion } from "framer-motion";
import Image from "next/future/image";
import { FC } from "react";
import Button from "~/components/button";
import animate from "~/lib/motion";
import me from "~/public/joulev.png";

const Header: FC = () => (
  <div className="flex flex-col gap-9">
    <motion.header
      className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-end gap-6 mb-3"
      variants={animate}
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl font-medium">Vu Van Dung</h1>
        <p className="text-lg md:text-xl">Sophomore Computer Engineering Undergraduate</p>
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
    </motion.header>
    <motion.p className="text-lg" variants={animate}>
      <strong className="font-medium">
        Burning enthusiasm for web development and web design.
      </strong>{" "}
      Crafting interfaces and applications with highest focus on user experience and artistic
      beauty. A fast-learner who is passionate in cutting-edge technologies.
    </motion.p>
    <motion.div variants={animate}>
      <Button href="/cv" primary>
        View résumé
      </Button>
    </motion.div>
  </div>
);

export default Header;
