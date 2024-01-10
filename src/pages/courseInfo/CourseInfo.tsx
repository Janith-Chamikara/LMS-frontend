import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import CourseCard from "../../components/CourseCard";
import Offer from "../../components/offer/Offer";
import TableOfContents from "../../components/courseContent/TableOfContents";
import ScrollYProgress from "../../components/ScrollYProgress";
// import SwipeCarousel from "../../SwipeCarousel/SwipeCarousel";
import Review from "../../components/Review";
import ModalWithButton from "../../components/ModalWithButton";
import { useLocation } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer";

const CourseInfo: FC = () => {
  const { course, isLoading } = useLocation().state;
  console.log(course);
  const contents = course.courseInfo.map((content: object) => ({
    ...content
  }));
  const color = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Box bg={color} px={4} position={"sticky"} top="0" width={"100vw"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontWeight={"bold"}>{course.name}</Box>

          <Stack
            mr={"20px"}
            direction={"row"}
            spacing={2}
            display={{ base: "flex", md: "none" }}
          >
            <Button colorScheme="yellow">Buy Now</Button>
            <Button colorScheme="yellow" variant={"outline"}>
              Add to Cart
            </Button>
          </Stack>
        </Flex>
      </Box>
      <ScrollYProgress />
      <Flex
        mt={"10px"}
        direction={"row"}
        width={"80vw"}
        mx={{ base: "auto", lg: "0" }}
        textAlign={{ base: "center", lg: "left" }}
      >
        <Stack
          width={"75%"}
          flex={{ base: "1", lg: "5" }}
          mx={"auto"}
          padding={"50px"}
          bg={color}
          className="tw-shadow-[4px_4px_10px_0px_#319795]"
          rounded={"xl"}
        >
          <SkeletonText isLoaded={!isLoading}>
            <Heading>{course.name}</Heading>
          </SkeletonText>
          <Box my={"20px"} className="tw-shadow-[0px_0px_9px_4px_#319795]">
            <VideoPlayer src={course.demoUrl} width={"100%"} height={"auto"} />
          </Box>
          <SkeletonText isLoaded={!isLoading}>
            <Text>{course.description}</Text>
          </SkeletonText>
          <Stack
            direction={"row"}
            justifyContent={{ base: "center", lg: "space-between" }}
            alignItems={"center"}
          >
            <Stack
              direction={"row"}
              justifyContent={{ base: "center", lg: "space-between" }}
              alignItems={"center"}
              gap={"10px"}
            >
              {course.ratings && (
                <SkeletonText
                  display={{ base: "none", lg: "block" }}
                  isLoaded={!isLoading}
                >
                  <Text fontWeight={"bold"} fontStyle={"italic"}>
                    {course.ratings} stars
                  </Text>
                </SkeletonText>
              )}
              {course.reviews && (
                <SkeletonText isLoaded={!isLoading}>
                  <Text
                    fontWeight={"bold"}
                    display={{ base: "none", lg: "block" }}
                    fontStyle={"italic"}
                  >
                    {course.reviews.length} reviews
                  </Text>
                </SkeletonText>
              )}
            </Stack>
            {course.purchased && (
              <SkeletonText
                isLoaded={!isLoading}
                display={{ base: "none", lg: "block" }}
              >
                <Text fontWeight={"bold"} fontStyle={"italic"}>
                  Count of orders - {course.purchased}
                </Text>
              </SkeletonText>
            )}
            {course.createdBy && (
              <SkeletonText isLoaded={!isLoading}>
                <Text fontWeight={"bold"} fontStyle={"italic"}>
                  Created By - {course.createdBy.name}
                </Text>
              </SkeletonText>
            )}
          </Stack>
          <Stack
            mt={"80px"}
            direction={"column"}
            width={"100%"}
            justifyContent={"space-between"}
            mx={"auto"}
            gap={"80px"}
          >
            {course.benifits && (
              <Skeleton isLoaded={!isLoading}>
                <Offer
                  width={{ base: "100%" }}
                  tier={"Course Benifits"}
                  propertyName="benifit"
                  needButton={false}
                  advantages={course.benifits}
                />
              </Skeleton>
            )}
          </Stack>
          <Stack
            mt={"80px"}
            direction={"column"}
            width={"100%"}
            justifyContent={"space-between"}
            mx={"auto"}
            gap={"80px"}
          >
            {course.preRequisties && (
              <Skeleton isLoaded={!isLoading}>
                <Offer
                  width={{ base: "100%" }}
                  tier={"Course Requirements"}
                  propertyName="requirement"
                  needButton={false}
                  advantages={course.preRequisties}
                />
              </Skeleton>
            )}
          </Stack>
          <Box
            mt={"80px"}
            p={"50px"}
            className="tw-shadow-[4px_4px_10px_0px_#319795]"
          >
            <Heading mb={"50px"}>Course Contents:</Heading>
            <TableOfContents contents={contents} />
          </Box>
          {course.reviews && (
            <Box
              mt={"80px"}
              width={"100%"}
              overflow={"auto"}
              padding={"50px"}
              className="tw-shadow-[4px_4px_10px_0px_#319795]"
            >
              <Heading mb={"50px"}>Course Reviews :</Heading>
              <Flex direction={"row"} gap={"20px"} mb={"50px"}>
                {course.reviews &&
                  course.reviews.map((review: object, index: number) => (
                    <Skeleton isLoaded={!isLoading} key={index}>
                      <Review review={review} />
                    </Skeleton>
                  ))}
              </Flex>
              <ModalWithButton />
            </Box>
          )}
          {/* mt={"80px"}
            width={"100%"}
            maxHeight={"80vh"}
            padding={"50px"}
            overflow={"auto"}
            className="tw-shadow-[4px_4px_10px_0px_#319795]"
          >
            <Heading>Course Reviews :</Heading>
            <SwipeCarousel widthMax={"100"} />
          </Box> */}
        </Stack>
        <Box
          width={"sm"}
          mr={"50px"}
          flex={"1"}
          display={{ base: "none", lg: "block" }}
        ></Box>
        <Box
          position={"fixed"}
          right={"10px"}
          top="16"
          display={{ base: "none", lg: "block" }}
        >
          <Skeleton isLoaded={!isLoading}>
            <CourseCard course={course} />
          </Skeleton>
        </Box>
      </Flex>
    </>
  );
};
export default CourseInfo;
