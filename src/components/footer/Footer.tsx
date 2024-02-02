import {
  Stack,
  HStack,
  Link,
  Divider,
  IconButton,
  LinkProps,
} from "@chakra-ui/react";
import { FC } from "react";
// Here we have used react-icons package for the icons
import { FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
  "Blog",
  "Documentation",
  "Careers",
  "Sign up",
  "Terms of use",
  "Privacy policy",
];
const accounts = [
  {
    url: "https://github.com/Janith-Chamikara",
    label: "Github Account",
    type: "gray",
    icon: <FaGithub />,
  },
  {
    url: "https://www.linkedin.com/in/janith-chamikara",
    label: "LinkedIn Account",
    type: "linkedin",
    icon: <FaLinkedin />,
  },
];

type FooterProps = {
  color: "gray.100" | "gray.900";
};

const Footer: FC<FooterProps> = ({ color }) => {
  return (
    <Stack
      position={"relative"}
      bottom={0}
      width={"100%"}
      fontWeight={"bold"}
      mt={"80px"}
      bg={color}
      marginInline="auto"
      p={8}
      zIndex={"100"}
      spacing={{ base: 8, md: 0 }}
      justifyContent="space-between"
      alignItems="center"
      direction={{ base: "column", md: "row" }}
    >
      <Link href="" isExternal>
        EMBARK ACEDEMY
      </Link>

      {/* Desktop Screen */}
      <HStack
        spacing={4}
        alignItems="center"
        display={{ base: "none", md: "flex" }}
      >
        {links.map((link, index) => (
          <CustomLink key={index}>{link}</CustomLink>
        ))}
      </HStack>

      {/* Mobile and Tablet Screens */}
      <Stack display={{ base: "flex", md: "none" }} alignItems="center">
        <HStack alignItems="center">
          <CustomLink>Sign up</CustomLink>
          <Divider h="1rem" orientation="vertical" />
          <CustomLink>Blog</CustomLink>
          <Divider h="1rem" orientation="vertical" />
          <CustomLink>Career</CustomLink>
        </HStack>
        <HStack alignItems="center">
          <CustomLink>Documentation</CustomLink>
          <Divider h="1rem" orientation="vertical" />
          <CustomLink>Terms of use</CustomLink>
        </HStack>
        <CustomLink>Privacy policy</CustomLink>
      </Stack>

      <Stack
        direction="row"
        spacing={5}
        pt={{ base: 4, md: 0 }}
        alignItems="center"
      >
        {accounts.map((sc, index) => (
          <IconButton
            key={index}
            as={Link}
            isExternal
            href={sc.url}
            aria-label={sc.label}
            colorScheme={sc.type}
            icon={sc.icon}
            rounded="md"
          />
        ))}
      </Stack>
    </Stack>
  );
};

const CustomLink = ({ children, ...props }: LinkProps) => {
  return (
    <Link href="#" fontSize="sm" {...props}>
      {children}
    </Link>
  );
};

export default Footer;
