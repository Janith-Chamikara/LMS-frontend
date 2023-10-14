import { Variants } from "framer-motion";

export const heroBackVariant: Variants = {
  initial: {
    x: "-100vw",
    rotate: 45,
  },
  animate: {
    x: "0",
    transition: {
      duration: 1.2,
      easeIn: "easeInOut",
      delay: 0.5,
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
      duration: 1,
      easeIn: "easeInOut",
      delay: 1,
    },
  },
};
export const heroTextVariant: Variants = {
  initial: {
    x: "10vw",
  },
  animate: {
    x: "0",

    transition: {
      duration: 1,
      easeIn: "easeInOut",
      delay: 1,
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
