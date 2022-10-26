"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import localFont from "@next/font/local";

import "./styles.css";

const font = localFont({ src: "../public/fonts/Synonym-Variable.woff2" });

const RootLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start("visible");
    // controls.start("hidden").then(() => controls.start("visible")); // Probably will need this in the future
  }, [controls]);
  return (
    <html lang="en" className={font.className}>
      <head />
      <body className="text-daw-main-600">
        <motion.div
          className="container max-w-screen-md"
          initial="hidden"
          animate={controls}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {children}
        </motion.div>
      </body>
    </html>
  );
};

export default RootLayout;
