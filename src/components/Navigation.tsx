import {
  Box,
  Flex,
  HStack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
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
        <Tooltip hasArrow padding={"10px"} label={item.name}>
          <HStack
            fontSize={"sm"}
            as={Link}
            padding={"10px"}
            position={"relative"}
            bgColor={backgroundColor}
            borderRadius={"xl"}
            _hover={{
              transitionProperty: "background-color",
              backgroundColor: color,
              transitionDuration: "0.3s",
              transitionTimingFunction: "ease-in-out",
            }}
            to={item.url}
            key={index}
            alignItems={"center"}
            direction={"row"}
            gap={"10px"}
          >
            {item.name === "Notifications" && (
              <Box
                position={"absolute"}
                width={2}
                height={2}
                borderRadius={"full"}
                backgroundColor={"red.600"}
                right={0}
                top={0}
              />
            )}
            {<item.icon />}

            <Text display={{ base: "none", lg: "block" }}>{item.name}</Text>
          </HStack>
        </Tooltip>
      ))}
    </Flex>
  );
};

export default Navigation;
