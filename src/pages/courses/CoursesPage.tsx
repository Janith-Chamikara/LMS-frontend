import {  Flex, Heading, Skeleton } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import CourseCard from "../../components/CourseCard";
import { courseType } from "../courseInfo/CourseInfoWithParams";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useToastHook from "../../hooks/useToast";
import { isAxiosError } from "axios";
import useProfileContext from "../../hooks/useProfileContext";

const CoursesPage: FC = () => {
  const {profile} = useProfileContext()
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState<courseType [] | object[]>([{},{},{}]);
  const [apiCourses, setApiCourses] = useState<object [] >([]);
  const [isloading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsSearching] = useState<boolean>(false);
  const [newToast] = useToastHook();
  const [inputText, setInputText] = useState<undefined | string>();
  useEffect(() => {
    const isMounted = true;

    const fetchData = async () => {
      console.log("fetching");
      try {
        const response = await axiosPrivate.get("/courses/get-all");
        console.log(response);
        isMounted && setCourses(response.data.courses);
        isMounted && setApiCourses(response.data.courses);
        setIsLoading(false);

        console.log(courses);
      } catch (error) {
        if(isAxiosError(error)) newToast({message:error.response?.data.message, condition:'error'})
        setIsLoading(false);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (inputText) {
      setIsSearching(true);
      const filterdCourses = courses.filter((course:courseType | object) =>
        (course as courseType).name.toLowerCase().includes(inputText.toLowerCase())
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
      />
      <Flex
        direction={"row"}
        flexWrap={"wrap"}
        mx={"auto"}
        justify={"center"}
        gap={"20px"}
        width={"100%"}
      >
        {profile
          ? courses.map((course, index) => (
              <Skeleton key={index} isLoaded={!isloading} minWidth={"25vw"}>
                <CourseCard
                  isOneButton={true}
                  buttonTitle="View Course"
                  isLoading={isloading}
                  course={course as courseType}
                />
              </Skeleton>
            ))
          : "Please login or sign up first to access this page"}
      </Flex>
    </Flex>
  );
};

export default CoursesPage;
