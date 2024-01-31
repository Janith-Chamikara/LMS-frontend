import { Text, useDisclosure } from "@chakra-ui/react";
import { FC, useRef } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomTextInput from "./CustomTextInput";
import { emailSchema } from "../schemas/schema";
import useToastHook from "../hooks/useToast";
import axios from "../axios/axios";
type ModalProps = {
  buttonTitle: string;
};

const CustomModalForResetPassword: FC<ModalProps> = ({ buttonTitle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(emailSchema) });
  const [newToast] = useToastHook();
  const onClick = async (data: FieldValues) => {
    try {
      const email = data.email;
      const response = await axios.post(
        "/auth/resetPassword",
        { email },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      newToast({ message: response.data.message, condition: "success" });
    } catch (error) {
      newToast({ message: error.response.data.message, condition: "error" });
    }
  };
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} variant={"unstyled"} _hover={{color:'teal.300'}}>
        {buttonTitle}
      </Button>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay backdropFilter={"auto"} backdropBlur={"5px"} />
        <ModalContent>
          <ModalHeader>Forgot Password ?</ModalHeader>

          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize={"sm"}>
              Provide your email to us and we will send an email regarding
              furthur steps
            </Text>
            <br />
            <Box ref={initialRef}>
              <CustomTextInput
                errors={errors}
                register={register}
                name="email"
                placeholder="Enter your signed email"
                type="email"
                isRequired={false}
              >
                Provide your email
              </CustomTextInput>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={isSubmitSuccessful}
              isLoading={isSubmitting}
              loadingText="Publishing your review"
              type="submit"
              onClick={handleSubmit(onClick)}
              colorScheme="blue"
              mr={3}
            >
              Send Email
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModalForResetPassword;
