import { FC } from "react";
import { motion } from "framer-motion";
import { Avatar, Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { ImQuotesLeft } from "react-icons/im";
import { springOptions } from "./springOptions";
import { reviews } from "./reviews";

type TestimonialsProps = { ID: number };

const Testimonials: FC<TestimonialsProps> = ({ ID }) => {
 const color = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      {reviews.map((review, index) => (
        <motion.div
          key={index}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="tw-aspect-video tw-w-[100%] md:tw-w-[50%] tw-shrink-0 tw-object-cover tw-mx-auto "
          animate={{
            scale:(ID === index ? "0.95" : "0.85"),
          }}
          transition={springOptions}
        >
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
              <Icon as={ImQuotesLeft} w={10} h={10} color="gray.700" />
              <Text fontSize="md" fontWeight="medium">
                {review.comment}
              </Text>
              <Stack alignItems="center" spacing={0}>
                <Avatar
                  size="xl"
                  showBorder={true}
                  borderColor="green.400"
                  name="avatar"
                  src={review.avatar}
                />
                <Text fontWeight="bold" fontSize="lg">
                  {review.name}
                </Text>
                <Text fontWeight="medium" fontSize="sm" >
                  {review.position}, {review.company}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </motion.div>
      ))}
    </>
  );
};
export default Testimonials;
