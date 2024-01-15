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
import { FC } from "react";

type ProfileCardProps = {
  name: string;
  email: string;
  url: string;
  id: string;
};

const ProfileCard: FC<ProfileCardProps> = ({ name, email, url, id }) => {
  return (
    <>
      <Card direction={{ base: "column", lg: "row" }} variant="filled">
        <Image borderLeftRadius={"xl"} objectFit="cover" width={"30%"} display={{base:"none",lg:"block"}} src={url} alt="Profile image" />
        <Flex pt={"50px"} justifyContent={"center"} alignItems={"center"}>
        <Avatar
          display={{base:"block",lg:'none'}}
          size={"xl"}
          
          showBorder={true}
          borderColor="green.400"
          name="avatar"
          src={url}
        /></Flex>

        <Stack width={"100%"}>
          <CardBody>
            <Heading size="md">Welcome , {name}</Heading>
            <Flex mt={"10px"} gap={"5px"} direction={"column"} fontSize={{ base: "sm", md: "md" }}>
              <Stack
                width={"100%"}
                padding={"10px"}
                border={"1px"}
                borderColor={"gray.400"}
                borderRadius={"xl"}
                direction={"row"}
                justifyContent={"space-between"}
                
              >
                <Text py="2" >
                  Name : {name}
                </Text>
                <Button variant={"solid"} colorScheme="facebook">
                  Change Name
                </Button>
              </Stack>
              <Text
                padding={"10px"}
                border={"1px"}
                borderColor={"gray.400"}
                borderRadius={"xl"}
              >
                User ID : {id}
              </Text>
              <Stack
                padding={"10px"}
                direction={"row"}
                border={"1px"}
                borderColor={"gray.400"}
                borderRadius={"xl"}
                justifyContent={"space-between"}
              >
                <Text py="2">Email : {email}</Text>
                <Button variant={"solid"} colorScheme="facebook">
                  Change Email
                </Button>
              </Stack>
              <Stack justifyContent={"space-between"}>
                <Button variant={"solid"} colorScheme="facebook">
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
