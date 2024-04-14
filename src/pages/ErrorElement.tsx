import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

const ErrorElement:FC = () => {
 const color = useColorModeValue("gray.100", "gray.900");
 return  (
  <div className={`tw-min-h-screen  tw-flex tw-flex-grow tw-items-center tw-justify-center`}>
  <Box bgColor={color} className={`tw-rounded-lg  tw-p-8 tw-text-center tw-shadow-xl`}>
    <Heading className="tw-mb-4 tw-text-4xl tw-font-bold">404 ;(</Heading>
    <Text>Oops! The page you are looking for could not be found.</Text>
    <Link to="/" className="tw-mt-4 tw-inline-block tw-rounded tw-bg-blue-500 tw-px-4 tw-py-2 tw-font-semibold  hover:tw-bg-blue-600"> Go back to Home </Link>
  </Box>
</div>
 )
}

export default ErrorElement;