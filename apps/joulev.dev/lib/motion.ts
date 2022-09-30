import { Variants } from "framer-motion";

const animate: Variants = {
  hidden: (shift = true) => ({ opacity: 0, translateY: shift ? 5 : 0 }),
  visible: { opacity: 1, translateY: 0 },
};

export default animate;
