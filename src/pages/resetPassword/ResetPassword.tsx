import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Password from "../../components/password";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../schemas/schema";
import CustomButton from "../../components/CustomButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import useToastHook from "../../hooks/useToast";
import CustomLink from "../../components/CustomLink";
import axios from "../../axios/axios";
const ResetPassword: FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });
  const navigate = useNavigate();
  const [newToast] = useToastHook();
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    console.log("clicked");
    try {
      const { password } = data;
      const response = await axios.post(
        "/auth/resetPassword/reset",
        {
          password,
          token,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      newToast({ message: response.data.message, condition: "success" });
      setTimeout(() => navigate("/signIn"), 2000);
    } catch (error) {
      newToast({ message: error.response.data.message, condition: "error" });
      setTimeout(() => navigate("/signIn"), 5000);
    }
  };

  return (
    <>
      <main className="tw-flex tw-flex-col tw-w-[100vw] tw-h-[100vh] tw-justify-center tw-items-center">
        <Text className="tw-text-xl tw-font-bold tw-p-2 tw-border-b-2 tw-mb-5">
          Reset Password
        </Text>
        <Text className="tw-text-sm tw-font-bold tw-p-2  tw-mb-5">
          This link will be expired in 5 minutes.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Password
            errors={errors}
            name="password"
            register={register}
            placeholder="Enter your password"
            isRequried={false}
          >
            New Password
          </Password>
          <Password
            errors={errors}
            name="confirmPassword"
            register={register}
            placeholder="Enter password again"
            isRequried={false}
          >
            Confirm New password
          </Password>
          <Flex justifyContent={"center"} alignItems={"center"}>
            <CustomLink
              text="Back to home"
              to="/"
              className="tw-text-teal-500"
            />
          </Flex>
          <div className="tw-flex tw-flex-row tw-justify-center tw-items-center">
            <CustomButton
              as="button"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Please wait..."
              text="Reset Password"
              variant="solid"
              colorSheme="teal"
              className="tw-mt-6"
            />
          </div>
        </form>
      </main>
    </>
  );
};

export default ResetPassword;
