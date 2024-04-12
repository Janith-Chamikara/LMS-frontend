import { FC } from "react";
import useFetchData from "../hooks/useFetchData";
import { Box, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import CourseCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";
import useProfileContext from "../hooks/useProfileContext";
import { courseType } from "./courseInfo/CourseInfoWithParams";
type cousrseData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
const MyCart: FC = () => {
  const { profile } = useProfileContext();
  // const [courses, setCourses] = useState();
  // const [coursesIsLoading, setCoursesIsLoading] = useState(true);
  // const axiosPrivate = useAxiosPrivate();
  const [coursesData, coursesDataIsLoading] = useFetchData(
    `courses/get-cart-items/${profile?.id}`
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
          {((coursesData as cousrseData)?.courses?.length === 0 ||
            !(coursesData as cousrseData)?.courses) && (
            <Text>Your cart is empty right now</Text>
          )}
          {(coursesData as cousrseData)?.courses?.length !== 0 &&
            (coursesData as cousrseData)?.courses && (
              <SearchBar inputText="" onClick={() => null} />
            )}
          <Flex
            mt={"20px"}
            direction={"row"}
            flexWrap={"wrap"}
            mx={"auto"}
            justify={"center"}
            gap={"20px"}
            width={"100%"}
          >
            {(coursesData as cousrseData)?.courses?.map(
              (course: courseType, index: number) => (
                <CourseCard
                  isOneButton={true}
                  buttonTitle="View Course"
                  key={index}
                  isLoading={coursesDataIsLoading as boolean}
                  course={course}
                />
              )
            )}
          </Flex>
        </Box>
      </Skeleton>
    </>
  );
};

export default MyCart;
