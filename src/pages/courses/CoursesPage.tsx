import { Box, Flex, Heading } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import CourseCard from "../../components/CourseCard";
import axios from "../../axios/axios";
import useToastHook from "../../hooks/useToast";

const CoursesPage: FC = () => {
  const [courses, setCourses] = useState<[object]>([{}]);
  const [error, setError] = useState(null);
  const [newToast] = useToastHook()
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/courses/get-all");
        console.log(response);
        setCourses(response.data.courses)
        console.log(courses);
      } catch (error:unknown) {
        setError(error);
      } finally {
        setIsLoading(true);
      }
    };
    fetchData()
  }, []);
  error && newToast({ message: error.message, condition: "error" });
  console.log(courses);
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
        {courses && courses.map((course,index)=><CourseCard course={course} key={index}/>)}
      </Flex>
    </Flex>
  );
};

export default CoursesPage;
