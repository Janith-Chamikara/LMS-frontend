import { FC } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import hero from "../images/hero.png";

import { motion } from "framer-motion";
import {
  heroImgVariant,
  heroTextVariant,
  heroBackVariant,
} from "../animationVariants/variants";

const Hero: FC = () => {
  const color = useColorModeValue("gray.100", "gray.900");
  return (
    <div className="tw-relative tw-h-screen  tw-overflow-hidden">
      <Box
        as={motion.div}
        bg={color}
        variants={heroBackVariant}
        initial="initial"
        animate="animate"
        className="tw-hidden tw-absolute -tw-top-[80vh] tw-z-0 tw-w-[70vw] tw-h-[170vh] -tw-left-[28vw] lg:tw-block"
      />
      <Flex
        direction={{ base: "column-reverse", lg: "row" }}
        alignItems={"center"}
        justifyContent={{ base: "space-between", lg: "center" }}
        className="tw-relative"
      >
        {/* hero image */}
        <Image
          as={motion.img}
          flex={"1"}
          src={hero}
          height={"600px"}
          width={"300px"}
          variants={heroImgVariant}
          initial="initial"
          whileInView="animate"
        />
        {/*hero content*/}
        <Flex
          as={motion.div}
          flex={"1"}
          direction={"column"}
          alignItems={"center"}
          textAlign={"center"}
          gap={"30px"}
          variants={heroTextVariant}
          initial="initial"
          whileInView="animate"
        >
          <Heading
            flex={"1"}
            fontWeight={"bold"}
            fontSize={{ base: "5xl", lg: "6xl" }}
          >
            Learn at Your Own Place, in Your Own Way
          </Heading>
          <Text>
            Our LMS makes it easy for you to create and deliver engaging online
            courses so you can learn or teach what you want, when you want.Those
            courses that can help you develop the skills you need to succeed in
            your chosen field
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

export default Hero;
