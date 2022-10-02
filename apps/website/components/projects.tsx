import { motion } from "framer-motion";
import { FC } from "react";
import Button from "~/components/button";
import Link from "~/components/link";
import animate from "~/lib/motion";

// to be updated when i have more than one project to show :(
const Projects: FC = () => (
  <motion.div variants={animate}>
    <h2>Featured Project</h2>
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-y-2 sm:flex-row sm:justify-between">
        <h3 className="text-lg font-medium">ezkomment &mdash; Commenting made easy.</h3>
        <div className="italic text-sm sm:text-base">Summer 2022</div>
      </div>
      <p>
        A simple but fully-featured and fully-customisable comment service for the web.{" "}
        <Link href="https://orbital.comp.nus.edu.sg">NUS Orbital</Link> project (level Artemis).
      </p>
      <div className="flex flex-row flex-wrap gap-x-3 sm:gap-x-6 gap-y-3">
        <Button href="https://ezkomment.joulev.dev">Visit the app</Button>
        <Button href="https://github.com/joulev/ezkomment">Source code</Button>
        <Button href="https://credentials.nus.edu.sg/8d536e9a-86ba-4e36-9e30-e17b8dc21bd3">
          Certificate
        </Button>
      </div>
    </div>
  </motion.div>
);

export default Projects;
