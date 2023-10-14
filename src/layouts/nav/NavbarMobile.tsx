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
import { FC, useRef } from "react";

import { navItems } from "./navItems";
import { NavLink } from "./Navbar";
import { HamburgerIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { navVariant } from "../../animationVariants/variants";
import { motion } from "framer-motion";

const NavbarForSmallerScreens: FC = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="gray"
        onClick={onOpen}
        display={{ base: "inline-block", lg: "none" }}
      >
        <HamburgerIcon />
      </Button>
      <Drawer
        size={"sm"}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>LMS</DrawerHeader>

          <DrawerBody className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-font-semibold tw-text-lg">
            <Flex direction={"column"} justifyContent={"space-around"}>
              {navItems.map((item, index) => {
                return (
                  <motion.div
                    variants={navVariant}
                    initial="initial"
                    whileInView={"animate"}
                    custom={index}
                  >
                    <NavLink key={uuidv4()} path={item.url}>
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

export default NavbarForSmallerScreens;
