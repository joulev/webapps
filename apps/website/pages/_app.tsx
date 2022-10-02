import { motion, useAnimationControls } from "framer-motion";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import "~/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const controls = useAnimationControls();
  const changeStart = () => controls.start("hidden");
  const changeComplete = () => controls.start("visible");
  useEffect(() => {
    controls.start("visible");
    router.events.on("routeChangeStart", changeStart);
    router.events.on("routeChangeComplete", changeComplete);
    return () => {
      router.events.off("routeChangeStart", changeStart);
      router.events.off("routeChangeComplete", changeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      className="container max-w-screen-md"
      initial="hidden"
      animate={controls}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <Component {...pageProps} />
    </motion.div>
  );
}
