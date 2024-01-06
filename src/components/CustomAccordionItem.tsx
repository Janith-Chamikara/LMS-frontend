import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { ImCheckmark } from "react-icons/im";

export type Content = {
  title: string;
  description?: string;
  subTopics?: string[];
};

const CustomAcccordionItem: FC<Content> = ({
  title,
  description,
  subTopics,
}) => {
  const color = useColorModeValue("gray.300", "gray.600");
  return (
    <>
      <AccordionItem >
        <h2>
          <AccordionButton _expanded={{bgColor:color}}>
            <Box as="span" flex="1" textAlign="left" fontWeight={"semibold"}>
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <Flex
          as={AccordionPanel}
          pb={4}
          display={description ? "flex" : "block"}
          flexDirection={description ? "row" : "column"}
        >
          {description && description}
          {subTopics &&
            subTopics.map((subTopic, index) => (
              <Stack
                key={index}
                direction={"row"}
                gap={"10px"}
                alignItems={"center"}
              >
                <Icon as={ImCheckmark} w={8} color="green.300" />
                <Text fontWeight={"semibold"}>{subTopic}</Text>
              </Stack>
            ))}
        </Flex>
      </AccordionItem>
    </>
  );
};

export default CustomAcccordionItem;
