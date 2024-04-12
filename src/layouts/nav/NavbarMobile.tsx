import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Flex,
  Spacer,
  DrawerFooter,
} from "@chakra-ui/react";
import { FC, useRef } from "react";

import { NavLink } from "./Navbar";
import { HamburgerIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { navVariant } from "../../animationVariants/variants";
import { motion } from "framer-motion";
import { navType } from "./navItems";
import CustomButton from "../../components/CustomButton";
import useProfileContext from "../../hooks/useProfileContext";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useToastHook from "../../hooks/useToast";
type NavbarProps = {
  navItems: navType[];
  isNavbar?: boolean;
  asButton?: boolean;
  handleNavItemClick?: (index: number) => void;
  title?: string;
};

const NavbarMobile: FC<NavbarProps> = ({ navItems, title, isNavbar }) => {
  const { profile } = useProfileContext();
  const axiosPrivate = useAxiosPrivate();
  const [newToast] = useToastHook();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const handleSignOut = async () => {
    try {
      localStorage.removeItem("profile");
      const response = await axiosPrivate.post("auth/logout");
      newToast({ message: response.data.message, condition: "success" });
      setTimeout(() => navigate("/signUp"), 2000);
      
    } catch (error) {
      newToast({ message: error.response.data.message, condition: "error" });
    }
  };

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="gray"
        onClick={onOpen}
        display={{
          base: "inline-block",
          lg: isNavbar ? "none" : "inline-block",
        }}
      >
        <HamburgerIcon />
      </Button>
      <Drawer
        size={"xs"}
        isOpen={isOpen}
        placement={isNavbar ? "right" : "left"}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-font-semibold tw-text-lg">
            <Flex direction={"column"} justifyContent={"space-between"}>
              {navItems.map((item, index) => {
                return (
                  <motion.div
                    key={uuidv4()}
                    variants={navVariant}
                    initial="initial"
                    whileInView={"animate"}
                    custom={index}
                  >
                    <NavLink key={uuidv4()} path={item.url} onClose={onClose}>
                      {item.name}
                    </NavLink>
                    <Spacer />
                  </motion.div>
                );
              })}
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Flex direction={"column"}>
              <CustomButton
                as={Link}
                isLoading={false}
                loadingText="Loading"
                text={
                  profile?.roles === "Admin" ? "Admin Panel" : "Your Profile"
                }
                variant="outline"
                colorSheme="teal"
                width={"100%"}
                to={profile?.roles === "Admin" ? `admin` : `/userProfile`}
              />
              <Button
                mt={"2px"}
                onClick={handleSignOut}
                loadingText="logging out"
                variant="outline"
                colorScheme="teal"
                width={"100%"}
              >
                Logout
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarMobile;
