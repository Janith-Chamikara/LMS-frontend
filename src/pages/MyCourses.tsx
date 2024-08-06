import { FC } from "react";
import useFetchData from "../hooks/useFetchData";
import { Box, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import CourseCard from "../components/CourseCard";
import SearchBar from "../components/SearchBar";
import { courseType } from "./courseInfo/CourseInfoWithParams";

type courseData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key : string]:any;
}

const MyCourses: FC = () => {
  const [coursesData, coursesIsLoading] = useFetchData(
    "/courses/auth/get-paid-courses"
  );

  return (
    <>
      <Skeleton isLoaded={!coursesIsLoading}>
        <Box
          id="myCourses"
          height={coursesIsLoading ? "60vh" : "max-content"}
          mt={"10px"}
          p={{ base: "20px", md: "50px" }}
          className="tw-shadow-[4px_4px_10px_0px_#319795]"
        >
          <Heading
            mb={{ base: "20px", md: "50px" }}
            fontSize={{ base: "2xl", md: "4xl" }}
          >
            My courses :
          </Heading>
          {(coursesData as courseData)?.purchasedCourses?.length === 0 && (
            <Text>Currently you haven't purchased any course yet.</Text>
          )}
          {(coursesData as courseData)?.purchasedCourses?.length !== 0 && <SearchBar  inputText="" onClick={()=>null} />}

          <Flex
            mt={"20px"}
            direction={"row"}
            flexWrap={"wrap"}
            mx={"auto"}
            justify={"center"}
            gap={"20px"}
            width={"100%"}
          >
            {(coursesData as courseData)?.purchasedCourses?.map((course: courseType, index: number) => (
              <CourseCard
                isOneButton={true}
                buttonTitle="Start Learning"
                key={index}
                isLoading={coursesIsLoading as boolean}
                course={course}
              />
            ))}
          </Flex>
        </Box>
      </Skeleton>
    </>
  );
};

export default MyCourses;
