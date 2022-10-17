import { motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import animate from "~/lib/motion";

const Custom404: NextPage = () => (
  <div className="my-36">
    <Head>
      <title>404 Not Found</title>
    </Head>
    <motion.h2 variants={animate}>Not found</motion.h2>
    <motion.div variants={animate}>
      <Link href="/">
        <a className="anchor">Return to homepage</a>
      </Link>
    </motion.div>
  </div>
);

export default Custom404;
