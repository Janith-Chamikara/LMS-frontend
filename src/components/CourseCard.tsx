import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../axios/axios";
import useCourseStatusContext from "../hooks/useCourseStatusContex";

type courseType = {
  thumbnail: {
    public_id: string;
    url: string;
  };
  description: string;
  name: string;
  price: string;
};

type CourseCardProps = {
  course: courseType;
  isLoading?: boolean;
  viewCourse?: boolean;
  isOneButton?: boolean;
  buttonTitle?: string;
};

const CourseCard: FC<CourseCardProps> = ({
  course,
  isLoading,
  isOneButton,
  viewCourse,
  buttonTitle,
}) => {
  const { status } = useCourseStatusContext();
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51Oc4LoFlCSzpCWS87PAVlq2H7392ZfucMn5AdAGDsZbjzCG5UHiqiFE5TsZhQyJNwvSkGQhEAuQuZqXSDy6pC26d00Rw6GGrGZ"
      ); //add to .env

      const body = {
        course,
      };

      const response = await axiosPrivate.post(
        "/auth/create-checkout-session",
        body
      );

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const color = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Box
        className="tw-shadow-[4px_4px_10px_0px_#319795]"
        rounded={"xl"}
        height={"max-content"}
      >
        <Card maxW="sm" bgColor={color}>
          <CardBody>
            <Box
              maxWidth={"sm"}
              overflow={"hidden"}
              borderRadius="lg"
              maxHeight={"40vh"}
            >
              <Image
                src={course?.thumbnail?.url}
                alt="Green double couch with wooden legs"
                width={"100%"}
                className="tw-transition tw-duration-300 tw-ease-in-out hover:tw-scale-110"
              />
            </Box>

            <Stack mt="6" spacing="3">
              <Heading size="md">{course?.name}</Heading>
              <Text>{course?.description}</Text>
              <Text color="blue.600" fontSize="2xl">
                ${course?.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            {!status ? (
              <Skeleton isLoaded={!isLoading}>
              <ButtonGroup spacing="2" mt={0}>
                <Button
                  variant="solid"
                  onClick={
                    buttonTitle
                      ? () =>
                          navigate("/courseInfo", {
                            state: { course, isLoading },
                          })
                      : makePayment
                  }
                  colorScheme="blue"
                >
                  {buttonTitle ? buttonTitle : "Buy now"}
                </Button>
                {viewCourse && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate("/courseInfo", {
                        state: { course, isLoading },
                      })
                    }
                    colorScheme="blue"
                  >
                    View Course
                  </Button>
                )}
                <Button
                  display={isOneButton ? "none" : "block"}
                  variant="outline"
                  colorScheme="whatsapp"
                >
                  Add to cart
                </Button>
              </ButtonGroup></Skeleton>
            ) : (
              <Skeleton isLoaded={!isLoading}><Button
                variant="solid"
                onClick={() =>
                  navigate("/courseInfo", {
                    state: { course, isLoading },
                  })
                }
                colorScheme="yellow"
              >
                Start Learning
              </Button></Skeleton>
            )}
          </CardFooter>
        </Card>
      </Box>
    </>
  );
};
export default CourseCard;
