import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

type CardProps = {
  src: string | undefined;
  description: string | string[];
  title: string | string[];
  id: number;
  buttonTitle: string;
  className?: string;
};

const LandingPageCard: FC<CardProps> = ({
  src,
  description,
  id,
  title,
  buttonTitle,
}) => {
  return (
    <Flex
      direction={{ base: "column", md: id === 1 ? "row" : "row-reverse" }}
      alignItems={"center"}
      justifyContent={"space-between"}
      height={{ base: "auto", md: "70vh" }}
      className="tw-transition tw-ease-in-out tw-mt-[10px] tw-p-[20px] tw-mx-2 md:tw-mx-10 tw-rounded-lg tw-shadow-md tw-shadow-cyan-500/50 hover:tw-shadow-cyan-500/90 hover:tw-shadow-lg tw-duration-[500]"
    >
      <Image
        flex={"1"}
        objectFit={"contain"}
        src={src}
        width={{ base: "80%", md: "50%" }}
      />
      <Stack
        width={{ base: "100%", md: "50%" }}
        direction={"column"}
        justifyContent={"space-between"}
        gap={"10px"}
        flex={"1"}
      >
        <Heading
          fontWeight={"bold"}
          fontSize={{ base: "lg", lg: "2xl" }}
          textAlign={{ base: "center", md: "left" }}
        >
          {title}
        </Heading>
        <Text
          fontWeight={"semi-bold"}
          fontSize={{base:"small",md:"md"}}
          textAlign={{ base: "center", md: "left" }}
        >
          {description}
        </Text>
        <Flex
          justifyContent={{ base: "center", md: "left" }}
          alignItems={{ base: "center" }}
        >
          <CustomButton
            as={Link}
            isLoading={false}
            loadingText="Loading"
            text={buttonTitle}
            variant="solid"
            colorSheme="teal"
            height="50px"
            width="auto"
            to="/signup"
          />
        </Flex>
      </Stack>
    </Flex>
  );
};

export default LandingPageCard;
