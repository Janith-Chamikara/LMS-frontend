import {
  Avatar,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import UpdateProfileInfoModal from "./UpdateProfileInfoModal";
import { Link } from "react-router-dom";
import { avatarSchema, nameSchema } from "../schemas/schema";

type ProfileCardProps = {
  name: string;
  setName: Dispatch<SetStateAction<undefined>>;
  setImg: Dispatch<SetStateAction<undefined>>;
  email: string;
  url: string;
  id: string;
};

const ProfileCard: FC<ProfileCardProps> = ({
  name,
  setName,
  setImg,
  email,
  url,
  id,
}) => {
  return (
    <>
      <Card direction={{ base: "column", lg: "row" }} variant="filled">
        <Image
          className="tw-shadow-[4px_4px_10px_0px_#319795]"
          borderLeftRadius={"xl"}
          objectFit="cover"
          width={"30%"}
          display={{ base: "none", lg: "block" }}
          src={url}
          alt="Profile image"
        />
        <Flex
          pt={"50px"}
          className="tw-shadow-[4px_4px_10px_0px_#319795]"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar
            display={{ base: "block", lg: "none" }}
            size={"xl"}
            showBorder={true}
            borderColor="green.400"
            name="avatar"
            src={url}
          />
        </Flex>

        <Stack width={"100%"} className="tw-shadow-[4px_4px_10px_0px_#319795]">
          <CardBody>
            <Heading size="md">Welcome , {name}</Heading>
            <Flex
              mt={"10px"}
              gap={"5px"}
              direction={"column"}
              fontSize={{ base: "sm", md: "md" }}
            >
              <Stack
                width={"100%"}
                padding={"10px"}
                border={"1px"}
                borderColor={"gray.400"}
                borderRadius={"xl"}
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Text py="2">Name : {name}</Text>
                <UpdateProfileInfoModal
                  schema={nameSchema}
                  field="Name"
                  setName={setName}
                  setImg={setImg}
                  name="newName"
                  type="text"
                  onSubmit={(data: object) => console.log(data)}
                  text="New Name"
                  placeHolderText="Provide your new name"
                />
              </Stack>
              <Text
                padding={"10px"}
                border={"1px"}
                borderColor={"gray.400"}
                borderRadius={"xl"}
              >
                User ID : {id}
              </Text>
              <Text
                padding={"10px"}
                border={"1px"}
                borderColor={"gray.400"}
                borderRadius={"xl"}
              >
                Email : {email}
              </Text>

              <Stack justifyContent={"space-between"}>
                <UpdateProfileInfoModal
                  schema={avatarSchema}
                  buttonTitle="Profile Image"
                  field="Profile image"
                  type="file"
                  setName={setName}
                  setImg={setImg}
                  name="avatar"
                  onSubmit={(data: object) => console.log(data)}
                  text="New Profile Image"
                  placeHolderText="Provide your new avatar"
                />
                <Button
                  as={Link}
                  to="/resetPassword"
                  variant={"outline"}
                  colorScheme="facebook"
                >
                  Forget Password?
                </Button>
              </Stack>
            </Flex>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
};

export default ProfileCard;
