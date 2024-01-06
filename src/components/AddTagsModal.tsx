import { FC, useState } from "react";
import {
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Tag,
  TagLabel,
  useDisclosure,
  TagCloseButton,
  ModalCloseButton,
} from "@chakra-ui/react";
import CustomTextInput from "./CustomTextInput";
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
type FormProps = {
  register: UseFormRegister<FieldValues>;
  fieldName:string;
  title?:string;
  subTitle?:string;
  errors: FieldErrors<FieldValues>;
  watch:UseFormWatch<FieldValues>;
  setValue:UseFormSetValue<FieldValues>
};

export const AddTagsModal: FC<FormProps> = ({register,setValue,errors,watch,fieldName,title,subTitle}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tags, setTags] = useState<string[]>([]);
  const current = watch(fieldName);
  const handleAddTag = () => {
    setValue(fieldName,'');
    current && setTags([...tags,current])
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <HStack alignItems={"center"} mt={"20px"}>
        <Button onClick={onOpen}>{title}</Button>
        <HStack spacing={4} alignItems={"center"}>
          {tags.map((tag) => (
            <Tag key={tag} rounded="full" variant="subtle" colorScheme="teal">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveTag(tag)} />
            </Tag>
          ))}
        </HStack>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody padding={"30px"}>
            {/* <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter a tag"
            /> */}
            <CustomTextInput
              errors={errors}
              register={register}
              name={fieldName}
              placeholder=""
              type="text"
              isRequired={false}
            >
              {subTitle}
            </CustomTextInput>
            <Button
              colorScheme="teal"
              variant={"solid"}
              onClick={handleAddTag}
              mt={"20px"}
            >
              Add
            </Button>
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTagsModal;
