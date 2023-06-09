"use client";

import { motion } from "framer-motion";
import animate from "~/lib/motion";

export default function Motion({
  as,
  delay,
  className,
  children,
}: React.PropsWithChildren<{ as: keyof typeof motion; delay?: number; className?: string }>) {
  const Component = motion[as];
  return (
    <Component className={className} variants={animate} custom={delay}>
      {children}
    </Component>
  );
}
