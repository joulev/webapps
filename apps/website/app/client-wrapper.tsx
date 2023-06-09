"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

export default function ClientWrapper({ children }: React.PropsWithChildren) {
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start("visible");
  }, [controls]);
  return (
    <motion.div initial="hidden" animate={controls}>
      {children}
    </motion.div>
  );
}
