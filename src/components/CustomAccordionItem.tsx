import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import VideoPlayer from "./VideoPlayer";
import useCourseStatusContext from "../hooks/useCourseStatusContex";
import { FaLock } from "react-icons/fa6";
<<<<<<< HEAD
import { Link } from "react-router-dom";

type links = [{url:string}]
=======
>>>>>>> parent of 2b76085 (updated)
export type Content = {
  title: string;
  index: number;
  videoThumbnail: string;
  videoUrl?: string;
  videoURL?:string;
  videoTitle?: string;
  videoSrc?: string;
  description?: string;
<<<<<<< HEAD
  links?: links;
  section?:string;
  videoDescription?:string;
=======
  subTopics?: string[];
>>>>>>> parent of 2b76085 (updated)
};

const CustomAcccordionItem: FC<Content> = ({
  title,
  description,
  index,
  videoTitle,
  videoSrc,
  videoThumbnail,
  subTopics,
}) => {
  const { status } = useCourseStatusContext();
  const color = useColorModeValue("gray.300", "gray.600");
  return (
    <>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bgColor: color }}>
            <Text as="span" flex="1" textAlign="left" fontWeight={"semibold"}>
              {index + 1}.{title}
            </Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        {status ? (
          <Flex
            as={AccordionPanel}
            pb={4}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
          >
            {videoTitle && (
              <Text
                fontStyle={"italic"}
                fontWeight={"semibold"}
                textDecorationLine={"underline"}
              >
                {videoTitle}
              </Text>
            )}
            {description && (
              <Text fontSize={{ base: "sm" }} textAlign={"justify"}>
                {description}
              </Text>
            )}
            {videoSrc && (
              <Box my={"20px"} className="tw-shadow-[0px_0px_9px_4px_#319795]">
                <VideoPlayer src={videoSrc} width={"100%"} height={"auto"} />
              </Box>
            )}

<<<<<<< HEAD
            {(links as links ).length > 0 && (
              <>
                <Text
                  fontStyle={"italic"}
                  fontWeight={"semibold"}
                  textDecorationLine={"underline"}
                >
                  Related study materials
                </Text>
                <Flex direction="column">
                  {(links as links).map((link, index) => (
                    <Text
                      as={Link}
                      fontSize={{ base: "sm" }}
                      to={link?.url}
                      fontStyle={"italic"}
                      _hover={{ color: "cyan.600" }}
                    >
                      {index + 1}.{link?.url}
                    </Text>
                  ))}
                </Flex>
              </>
            )}
=======
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
>>>>>>> parent of 2b76085 (updated)
          </Flex>
        ) : (
          <AccordionPanel>
            <Box position={"relative"}>
              <Box height={'50vh'}  className="tw-shadow-[0px_0px_9px_4px_#319795]">
                <Image src={videoThumbnail} width={"100%"} height={"100%"} />
              </Box>

              <Flex
                direction={"column"}
                position={"absolute"}
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"100%"}
                top={"0"}
                backdropFilter="auto"
                backdropBlur={"8px"}
                zIndex={5}
              >
                <Icon as={FaLock} w={20} h={50} />
                <Text fontWeight={"bold"} textShadow="0 0 15px black">
                  Purchase course to access course files
                </Text>
              </Flex>
            </Box>
          </AccordionPanel>
        )}
      </AccordionItem>
    </>
  );
};

export default CustomAcccordionItem;
