import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  Stack,
  Tag,
  TagLabel,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import Offer from "../../components/offer/Offer";
import TableOfContents from "../../components/courseContent/TableOfContents";
import ScrollYProgress from "../../components/ScrollYProgress";
import Review from "../../components/Review";
import ModalWithButton from "../../components/ModalWithButton";
import { useLocation } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer";
import useFetchData from "../../hooks/useFetchData";
import useProfileContext from "../../hooks/useProfileContext";
import useCourseStatusContext from "../../hooks/useCourseStatusContex";
import AddOrBuy from "../../components/AddOrBuy";

type data = {
  user: {
    courses: [{ course_id: string }];
  };
};

const CourseInfo: FC = () => {
  const initialReviewsPerRow = 1;
  const [next, setNext] = useState(initialReviewsPerRow);
  const { course, isLoading } = useLocation().state;
  const { status, setStatus } = useCourseStatusContext();
  const [loading, setLoading] = useState(true);
  const { profile } = useProfileContext();
  const [data, dataIsLoading] = useFetchData(`/auth/${profile?.id}`);
  useEffect(() => {
    if ((data as data)?.user?.courses?.length <= 1) setLoading(false);
    (data as data)?.user?.courses?.map((item) => {
      if (item?.course_id === course._id) {
        (setStatus as React.Dispatch<React.SetStateAction<boolean>>)(true);
        setLoading(false);
        return;
      }
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  console.log(loading);

  const contents = course.courseInfo.map((content: object) => ({
    ...content,
  }));
  console.log(contents);
  const color = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Box
        autoFocus
        bg={color}
        px={4}
        position={"sticky"}
        top="0"
        width={"100%"}
        zIndex={"50"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontWeight={"bold"} fontSize={"xs"}>{course.name}</Box>
          <Skeleton isLoaded={!loading} rounded={"xl"}>
            {/* <Stack
              mr={"20px"}
              direction={"row"}
              spacing={2}
              display={{ base: "flex", lg: "none" }}
            >
              {!status && (
                <>
                  <Button colorScheme="yellow">Buy Now</Button>
                  <Button colorScheme="yellow" variant={"outline"}>
                    Add to Cart
                  </Button>
                </>
              )}
            </Stack> */}
            <AddOrBuy course={course}/>
          </Skeleton>
        </Flex>
      </Box>
      <ScrollYProgress />
      <Flex
        mt={"10px"}
        direction={"row"}
        width={{ base: "90vw", md: "80vw" }}
        mx={{ base: "auto", lg: "0" }}
        textAlign={{ base: "center", lg: "left" }}
      >
        <Stack
          width={"75%"}
          flex={{ base: "1", lg: "5" }}
          mx={"auto"}
          padding={{ base: "20px", md: "50px" }}
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
            direction={{ base: "column", lg: "row" }}
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
                <SkeletonText isLoaded={!isLoading}>
                  <Text
                    fontWeight={"bold"}
                    fontSize={{ base: "sm", md: "md" }}
                    fontStyle={"italic"}
                  >
                    {course.ratings} stars rating
                  </Text>
                </SkeletonText>
              )}
              {course.reviews && (
                <SkeletonText isLoaded={!isLoading}>
                  <Text
                    fontWeight={"bold"}
                    fontSize={{ base: "sm", md: "md" }}
                    fontStyle={"italic"}
                  >
                    {course.reviews.length} reviews
                  </Text>
                </SkeletonText>
              )}
            </Stack>
            {course.purchased && (
              <SkeletonText isLoaded={!isLoading}>
                <Text
                  fontWeight={"bold"}
                  fontSize={{ base: "sm", md: "md" }}
                  fontStyle={"italic"}
                >
                  Count of orders - {course.purchased}
                </Text>
              </SkeletonText>
            )}
            {course.createdBy && (
              <SkeletonText isLoaded={!isLoading}>
                <Tooltip
                  hasArrow
                  padding={"10px"}
                  label={
                    <Image
                      className="tw-shadow-[0px_0px_18px_0px_#39D6B5F7]"
                      src={course.createdBy.url}
                    />
                  }
                >
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                  >
                    Created By - {course.createdBy.name}
                  </Text>
                </Tooltip>
              </SkeletonText>
            )}
          </Stack>
          {course?.tags && (
            <Flex alignItems={"center"} mt={"20px"}>
              <SkeletonText isLoaded={!isLoading}>
                <Flex gap={4} alignItems={"center"} flexWrap={"wrap"}>
                  {course.tags.map((tag: { tag: string }, index: number) => (
                    <Tag
                      key={index}
                      rounded="full"
                      variant="subtle"
                      colorScheme="teal"
                    >
                      <TagLabel>{tag.tag}</TagLabel>
                    </Tag>
                  ))}
                </Flex>
              </SkeletonText>
            </Flex>
          )}
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
            p={{ base: "20px", md: "50px" }}
            className="tw-shadow-[4px_4px_10px_0px_#319795]"
          >
            <Heading
              mb={{ base: "20px", md: "50px" }}
              fontSize={{ base: "2xl", md: "4xl" }}
            >
              Course Contents:
            </Heading>
            <SkeletonText isLoaded={!dataIsLoading}>
              <TableOfContents contents={contents} />
            </SkeletonText>
          </Box>
          {course.reviews.length !== 0 ? (
            <Box
              mt={"80px"}
              width={"100%"}
              overflow={"auto"}
              padding={{ base: "10px", md: "50px" }}
              className="tw-shadow-[4px_4px_10px_0px_#319795]"
            >
              <Heading mb={"50px"}>Course Reviews :</Heading>
              <Flex direction={"column"} gap={"20px"} mb={"50px"}>
                {course.reviews &&
                  course.reviews
                    .slice(0, next)
                    .map((review: object, index: number) => (
                      <Skeleton isLoaded={!isLoading} key={index}>
                        <Review review={review} />
                      </Skeleton>
                    ))}
              </Flex>
              <Flex
                direction={"column"}
                gap={"10px"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {course.reviews.length > 1 && (
                  <Skeleton isLoaded={!loading}>
                    <Button
                      onClick={() =>
                        setNext((prev) => prev + initialReviewsPerRow)
                      }
                      variant={"outline"}
                      colorScheme="teal"
                    >
                      Load more...
                    </Button>
                    {next > 1 && (
                      <Button
                        onClick={() =>
                          setNext((prev) => prev - initialReviewsPerRow)
                        }
                        variant={"outline"}
                        colorScheme="teal"
                      >
                        Load less...
                      </Button>
                    )}
                  </Skeleton>
                )}
                {status && (
                  <Skeleton isLoaded={!loading}>
                    <ModalWithButton courseId={course._id} />
                  </Skeleton>
                )}
              </Flex>
            </Box>
          ) : (
            <Box
              mt={"80px"}
              width={"100%"}
              overflow={"auto"}
              padding={"50px"}
              className="tw-shadow-[4px_4px_10px_0px_#319795]"
            >
              <Text>This course hasn't been reviewd yet.</Text>
              <br />
              {status && (
                <Skeleton isLoaded={!loading}>
                  <ModalWithButton courseId={course._id} />
                </Skeleton>
              )}
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
          zIndex={"500"}
          display={{ base: "none", lg: "block" }}
        >
          <Skeleton isLoaded={!isLoading}>
            <div className="tw-max-h-[90vh] tw-overflow-auto">
              <CourseCard course={course} isLoading={loading} />
            </div>
          </Skeleton>
        </Box>
      </Flex>
    </>
  );
};
export default CourseInfo;
