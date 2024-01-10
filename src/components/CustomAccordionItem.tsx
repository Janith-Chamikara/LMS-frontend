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
import VideoPlayer from "./VideoPlayer";

export type Content = {
  title: string;
  videoUrl: string;
  videoTitle?: string;
  videoSrc?: string;
  description?: string;
  subTopics?: string[];
};

const CustomAcccordionItem: FC<Content> = ({
  title,
  description,
  videoTitle,
  videoSrc,
  subTopics,
}) => {
  const color = useColorModeValue("gray.300", "gray.600");
  return (
    <>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bgColor: color }}>
            <Box as="span" flex="1" textAlign="left" fontWeight={"semibold"}>
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <Flex
          as={AccordionPanel}
          pb={4}
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
        >
          {videoTitle && (
            <Text fontStyle={"italic"} fontWeight={"semibold"}>
              {videoTitle}
            </Text>
          )}
          {description && description}
          {videoSrc && (
            <Box my={"20px"} className="tw-shadow-[0px_0px_9px_4px_#319795]">
              <VideoPlayer src={videoSrc} width={"100%"} height={"auto"} />
            </Box>
          )}

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
