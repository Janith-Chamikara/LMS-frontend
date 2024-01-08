import {
  Box,
  Flex,
  Heading,
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

const array = [
  {
    name: "Alice Smith",
    position: "Software Engineer",
    comment:
      "This course was incredibly informative and well-structured. The instructor was engaging and knowledgeable, and I feel much more confident in my programming skills now. Highly recommend!",
  },
  {
    name: "Bob Johnson",
    position: "Web Developer",
    comment:
      "I found the course challenging but rewarding. The material was comprehensive, and the projects helped me apply my learning in practical ways. I'm excited to use my new skills in my career.",
  },
  {
    name: "Charlie Williams",
    position: "Data Analyst",
    comment:
      "I was a bit hesitant to take this course, but I'm so glad I did! It was eye-opening and helped me bridge the gap between my technical and analytical skills. I'm already seeing the benefits in my work.",
  },
  // Add more reviews as needed
];

const courseBenifits = [
  { title: "What you will learn", array: ["a", "b", "c"] },
  { title: "Requirements", array: ["a", "b", "c"] },
];

const CourseInfo: FC = () => {
  const course = useLocation().state;
  console.log(course);
  const contents = course.courseInfo.map((content: object) => ({
    title: content?.title,
    description: content?.description,
  }));
  const color = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Box bg={color} px={4} position={"sticky"} top="0" width={"100vw"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontWeight={"bold"}>{course.name}</Box>
          <Stack
            direction={"row"}
            spacing={20}
            display={{ base: "none", lg: "flex" }}
          ></Stack>
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
          <Heading>{course.name}</Heading>
          <Text>{course.description}</Text>
          <Stack
            direction={"row"}
            justify={"space-between"}
            alignItems={"center"}
          >
            <Stack
              direction={"row"}
              justify={"space-between"}
              alignItems={"center"}
            >
              <Box>5stars</Box>
              <Text>5 reviews</Text>
            </Stack>
            <Text>Count of orders</Text>
            <Text>Created By :</Text>
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
              <Offer
                width={{ base: "100%" }}
                tier={"Course Benifits"}
                propertyName="benifit"
                needButton={false}
                advantages={course.benifits}
              />
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
              <Offer
                width={{ base: "100%" }}
                tier={"Course Requirements"}
                propertyName="requirement"
                needButton={false}
                advantages={course.preRequisties}
              />
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
                  <Review key={index} review={review} />
                ))}
            </Flex>
            <ModalWithButton />
          </Box>
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
          <CourseCard course={course} />
        </Box>
      </Flex>
    </>
  );
};
export default CourseInfo;
