import { Box, Flex, Heading, Skeleton } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import CourseCard from "../../components/CourseCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CoursesPage: FC = () => {
  const axiosPrivate =  useAxiosPrivate()
  const [courses, setCourses] = useState<[object]>([{},{},{}]);
  const [isloading, setIsLoading] = useState(true);
  console.log(isloading);
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      console.log("fetching");
      try {
        const response = await axiosPrivate.get("/courses/get-all");
        console.log(response);
        isMounted && setCourses(response.data.courses);
        setIsLoading(false);

        console.log(courses);
      } catch (error: unknown) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
        {courses.map((course, index) => (
          <Skeleton key={index} isLoaded={!isloading}>
            <CourseCard isOneButton={true} buttonTitle="View Course"  isLoading={isloading} course={course} />
          </Skeleton>
        ))}
      </Flex>
    </Flex>
  );
};

export default CoursesPage;
