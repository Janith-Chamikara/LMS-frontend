import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput";
import Password from "../../components/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../schemas/schema";
import { Text } from "@chakra-ui/react";
import axios from "../../axios/axios";
import useToastHook from "../../hooks/useToast";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import CustomLink from "../../components/CustomLink";
import { convertToBase64 } from "../../utils/utils";
import useProfileContext from "../../hooks/useProfileContext";
const SignUp: FC = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const [newToast] = useToastHook();
  const navigate = useNavigate();
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const file = await convertToBase64(data.profileImg["0"]);
    const name = data.firstName + " " + data.lastName;
    const req = {
      profileImg: file,
      name: name,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post("auth/register", req);
      newToast({ message: response.data.message, condition: "success" });
      console.log(response);
      const token = response.data.token;
      newToast({message:response.data.message,condition:'success'})
      setTimeout(()=>navigate("/verify", { state: { token: token } }),2000);
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
    <main className="tw-flex tw-flex-col tw-w-[100vw] tw-h-[100vh] tw-justify-center tw-items-center">
      <Text className="tw-text-xl tw-font-bold tw-p-2 tw-border-b-2 tw-mb-5">
        Sign Up
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomTextInput
          errors={errors}
          register={register}
          name="firstName"
          placeholder="Enter your first name "
          type="text"
          isRequired={false}
        >
          First Name
        </CustomTextInput>
        <CustomTextInput
          errors={errors}
          register={register}
          name="lastName"
          placeholder="Enter your last name "
          type="text"
          isRequired={false}
        >
          Last Name
        </CustomTextInput>
        <CustomTextInput
          errors={errors}
          register={register}
          name="email"
          placeholder="Enter your email "
          type="email"
          isRequired={false}
        >
          email
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
        <CustomTextInput
          flushed={true}
          errors={errors}
          register={register}
          name="profileImg"
          placeholder="Provide a profile image"
          type="file"
          isRequired={false}
        >
          Profile Image
        </CustomTextInput>
        <span>
          Already have an account?{" "}
          <CustomLink
            text="Sign In"
            to="/signIn"
            className="tw-text-teal-500"
          />
        </span>
        <div className="tw-flex tw-flex-row tw-justify-center tw-items-center">
          <CustomButton
            as="button"
            type="submit"
            isLoading={isSubmitting}
            loadingText="Please wait..."
            text="Sign Up"
            variant="solid"
            colorSheme="teal"
            className="tw-mt-6"
          />
        </div>
      </form>
    </main>
  );
};

export default SignUp;
