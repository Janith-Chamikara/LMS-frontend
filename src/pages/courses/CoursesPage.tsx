import { Box, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import SearchBar from "../../components/SearchBar";
import CourseCard from "../../components/CourseCard";

const CoursesPage: FC = () => {
  return (
    <Flex
      direction={"column"}
      mt={"50px"}
      gap={"50px"}
      width={"90vw"}
      justifyContent={"center"}
      mx={"auto"}
    >
      <Heading textAlign={"center"}>
        Over 100+ Courses.Pick favourite and start learning
      </Heading>
      <Box></Box>
      <SearchBar />
      <Flex
        direction={"row"}
        flexWrap={"wrap"}
        mx={"auto"}
        justify={"center"}
        gap={"20px"}
        width={"100%"}
      >
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </Flex>
    </Flex>
  );
};

export default CoursesPage;
