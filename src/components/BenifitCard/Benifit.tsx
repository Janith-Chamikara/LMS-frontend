import { Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";


type BenifitProps = {
  title: string;
  description: string;
  src: string;
  color:"gray.100" | "gray.900"
};

const Benifit: FC<BenifitProps> = ({ title, description, src,color }) => {
  return (
    <>
      <Flex
        mt={"10px"}
        bg={color === "gray.100" ? "gray.200" : "gray.500"}
        direction={"column"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        rounded={"xl"}
        padding={"20px"}
      >
        <Image src={src} width={"25%"} />
        <Text  textAlign={"center"} fontWeight={"bold"}>
          {title}
        </Text>
        <Text  textAlign={"center"}>{description}</Text>
      </Flex>
    </>
  );
};
export default Benifit;
