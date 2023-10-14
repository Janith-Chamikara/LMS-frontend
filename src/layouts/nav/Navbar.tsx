import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { navItems } from "./navItems";
import { v4 as uuidv4 } from "uuid";
import NavbarMobile from "./NavbarMobile";

export const NavLink: FC<{ children: React.ReactNode; path: string }> = ({
  children,
  path,
}) => {
  return (
    <Box
      as="a"
      px={2}
      verticalAlign={"center"}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={path}
      className="tw-flex tw-justify-center tw-items-center"
    >
      {children}
    </Box>
  );
};

const NavbarForBiggerScreens: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>LMS</Box>
          <Stack
            direction={"row"}
            spacing={20}
            display={{ base: "none", lg: "flex" }}
          >
            {navItems.map((item) => {
              return (
                <NavLink key={uuidv4()} path={item.url}>
                  {item.name}
                </NavLink>
              );
            })}
          </Stack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  display={{ base: "none", lg: "flex" }}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>

                  <Center>
                    <p>Username</p>
                  </Center>

                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
              <NavbarMobile />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavbarForBiggerScreens;
