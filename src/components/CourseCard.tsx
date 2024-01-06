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

const CourseCard: FC = () => {
  const color = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Box className="tw-shadow-[4px_4px_10px_0px_#319795]" rounded={"xl"}>
        <Card maxW="sm" bgColor={color}>
          <CardBody>
            <Box maxWidth={"sm"} overflow={"hidden"} borderRadius="lg">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                
                className="tw-transition tw-duration-300 tw-ease-in-out hover:tw-scale-110"
              />
            </Box>

            <Stack mt="6" spacing="3">
              <Heading size="md">Living room Sofa</Heading>
              <Text>
                This sofa is perfect for modern tropical spaces, baroque
                inspired spaces, earthy toned spaces and for people who love a
                chic design with a sprinkle of vintage design.
              </Text>
              <Text color="blue.600" fontSize="2xl">
                $450
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="blue">
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
