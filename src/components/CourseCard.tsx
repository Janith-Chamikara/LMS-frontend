import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

type courseType = {
  thumbnail:{
    public_id:string,
    url:string
  },
  description:string,
  name:string,
  price:string
}

type CourseCardProps ={
  course:courseType
}

const CourseCard: FC<CourseCardProps> = ({course}) => {
  const navigate = useNavigate()
  const color = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Box className="tw-shadow-[4px_4px_10px_0px_#319795]" rounded={"xl"}>
        <Card maxW="sm" bgColor={color}>
          <CardBody>
            <Box maxWidth={"sm"} overflow={"hidden"} borderRadius="lg" maxHeight={"40vh"}>
              <Image
                src={course.thumbnail?.url}
                alt="Green double couch with wooden legs"
                width={"100%"}
                className="tw-transition tw-duration-300 tw-ease-in-out hover:tw-scale-110"
              />
            </Box>

            <Stack mt="6" spacing="3">
              <Heading size="md">{course.name}</Heading>
              <Text>
                {course.description}
              </Text>
              <Text color="blue.600" fontSize="2xl">
                ${course.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button  variant="solid" onClick={()=>navigate("/courseInfo",{state:course})} colorScheme="blue">
                Buy now
              </Button>
              <Button variant="ghost" colorScheme="blue">
                Add to cart
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Box>
    </>
  );
};
export default CourseCard;
