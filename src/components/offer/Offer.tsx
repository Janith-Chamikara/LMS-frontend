import { Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { ImCheckmark } from "react-icons/im";
import CustomButton from "../CustomButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Width = {

  base:string;
  md?:string;
}

type OfferProps = {
  tier: string;
  propertyName?:string;
  price?: string;
  needButton?: boolean;
  advantages: object[];
  width?:Width;
};

const Offer: FC<OfferProps> = ({ price,propertyName, tier, advantages,width, needButton }) => {
  const color = useColorModeValue("gray.100", "gray.900");
  console.log(advantages);
  return (
    <>
      <Stack
        as={motion.div}
        width={width}
        direction={"column"}
        bgColor={color}
        rounded="xl"
        gap={{base:"20px",md:"50px"}}
        animate={{
          border: [
            // Deep sea to ice neon gradients
            "2px solid linear-gradient(to right, #000040, #002080, #0050ef, #12f5ef)",
            "2px solid linear-gradient(to right, #12f5ef, #0050ef, #002080, #000040)",
          ],
          boxShadow: [
            // Enhanced neon glow with shifting colors and spread
            "0 0 60px rgba(0, 80, 239, 0.5), 0 0 30px rgba(0, 80, 239, 0.2)",
            "0 0 60px rgba(18, 245, 239, 0.5), 0 0 30px rgba(18, 245, 239, 0.2)",
          ],
          opacity: [1, 1], // Subtle transparency pulsation

          transition: {
            duration: 10, // Slower duration for a more fluid transition
            delayChildren: 0.1, // Staggered animation for depth
            easing: "easeInOutCubic", // Gradual acceleration and deceleration
            repeat: Infinity,
            repeatDelay: 3,
            yoyo: true,
          },
        }}
        padding={{base:"20px",md:"50px"}}
      >
        <Stack direction={"column"} gap={"10px"} textAlign={"center"}>
          <Text className="tw-font-extrabold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-teal-600 tw-via-sky-400 tw-to-cyan-500 tw-text-3xl md:tw-text-6xl">
            {price}
          </Text>
          <Text className="tw-font-bold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-teal-600 tw-via-sky-400 tw-to-cyan-500 tw-text-2xl md:tw-text-4xl">
            {tier}
          </Text>
        </Stack>

        <Stack direction={"column"} gap={"10px"}>
          {advantages && advantages.map((advantage, index) => (
            <Stack
              key={index}
              direction={"row"}
              gap={"10px"}
              alignItems={"center"}
            >
              <Icon as={ImCheckmark} w={8} color="green.300" />
              <Text fontWeight={"semibold"} textAlign={"left"} fontSize={{base:"sm",md:"md"}}>{advantage?.[propertyName]}</Text>
            </Stack>
          ))}
        </Stack>
        {needButton && (
          <Stack justifyContent={"center"} alignItems={"center"}>
            <CustomButton
              as={Link}
              isLoading={false}
              loadingText="Loading"
              text="Activate"
              variant="solid"
              colorSheme="teal"
              height="50px"
              width={{ base: "110px", md: "150px" }}
              to="signin"
            />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default Offer;
