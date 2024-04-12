import { useDisclosure } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useRef } from "react";
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
import CustomTextInput from "./CustomTextInput";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import useToastHook from "../hooks/useToast";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { convertToBase64 } from "../utils/utils";
import useProfileContext from "../hooks/useProfileContext";
import { Profile } from "../context/ProfileImageProvider";
import { isAxiosError } from "axios";
type Props = {
  type: string;
  name: string;
  text: string;
  schema: ZodSchema;
  onSubmit: (data: object) => void;
  field: string;
  placeHolderText: string;
  setName: Dispatch<SetStateAction<undefined>>;
  setImg: Dispatch<SetStateAction<undefined>>;
  buttonTitle?: string;
};

const UpdateProfileInfoModal: FC<Props> = ({
  text,
  schema,
  type,
  setName,
  setImg,
  name,
  placeHolderText,
  field,
  buttonTitle,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(schema) });
  const initialRef = useRef(null);
  const { setProfile } = useProfileContext();
  const [newToast] = useToastHook();
  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const axiosPrivate = useAxiosPrivate();

  const handleNameUpdate = async (data: FieldValues) => {
    try {
      const response = await axiosPrivate.put("/auth/update-user-details", {
        name: data.newName,
      });
      setName(response.data.name);
      (setProfile as Dispatch<SetStateAction<Profile | null>>)((pv) => ({ ...(pv as Profile), name: data.newName as string }));
      newToast({ message: response.data.message, condition: "success" });
    } catch (error) {
      if (isAxiosError(error))
        newToast({
          message: error?.response?.data?.message,
          condition: "error",
        });
    }
  };
  const handleAvatarUpdate = async (data: FieldValues) => {
    try {
      const file = await convertToBase64(data.avatar["0"]);
      const response = await axiosPrivate.post("auth/update-profile-image", {
        avatar: file,
      });
      setImg(response.data.newAvatar.url);
      (setProfile as Dispatch<SetStateAction<Profile | null>>)((pv) => ({
        ...(pv as Profile),
        url: response.data.newAvatar.url as string,
      }));
      newToast({ message: response.data.message, condition: "success" });
    } catch (error) {
      if (isAxiosError(error))
        newToast({
          message: error?.response?.data?.message,
          condition: "error",
        });
    }
  };

  return (
    <>
      <Button onClick={onOpen} variant={"solid"} colorScheme="blue">
        Update {buttonTitle}
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
          <ModalHeader>Update {field}</ModalHeader>

          <ModalCloseButton />
          <ModalBody pb={6}>
            <br />
            <Box ref={initialRef}>
              <CustomTextInput
                errors={errors}
                register={register}
                name={name}
                placeholder={placeHolderText}
                type={type}
                isRequired={false}
              >
                {text}
              </CustomTextInput>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={isSubmitSuccessful}
              isLoading={isSubmitting}
              loadingText="Please wait."
              type="submit"
              onClick={
                name === "newName"
                  ? handleSubmit(handleNameUpdate)
                  : handleSubmit(handleAvatarUpdate)
              }
              colorScheme="blue"
              mr={3}
            >
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateProfileInfoModal;
