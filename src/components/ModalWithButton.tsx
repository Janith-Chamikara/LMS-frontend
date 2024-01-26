import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { reviewFormSchema } from "../schemas/schema";
import CustomTextInput from "./CustomTextInput";
import useToastHook from "../hooks/useToast";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ModalWithButton: FC<{ courseId: string }> = ({ courseId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(reviewFormSchema) });
  const [newToast] = useToastHook();
  console.log(isSubmitting, isSubmitSuccessful);
  const axiosPrivate = useAxiosPrivate();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const onClick = async (data: FieldValues) => {
    const { review, rating } = data;
    try {
      const response = await axiosPrivate.post(
        `/courses/auth/add-review/${courseId}`,
        { comment: review, rating }
      );
      newToast({ message: response.data?.message, condition: "success" });
    } catch (error) {
      newToast({ message: error.response.data.message, condition: "error" });
    }
  };
  return (
    <>
      <Button onClick={onOpen} variant={"solid"} colorScheme="teal">
        Add a Review
      </Button>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay backdropFilter={'auto'} backdropBlur={'5px'} />
        <ModalContent>
          <ModalHeader>Publish a review</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box ref={initialRef}>
              <CustomTextInput
                errors={errors}
                register={register}
                name="rating"
                placeholder="Enter rating between 0 - 5 "
                type="text"
                isRequired={false}
              >
                Rating
              </CustomTextInput>
            </Box>
            <CustomTextInput
              errors={errors}
              register={register}
              name="review"
              placeholder="Enter your review (minmum characters 20)"
              type="text"
              isRequired={false}
            >
              Your review
            </CustomTextInput>
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
              Publish
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </>
  );
};

export default ModalWithButton;
