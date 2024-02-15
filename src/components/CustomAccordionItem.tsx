import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { ImCheckmark } from "react-icons/im";
import VideoPlayer from "./VideoPlayer";
import useCourseStatusContext from "../hooks/useCourseStatusContex";
import { FaLock } from "react-icons/fa6";
import { Link } from "react-router-dom";
export type Content = {
  title: string;
  index: number;
  videoThumbnail: string;
  videoUrl: string;
  videoTitle?: string;
  videoSrc?: string;
  description?: string;
  links?: object[];
};

const CustomAcccordionItem: FC<Content> = ({
  title,
  description,
  index,
  videoTitle,
  videoSrc,
  videoThumbnail,
  links,
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

            {links && (
              <>
                <Text
                  fontStyle={"italic"}
                  fontWeight={"semibold"}
                  textDecorationLine={"underline"}
                >
                  Related study materials
                </Text>
                <Flex direction="column">
                  {links.map((link, index) => (
                    <Text
                      as={Link}
                      fontSize={{ base: "sm" }}
                      to={link.url}
                      fontStyle={"italic"}
                      _hover={{ color: "cyan.600" }}
                    >
                      {index + 1}.{link.url}
                    </Text>
                  ))}
                </Flex>
              </>
            )}
          </Flex>
        ) : (
          <AccordionPanel>
            <Box position={"relative"}>
              <Box
                height={"50vh"}
                className="tw-shadow-[0px_0px_9px_4px_#319795]"
              >
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
