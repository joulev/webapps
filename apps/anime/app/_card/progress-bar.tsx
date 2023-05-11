import clsx from "clsx";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useEffect } from "react";

import { CardVariant } from "./card";

export default function ProgressBar({
  variant,
  percentage,
}: {
  variant: CardVariant;
  percentage: number;
}) {
  const animatedPercentage = useSpring(0, { damping: 15 });
  const width = useMotionTemplate`${animatedPercentage}%`;
  useEffect(() => {
    animatedPercentage.set(percentage);
  }, [percentage, animatedPercentage]);
  return (
    <motion.div
      className={clsx(
        "h-1 rounded-r",
        variant === "watching" && "bg-green",
        variant === "rewatching" && "bg-blue",
        variant === "paused" && "bg-yellow",
        variant === "dropped" && "bg-red",
      )}
      style={{ width }}
    />
  );
}
