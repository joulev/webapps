import { Variants } from "framer-motion";

const animate: Variants = {
  hidden: (shift = true) => ({ opacity: 0, translateY: shift ? 5 : 0 }),
  visible: { opacity: 1, translateY: 0, transition: { duration: 0.3 } },
};

export default animate;
