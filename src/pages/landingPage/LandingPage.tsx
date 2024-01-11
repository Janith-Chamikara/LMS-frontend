import { FC } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import hero from "../../images/hero.png";
import { assests, svgList } from "./partners";
import { motion } from "framer-motion";
import {
  heroImgVariant,
  heroTextVariant,
  heroBackVariant,
} from "../../animationVariants/variants";
import AnimatedText from "../../components/AnimatedText";
import CustomButton from "../../components/CustomButton";
import { Link } from "react-router-dom";
import LandingPageCard from "../../components/LandingPageCard";
import SwipeCarousel from "../../SwipeCarousel/SwipeCarousel";
import Benifit from "../../components/BenifitCard/Benifit";
import { benifits } from "../../components/BenifitCard/benifits";
import Offer from "../../components/offer/Offer";
import { offers } from "../../components/offer/offers";
import ScrollYProgress from "../../components/ScrollYProgress";


const LandingPage: FC = () => {
  const color = useColorModeValue("gray.100", "gray.900");
  return (
    <div className="tw-relative tw-mx-auto  tw-overflow-hidden">
      <ScrollYProgress/>
      <Box
        as={motion.div}
        bg={color}
        variants={heroBackVariant}
        initial="initial"
        animate="animate"
        className="tw-hidden tw-absolute -tw-top-[80vh] tw-z-0 tw-w-[70vw] tw-h-[170vh] -tw-left-[28vw] lg:tw-block"
      />
      <Flex
        direction={{ base: "column-reverse", lg: "row" }}
        alignItems={"center"}
        justifyContent={{ base: "space-between", lg: "center" }}
        className="tw-relative"
      >
        {/* hero image */}
        <Image
          as={motion.img}
          display={{ base: "none", md: "flex" }}
          flex={"1"}
          src={hero}
          width={"50%"}
          variants={heroImgVariant}
          initial="initial"
          whileInView={"animate"}
        />
        {/*hero content*/}
        <Flex
          as={motion.div}
          flex={"1"}
          width={{ base: "80vw" }}
          direction={"column"}
          alignItems={"center"}
          textAlign={"center"}
          gap={"30px"}
          variants={heroTextVariant}
          initial="initial"
          whileInView="animate"
        >
          <Heading
            flex={"1"}
            fontWeight={"bold"}
            fontSize={{ base: "4xl", lg: "6xl" }}
          >
            Learn at Your Own Place, in Your Own Way
          </Heading>
          <Text>
            {/* <AnimatedText
              delay={1000}
              text="Our LMS makes it easy for you to create and deliver engaging online courses so you can learn or teach what you want, when you want.Those courses that can help you develop the skills you need to succeed in your chosen field"
              once={true}
            /> */}
            Our LMS makes it easy for you to create and deliver engaging online
            courses so you can learn or teach what you want, when you want.Those
            courses that can help you develop the skills you need to succeed in
            your chosen field
          </Text>

          <Stack direction="row" gap="20px">
            <CustomButton
              as={Link}
              isLoading={false}
              loadingText="Loading"
              text="Sign Up"
              variant="solid"
              colorSheme="teal"
              height="50px"
              width={{ base: "110px", md: "150px" }}
              to="/signup"
            />
            <CustomButton
              as={Link}
              isLoading={false}
              loadingText="Loading"
              text="Log in"
              variant="outline"
              colorSheme="teal"
              height="50px"
              width={{ base: "110px", md: "150px" }}
              to="signin"
            />
          </Stack>
        </Flex>
      </Flex>

      {/*Trusted companies*/}
      <Flex
        bg={color}
        width={"100vw"}
        height={"300px"}
        direction="column"
        gap="30px"
        py={"20px"}
        justify={"center"}
        alignItems={"center"}
      >
        {/* <Text
          
          width={"80vw"}
          fontWeight={"bold"}
          fontSize={{ base: "1xl", lg: "2xl" }}
          textAlign={"center"}
        >
          Trusted by over 15,000 companies and millions of learners around the
          world
        </Text> */}
        <AnimatedText
          className="tw-w-[80vw] tw-font-bold md:tw-text-2xl sm:tw-text-lg tw-text-center"
          text="Trusted by over 15,000 companies and millions of learners around the world"
          once={true}
        />
        <Box className="tw-w-[80vw] tw-grid tw-grid-rows-2 tw-grid-cols-4  tw-gap-[10px] lg:tw-grid-rows-1 lg:tw-grid-cols-8 tw-justify-items-center tw-items-center">
          {svgList.map((svg) => (
            <Image src={svg.src} key={svg.id} />
          ))}
        </Box>
      </Flex>

      {/*Become instructer or learner*/}
      <Flex direction={"column"}>
        {assests.map((item) => (
          <LandingPageCard
            title={item.title}
            buttonTitle={item.buttonTitle}
            description={item.description}
            key={item.id}
            id={item.id}
            src={item.src}
          />
        ))}
      </Flex>

      {/*Testimonials*/}
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"transparent"}
      >
        <AnimatedText
          className="tw-w-[80vw] tw-font-bold md:tw-text-5xl tw-text-3xl tw-text-center tw-mt-[50px]"
          text="What people say about Empower Academy?"
          once={true}
        />
      </Box>
      <SwipeCarousel widthMax={"100"} />

      {/*Benifits*/}
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"20px"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"transparent"}
      >
        <AnimatedText
          className="tw-w-[80vw] tw-font-bold md:tw-text-5xl tw-text-3xl tw-text-center tw-mt-[50px]"
          text="Level up your skills and your future with Empower acedemy Plus."
          once={true}
        />
        <Text mt={"30px"} textAlign={"center"}>
          Get access to videos in over 90% of courses, Specializations, and
          Professional Certificates taught by top instructors from leading
          universities and companies.
        </Text>
      </Box>
      <Stack
        direction={{ base: "column", md: "row" }}
        width={"80vw"}
        justifyContent={"space-between"}
        mx={"auto"}
      >
        {benifits.map((benifit, index) => (
          <Benifit
            color={color}
            key={index}
            src={benifit.src}
            title={benifit.title}
            description={benifit.description}
          />
        ))}
      </Stack>

      {/*Offers*/}
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"20px"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"transparent"}
      >
        <AnimatedText
          className="tw-w-[80vw] tw-font-bold md:tw-text-5xl tw-text-3xl tw-text-center tw-mt-[80px]"
          text="Start your journey today!"
          once={true}
        />
      </Box>
      <Stack
        mt={"80px"}
        direction={{ base: "column", md: "row" }}
        width={"90vw"}
        justifyContent={"space-between"}
        mx={"auto"}
      >
        {offers.map((offer, index) => (
          <Offer
            key={index}
            price={offer.price}
            needButton={true}
            width={{ base: "100%", md: "50%" }}
            tier={offer.tier}
            advantages={offer.advantages}
            propertyName="offer"
          />
        ))}
      </Stack>
    </div>
  );
};

export default LandingPage;
