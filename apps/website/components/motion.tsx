"use client";

import { motion } from "framer-motion";
import animate from "~/lib/motion";

export default function Motion({
  as,
  className,
  children,
}: React.PropsWithChildren<{ as: keyof typeof motion; className?: string }>) {
  const Component = motion[as];
  return (
    <Component className={className} variants={animate}>
      {children}
    </Component>
  );
}
