import { Variants } from "framer-motion";

export const heroBackVariant: Variants = {
  initial: {
    x: "-100vw",
    rotate: 45,
  },
  animate: {
    x: "0",
    transition: {
      type: "spring",
      stiffness: "200",
      damping: "50",
    },
  },
};
export const heroImgVariant: Variants = {
  initial: {
    x: "-10vw",
  },
  animate: {
    x: "0",

    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0,
    },
  },
};
export const heroTextVariant: Variants = {
  initial: {
    x: "10vw",
    opacity: 1,
  },
  animate: {
    x: "0",
    opacity: 1,
    transition: {
      duration:0.5,
      ease:"easeInOut",
      delay: 0,
    },
  },
};

export const navVariant = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      delay: 0.05 * index,
    },
  }),
};
