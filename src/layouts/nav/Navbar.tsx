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

import { Link, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import Footer from "../../components/footer/Footer";
import useProfileContext from "../../hooks/useProfileContext";
import NavbarMobile from "./NavbarMobile";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useToastHook from "../../hooks/useToast";
import { isAxiosError } from "axios";
import { Profile } from "../../context/ProfileImageProvider";

export const NavLink: FC<{
  children: string;
  path: string;
  onClose?: () => void;
}> = ({ children, path, onClose }) => {
  return (
    <Box
      as={Link}
      px={2}
      verticalAlign={"center"}
      py={1}
      onClick={onClose ? () => onClose() : undefined}
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
  const { profile } = useProfileContext();
  console.log(profile);
  const [newToast] = useToastHook();
  const onClick =()=>{
    toggleColorMode();
    if(colorMode === 'dark')newToast({condition:"info",message:"Trust me, Dark mode is better"})
  }
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const handleSignOut = async () => {
    try {
      localStorage.removeItem("profile");
      const response = await axiosPrivate.post("auth/logout");
      newToast({ message: response.data.message, condition: "success" });
      setTimeout(() => navigate("/signUp"), 2000);
    } catch (error) {
      if(isAxiosError(error))newToast({ message: error?.response?.data?.message, condition: "error" });
    }
  };
  return (
    <>
      <ScrollRestoration />
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} autoFocus>
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
              <Button onClick={onClick}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                {profile && (
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
                      src={profile && profile?.url}
                    />
                  </MenuButton>
                )}
                <MenuList
                  border={"2px"}
                  zIndex={"1000"}
                  borderColor={"cyan.500"}
                  alignItems={"center"}
                  bg={useColorModeValue("gray.100", "gray.900")}
                >
                  <br />
                  <Center>
                    {profile && <Avatar
                      size="2xl"
                      showBorder={true}
                      className="tw-shadow-[0px_0px_18px_0px_#39D6B5F7]"
                      name={(profile as Profile).name as string }
                      src={(profile as Profile).url as string}
                    />}
                  </Center>
                  {profile && (
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
                      <Text fontSize={"sm"} fontWeight={"bold"}>
                        {profile && profile?.name}
                      </Text>
                      <Text fontSize={"sm"} fontWeight={"semibold"}>
                        {profile && profile?.roles}
                      </Text>
                      {/*<Text fontSize={"sm"} fontWeight={"semibold"}>
                        Role : {auth && auth?.roles}
                      </Text>
                      <Text fontSize={"sm"} fontWeight={"semibold"}>
                        User ID : {auth && auth?.id}
                      </Text> */}
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
                      text={
                        profile?.roles === "Admin"
                          ? "Admin Panel"
                          : "Your Profile"
                      }
                      variant="solid"
                      colorSheme="facebook"
                      height="50px"
                      width={"100%"}
                      to={profile?.roles === "Admin" ? `admin` : `/userProfile`}
                    />
                  </MenuItem>
                  <MenuItem bg={useColorModeValue("gray.100", "gray.900")}>
                    <Button
                      onClick={handleSignOut}
                      loadingText="logging out"
                      variant="solid"
                      colorScheme="facebook"
                      height="50px"
                      width={"100%"}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
              <NavbarMobile
                navItems={navItems}
                isNavbar={true}
                title={"EMPOWER ACADEMY"}
              />
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Box minHeight={"60vh"}>
        <Outlet />
      </Box>

      {/*Footer*/}
      <Footer color={color} />
    </>
  );
};

export default NavbarForBiggerScreens;
