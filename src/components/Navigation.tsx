import { Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { NavLink } from "../layouts/nav/Navbar";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

type NavigationProps = {
  items: {
    name: string;
    url: string;
    icon: IconType;
  }[];
};
const Navigation: FC<NavigationProps> = ({ items }) => {
  const color = useColorModeValue("gray.300", "gray.600");
  const backgroundColor = useColorModeValue("gray.100", "gray.900");
  return (
    <Flex
      paddingRight={"10px"}
      direction={"column"}
      width={"max-content"}
      height={"100%"}
      justifyContent={"space-between"}
    >
      {items.map((item, index) => (
        <HStack
          fontSize={"sm"}
          as={Link}
          padding={"10px"}
          bgColor={backgroundColor}
          borderRadius={"xl"}
          _hover={{
            transitionProperty:"background-color",
            backgroundColor: color,
            transitionDuration: '0.3s',
            transitionTimingFunction: "ease-in-out",
          }}
          to={item.url}
          key={index}
          alignItems={"center"}
          direction={"row"}
          gap={"10px"}
        >
          {<item.icon />}
          <Text display={{ base: "none", lg: "block" }}>{item.name}</Text>
        </HStack>
      ))}
    </Flex>
  );
};

export default Navigation;
