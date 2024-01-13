import {
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
      <Card
        direction={{ base: "column", md: "row" }}
        overflow="hidden"
        variant="filled"
      >
        <Image
          objectFit="cover"
          width={{base:"100%",md:"40%"}}
          src={url}
          alt="Profile image"
        />

        <Stack width={"100%"}>
          <CardBody>
            <Heading size="md">Welcome , {name}</Heading>
            <Flex mt={"10px"} gap={'5px'} direction={"column"}>
            <Stack padding={"10px"} border={"1px"} borderColor={"gray.400"} borderRadius={"xl"} direction={"row"} justifyContent={"space-between"}>
              <Text py="2" >Name : {name}</Text>
              <Button variant={"solid"} colorScheme="teal">
                Change Name
              </Button>
            </Stack>
            <Text padding={"10px"}  border={"1px"} borderColor={"gray.400"} borderRadius={"xl"}>User ID : {id}</Text>
            <Stack padding={"10px"} direction={"row"} border={"1px"} borderColor={"gray.400"} borderRadius={"xl"} justifyContent={"space-between"}>
              <Text py="2">email : {email}</Text>
              <Button variant={"solid"} colorScheme="teal">
                Change Email
              </Button>
            </Stack>
            <Stack justifyContent={"space-between"}>
              <Button variant={"solid"} colorScheme="teal">
                Forget Password?
              </Button>
            </Stack></Flex>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
};

export default ProfileCard;
