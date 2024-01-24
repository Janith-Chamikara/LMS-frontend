import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import { Link, useSearchParams } from "react-router-dom";
import Stripe from "stripe";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const Success: FC = () => {
  const color = useColorModeValue("gray.100", "gray.900");
  const axiosPrivate =  useAxiosPrivate()
  const [searchParams] = useSearchParams();
  const [data, setData] = useState();
  console.log(data);
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);
  useEffect(() => {
    const getSuccessData = async () => {
      const stripe = new Stripe(
        "sk_test_51Oc4LoFlCSzpCWS8KB8l3KDwZ5ETrX1v2nlYH3ALG40Hwwzvg9JdTdCjpKCj3kNVxOEmkq7iOQHJJ9GkGW1AHoHB00ZGkyOTg6"
      );
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const orderData = session.metadata; // Your custom data stored in the session
      // Use orderData in your success page rendering
      setData(orderData);
      const response = await axiosPrivate.post(
        "/courses/auth/purchase-a-course",
        {
          courseId:orderData.courseId,
          paymentInfo: sessionId,
        })
      return orderData;
    };
    getSuccessData();
  }, []);



  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      className="tw-h-screen"
    >
      <Box
        bg={color}
        className=" md:tw-mx-auto"
        padding={"50px"}
        borderRadius={"xl"}
        border={"1px"}
        borderColor={"gray.400"}
      >
        <svg
          viewBox="0 0 24 24"
          className="tw-text-green-600 tw-w-16 tw-h-16 tw-mx-auto tw-my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="tw-text-center">
          <Heading className="md:tw-text-2xl tw-text-base tw-font-semibold tw-text-center">
            Payment Done!
          </Heading>
          <Text className=" tw-my-2">
            Thank you for completing your secure online payment.
          </Text>
          <p> Have a great day! </p>
          <div className="tw-py-10 tw-text-center">
            <CustomButton
              as={Link}
              text="Start Learning Now"
              variant="solid"
              to={`/courses/courseInfo/${data?.courseId}`}
              colorSheme="yellow"
            />
          </div>
        </div>
      </Box>
    </Flex>
  );
};

export default Success;
