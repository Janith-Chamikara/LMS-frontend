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
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { navItems } from "./navItems";
import { v4 as uuidv4 } from "uuid";
import NavbarMobile from "./NavbarMobile";
import { Link, Outlet } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import CustomButton from "../../components/CustomButton";
import Footer from "../../components/footer/Footer";

export const NavLink: FC<{ children: React.ReactNode; path: string }> = ({
  children,
  path,
}) => {
  return (
    <Box
      as={Link}
      px={2}
      verticalAlign={"center"}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      to={path}
      className="tw-flex tw-justify-center tw-items-center"
    >
      {children}
    </Box>
  );
};

const NavbarForBiggerScreens: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("gray.100", "gray.900");
  const { auth } = useAuthContext();
  console.log(auth);
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontWeight={"bold"}>EMPOWER ACADEMY</Box>
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
                    size="sm"
                    showBorder={true}
                    borderColor="green.400"
                    name="avatar"
                    src={auth && auth?.avatar?.url}
                  />
                </MenuButton>
                <MenuList
                  border={"2px"}
                  borderColor={"cyan.500"}
                  alignItems={"center"}
                  bg={useColorModeValue("gray.100", "gray.900")}
                >
                  <br />
                  <Center>
                    <Avatar
                      size="2xl"
                      showBorder={true}
                      className="tw-shadow-[0px_0px_18px_0px_#39D6B5F7]"
                      name="avatar"
                      src={auth && auth?.avatar?.url}
                    />
                  </Center>
                  {auth && (
                    <Stack
                      p={"20px"}
                      direction={"column"}
                      mt={"20px"}
                      alignItems={"center"}
                      gap={"4px"}
                      justifyContent={"center"}
                      border={"2px"}
                      borderColor={"gray.400"}
                      rounded={"xl"}
                      margin={"20px"}
                    >
                      <Text fontSize={"lg"} fontWeight={"bold"}>
                        {auth && auth?.name}
                      </Text>
                      <Text fontSize={"sm"} fontWeight={"semibold"}>
                        {auth && auth?.email}
                      </Text>
                      <Text fontSize={"sm"} fontWeight={"semibold"}>
                        Role : {auth && auth?.roles}
                      </Text>
                      <Text fontSize={"sm"} fontWeight={"semibold"}>
                        User ID : {auth && auth?.id}
                      </Text>
                    </Stack>
                  )}

                  <MenuDivider
                    color={useColorModeValue("gray.900", "gray.200")}
                  />
                  <MenuItem bg={useColorModeValue("gray.100", "gray.900")}>
                    <CustomButton
                      as={Link}
                      isLoading={false}
                      loadingText="Loading"
                      text="Settings"
                      variant="solid"
                      colorSheme="teal"
                      height="50px"
                      width={"100%"}
                      to="/"
                    />
                  </MenuItem>
                  <MenuItem bg={useColorModeValue("gray.100", "gray.900")}>
                    <CustomButton
                      as={Link}
                      isLoading={false}
                      loadingText="Loading"
                      text="Logout"
                      variant="solid"
                      colorSheme="teal"
                      height="50px"
                      width={"100%"}
                      to="signUp"
                    />
                  </MenuItem>
                </MenuList>
              </Menu>
              <NavbarMobile />
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Outlet />
      {/*Footer*/}
      <Footer color={color} />
    </>
  );
};

export default NavbarForBiggerScreens;
