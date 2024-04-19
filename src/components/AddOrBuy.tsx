import { FC, useState } from "react";
import useCourseStatusContext from "../hooks/useCourseStatusContex";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { loadStripe } from "@stripe/stripe-js";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Skeleton } from "@chakra-ui/react";
import useToastHook from "../hooks/useToast";
import { courseType } from "../pages/courseInfo/CourseInfoWithParams";

type CourseCardProps = {
  course: courseType;
  isLoading?: boolean;
  isOneButton?: boolean;
  buttonTitle?: string;
};

const AddOrBuy: FC<CourseCardProps> = ({
  course,
  isLoading,
  isOneButton,
  buttonTitle,
}) => {
  const { status } = useCourseStatusContext();
  const [cartButtonLoading, setCartButtonLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [newToast] = useToastHook();
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(`${import.meta.env.VITE_STRIPE_KEY}`); //add to .env

      const body = {
        course,
      };

      const response = await axiosPrivate.post(
        "/auth/create-checkout-session",
        body
      );

      const result = await stripe?.redirectToCheckout({
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
      if (isAxiosError(error))
        newToast({
          message: error?.response?.data?.message,
          condition: "error",
        });
      setCartButtonLoading(false);
    }
  };

  const navigate = useNavigate();
  return (
    <>
      {!status ? (
        <Skeleton isLoaded={!isLoading}>
          <Flex gap="2">
            <Button
              variant="solid"
              fontSize={"xs"}
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
              fontSize={"xs"}
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
            fontSize={"xs"}
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
    </>
  );
};

export default AddOrBuy;
