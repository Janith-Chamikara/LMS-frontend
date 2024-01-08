import { Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { OTPSchema } from "../../schemas/schema";
import CustomTextInput from "../../components/CustomTextInput";
import { useLocation } from "react-router-dom";
import useToastHook from "../../hooks/useToast";
import axios from "../../axios/axios";
import CustomButton from "../../components/CustomButton";

const VerifyOTP: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(OTPSchema),
  });
  const [newToast] = useToastHook();
  const location = useLocation();
  const token = location.state.token;
  const onSubmit = async (data: FieldValues) => {
    const keyFromBody = data.verification;
    try {
      const response = await axios.post(
        "auth/register/activate",
        { activationKey: keyFromBody },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      newToast({ message: response.data.message, condition: "success" });
    } catch (err) {
      console.log(err);
      if (err.response) {
        newToast({ message: err.response.data.message, condition: "error" });
      } else if (err.request) {
        // The client never received a response, and the request was never left
        console.log(err.request);
      } else {
        console.log(err);
      }
    }
  };
  return (
    <main className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-[100vw] tw-h-[100vh]">
      <form onSubmit={handleSubmit(onSubmit)} className="tw-flex tw-flex-col">
        <Text className="tw-text-xl tw-font-bold tw-p-2 tw-border-b-2 tw-mb-5 tw-text-center">
          Verify your account.
        </Text>
        <Text>We have sended a OTP to your email.</Text>
        <div>
          <CustomTextInput
            errors={errors}
            name="verification"
            register={register}
            type="text"
          >
            Enter Verification Code
          </CustomTextInput>
        </div>

        <div className="tw-flex tw-flex-row tw-justify-center tw-items-center">
          <CustomButton
            as="button"
            type="submit"
            isLoading={isSubmitting}
            loadingText="Verifying..."
            text="Verify"
            variant="solid"
            colorSheme="teal"
            className="tw-mt-6"
          />
        </div>
      </form>
    </main>
  );
};

export default VerifyOTP;