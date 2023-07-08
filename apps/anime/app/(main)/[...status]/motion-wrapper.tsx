"use client";
import { motion } from "framer-motion";

export { AnimatePresence } from "framer-motion";

export function CardWrapper({
  index,
  aboveFold,
  children,
}: {
  index: number;
  aboveFold: boolean;
  children: React.ReactNode;
}) {
  if (!aboveFold) return <div>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.07 }}
    >
      {children}
    </motion.div>
  );
}
