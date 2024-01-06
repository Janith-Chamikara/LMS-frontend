import { Box } from "@chakra-ui/react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FC } from "react";

const ScrollYProgress: FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <Box
      as={motion.div}
      style={{ scaleX }}
      position={"fixed"}
      top={0}
      right={0}
      left={0}
      height={"10px"}
      bgColor={"cyan.500"}
      transformOrigin={"left"}
    />
  );
};
export default ScrollYProgress;
