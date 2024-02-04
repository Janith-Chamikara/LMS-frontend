import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import useCourseStatusContext from "../hooks/useCourseStatusContex";
import useToastHook from "../hooks/useToast";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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
  noNeedDescription?: boolean;
  isLoading?: boolean;
  isOneButton?: boolean;
  buttonTitle?: string;
};

const CourseCard: FC<CourseCardProps> = ({
  course,
  isLoading,
  isOneButton,
  noNeedDescription,
  buttonTitle,
}) => {
  const [newToast] = useToastHook();
  const { status } = useCourseStatusContext();
  const [cartButtonLoading, setCartButtonLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
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

  const handleAddToCart = async () => {
    setCartButtonLoading(true);
    try {
      const response = await axiosPrivate.put(
        `/auth/courses/add-to-cart/${course._id}`
      );
      newToast({ message: response.data.message, condition: "success" });
      setCartButtonLoading(false);
    } catch (error) {
      newToast({ message: error.response.data.message, condition: "error" });
      setCartButtonLoading(false);
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
              {!noNeedDescription && (
                <Text fontSize={"sm"}>{course?.description}</Text>
              )}
              <Text
                className="tw-font-extrabold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-teal-600 tw-via-sky-400 tw-to-cyan-500"
                fontSize="2xl"
              >
                ${course?.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            {!status ? (
              <Skeleton isLoaded={!isLoading}>
                <Flex gap="2">
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

                  <Button
                    display={isOneButton ? "none" : "block"}
                    variant="outline"
                    isLoading={cartButtonLoading}
                    loadingText="Adding"
                    colorScheme="whatsapp"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                </Flex>
              </Skeleton>
            ) : (
              <Skeleton isLoaded={!isLoading}>
                <Button
                  variant="solid"
                  onClick={() =>
                    navigate("/courseInfo", {
                      state: { course, isLoading },
                    })
                  }
                  colorScheme="yellow"
                >
                  Start Learning
                </Button>
              </Skeleton>
            )}
          </CardFooter>
        </Card>
      </Box>
    </>
  );
};
export default CourseCard;
