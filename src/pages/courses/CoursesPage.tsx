import { Box, Flex, Heading, Skeleton, filter } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import CourseCard from "../../components/CourseCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useToastHook from "../../hooks/useToast";

const CoursesPage: FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState<[object]>([{}, {}, {}]);
  const [apiCourses, setApiCourses] = useState<[object]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [isSearch, setIsSearching] = useState<boolean>(false);
  const [newToast] = useToastHook();
  const [inputText, setInputText] = useState<undefined | string>();
  console.log(isloading);
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      console.log("fetching");
      try {
        const response = await axiosPrivate.get("/courses/get-all");
        console.log(response);
        isMounted && setCourses(response.data.courses);
        isMounted && setApiCourses(response.data.courses);
        setIsLoading(false);

        console.log(courses);
      } catch (error: unknown) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setInputText(e.target.value);
    if (inputText) {
      setIsSearching(true);
      const filterdCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(inputText.toLowerCase())
      );
      filterdCourses.length > 0 && setCourses(filterdCourses);
      if (filterdCourses.length === 0) {
        newToast({
          message: `No Courses were found under the term ${e.target.value}`,
          condition: "warning",
        });
      }
      setIsSearching(false);
    }
    if (!e.target.value) {
      setCourses(apiCourses);
    }
  };

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
      <SearchBar
        onClick={handleSearch}
        inputText={inputText}
        setInputText={setInputText}
      />
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
            <CourseCard
              isOneButton={true}
              buttonTitle="View Course"
              isLoading={isloading}
              course={course}
            />
          </Skeleton>
        ))}
      </Flex>
    </Flex>
  );
};

export default CoursesPage;
