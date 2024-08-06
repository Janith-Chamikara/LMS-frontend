import { Stack, Link, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

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
  {
    url: "https://youtu.be/wwZABPAmIVM?si=R61j1FrBoGlPFPqZ",
    label: "Yt Account",
    type: "gray",
    icon: <FaYoutube />,
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
        EMPOWER ACADEMY
      </Link>

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

export default Footer;
