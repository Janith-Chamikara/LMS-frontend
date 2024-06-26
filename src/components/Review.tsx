import {
  Avatar,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ImStarFull } from "react-icons/im";
import { FaQuoteLeft } from "react-icons/fa";


type Review = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key:string]: any;
};
const Review = ({ review }:{review:Review}) => {
  const color = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Stack
        direction="column"
        bgColor={color}
        spacing={0}
        p={{base:"10px",md:8}}
        rounded="lg"
        justifyContent="center"
        className="tw-shadow-[-5px_5px_16px_0px_#4fd1c5]"
      >
        <Stack
          direction="column"
          justify={"center"}
          alignItems="center"
          maxW="4xl"
        >
          <Text
            as="span"
            fontStyle={"italic"}
            textAlign={"justify"}
            fontWeight="medium"
            fontSize={{base:"xs",md:"md"}}
          >
            <FaQuoteLeft />{" "}
            {review.comment
              ? review.comment
              : "This course hasn't been reviewed yet."}
          </Text>

          <Stack alignItems="center" justifyContent={"center"} spacing={0}>
            <Avatar
              size={{base:"lg",md:"xl"}}
              showBorder={true}
              borderColor="green.400"
              name="avatar"
              src={review.avatar}
            />
            <Flex gap={"2px"} alignItems="center" fontWeight="bold" fontSize="sm">
              <Text fontWeight="bold" fontSize="xs">
                {review.rating}
              </Text>
              <Icon as={ImStarFull} color={"yellow"} />
            </Flex>
            <Text fontWeight="bold" fontSize="xs">
              {review.name}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
export default Review;
