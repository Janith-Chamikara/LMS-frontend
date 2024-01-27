import { FC, useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { Box, Flex, Heading, Skeleton } from "@chakra-ui/react";
import CourseCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";
import useProfileContext from "../hooks/useProfileContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const MyCart: FC = () => {
  const { profile } = useProfileContext();
  // const [courses, setCourses] = useState();
  // const [coursesIsLoading, setCoursesIsLoading] = useState(true);
  // const axiosPrivate = useAxiosPrivate();
  const [coursesData, coursesDataIsLoading] = useFetchData(
    `courses/get-cart-items/${profile.id}`
  );
  // useEffect(() => {
  //   const controller = new AbortController();
  //   const getCourses = async () => {
  //     const userData = await axiosPrivate.get(`/auth/${profile.id}`);
  //     const cartCoursePromises = userData?.data.user?.cart?.map(
  //       async (item) => {
  //        console.log(item)
  //         const response = await axiosPrivate.get(
  //           `/courses/get/${item.course_id}`,
  //           { signal: controller.signal }
  //         );
  //         return response.data.course;
  //       }
  //     );
  //     console.log(cartCoursePromises);
  //     const data = await Promise.all(cartCoursePromises);
  //     setCourses(data);
  //     setCoursesIsLoading(false);
  //   };
  //   getCourses();
  //   return () => controller.abort();
  // }, []);

  return (
    <>
      <Skeleton isLoaded={!coursesDataIsLoading}>
        <Box
          id="myCourses"
          height={coursesDataIsLoading ? "60vh" : "max-content"}
          mt={"10px"}
          p={{ base: "20px", md: "50px" }}
          className="tw-shadow-[4px_4px_10px_0px_#319795]"
        >
          <Heading
            mb={{ base: "20px", md: "50px" }}
            fontSize={{ base: "2xl", md: "4xl" }}
          >
            My Cart :
          </Heading>
          <SearchBar />
          <Flex
            mt={"20px"}
            direction={"row"}
            flexWrap={"wrap"}
            mx={"auto"}
            justify={"center"}
            gap={"20px"}
            width={"100%"}
          >
            {coursesData?.courses?.map((course, index) => (
              <CourseCard
                isOneButton={true}
                buttonTitle="Start Learning"
                key={index}
                isLoading={coursesDataIsLoading}
                course={course}
              />
            ))}
          </Flex>
        </Box>
      </Skeleton>
    </>
  );
};

export default MyCart;
