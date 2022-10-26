"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

export default function LayoutClient({ children }: React.PropsWithChildren) {
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start("visible");
    // controls.start("hidden").then(() => controls.start("visible")); // Probably will need this in the future
  }, [controls]);
  return (
    <>
      <motion.div
        className="container max-w-screen-md"
        initial="hidden"
        animate={controls}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {children}
      </motion.div>
      <Analytics />
    </>
  );
}
