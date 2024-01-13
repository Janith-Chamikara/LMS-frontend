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
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useRef } from "react";

import { NavLink } from "./Navbar";
import { HamburgerIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { navVariant } from "../../animationVariants/variants";
import { motion } from "framer-motion";
import { navType } from "./navItems";
type NavbarProps = {
  navItems: navType[];
  isNavbar?: boolean;
  title?: string;
  setActiveLink?: Dispatch<SetStateAction<string>>;
};

const NavbarMobile: FC<NavbarProps> = ({
  setActiveLink,
  navItems,
  title,
  isNavbar,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

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
                    <NavLink
                      onClose={onClose}
                      setActiveLink={setActiveLink}
                      key={uuidv4()}
                      path={item.url}
                    >
                      {item.name}
                    </NavLink>
                    <Spacer />
                  </motion.div>
                );
              })}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarMobile;
