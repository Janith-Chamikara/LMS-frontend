import { Text } from "@chakra-ui/react";
import { FC } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import Password from "../../components/password";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../schemas/schema";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import useToastHook from "../../hooks/useToast";
import CustomLink from "../../components/CustomLink";
import useAuthContext from "../../hooks/useAuthContext";
import axios from "../../axios/axios";

const SignIn: FC = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const navigate = useNavigate();
  // const axios = useAxiosPrivate()
  const [newToast] = useToastHook();
  const { setAuth } = useAuthContext();
  const onSubmit = async (data: FieldValues) => {
    const req = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post("auth/login", req);
      newToast({ message: response.data.message, condition: "success" });
      console.log(response);
      const {
        accessToken,
        refreshToken,
        userInfo: { id, name, email, roles, courses,avatar },
      } = response.data;
      response && setAuth({ avatar, name, id, roles, courses, email, accessToken, refreshToken });
      navigate("/");
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
    <>
      <main className="tw-flex tw-flex-col tw-w-[100vw] tw-h-[100vh] tw-justify-center tw-items-center">
        <Text className="tw-text-xl tw-font-bold tw-p-2 tw-border-b-2 tw-mb-5">
          Sign In
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomTextInput
            errors={errors}
            register={register}
            name="email"
            placeholder="Enter your email "
            type="email"
            isRequired={false}
          >
            Email
          </CustomTextInput>
          <Password
            errors={errors}
            name="password"
            register={register}
            placeholder="Enter your password"
            isRequried={false}
          >
            Password
          </Password>
          <Password
            errors={errors}
            name="confirmPassword"
            register={register}
            placeholder="Enter password again"
            isRequried={false}
          >
            Confirm password
          </Password>
          <span>
            Don't have an account yet?{" "}
            <CustomLink
              text="Sign Up"
              to="/signUp"
              className="tw-text-teal-500"
            />
          </span>
          <div className="tw-flex tw-flex-row tw-justify-center tw-items-center">
            <CustomButton
              as="button"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Please wait..."
              text="Sign In"
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
export default SignIn;