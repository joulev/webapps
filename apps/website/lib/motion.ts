import { Variants } from "framer-motion";

const animate: Variants = {
  hidden: { opacity: 0, translateY: 2 },
  visible: (delay = 0) => ({ opacity: 1, translateY: 0, transition: { duration: 0.3, delay } }),
};

export default animate;
