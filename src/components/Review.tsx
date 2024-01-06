import {
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { ImStarFull } from "react-icons/im";

type reviewType = {
  name: string;
  position: string;
  comment: string;
};
type Props = {
  review: reviewType;
};
const Review: FC<Props> = ({ review }) => {
  const color = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Stack
        direction="column"
        bgColor={color}
        spacing={0}
        p={8}
        rounded="lg"
        justifyContent="center"
        className="tw-shadow-[-5px_5px_16px_0px_#4fd1c5]"
      >
        <Stack direction="column" spacing={4} textAlign="left" maxW="4xl">
          <Text fontSize="md" fontWeight="medium">
            {review.comment}
          </Text>
          <HStack>
            <Icon as={ImStarFull} />
            <Icon as={ImStarFull} />
            <Icon as={ImStarFull} />
            <Icon as={ImStarFull} />
            <Icon as={ImStarFull} />
            <Icon as={ImStarFull} />
          </HStack>
          <Stack alignItems="center" spacing={0}>
            {/* <Avatar
              size="xl"
              showBorder={true}
              borderColor="green.400"
              name="avatar"
              src={review.avatar}
            /> */}
            <Text fontWeight="bold" fontSize="lg">
              {review.name}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
export default Review;
