import { Flex } from "@chakra-ui/react";
import NavbarMobile from "../layouts/nav/NavbarMobile";
import { Outlet } from "react-router-dom";
import { navType } from "../layouts/nav/navItems";

const ProfileSideBar = () => {
  const profileOptions: navType[] = [
    {
      name: "My Profile",
      url: `/userProfile`,
    },
    {
      name: "My Courses",
      url: `/userProfile/myCourses`,
    },
    {
      name: "My Cart",
      url: `/userProfile/myCart`,
    },
    {
      name: "Create a course",
      url: "/userProfile/uploadACourse",
    },
  ];
  return (
    <>
      <NavbarMobile
        navItems={profileOptions}
        title="Dashboard"
        isNavbar={false}
      />

      <Flex
        id="myProfile"
        direction={"column"}
        width={{ base: "90vw", md: "80vw" }}
        justifyContent={"center"}
        mx={"auto"}
        gap={{ base: "20px", md: "50px" }}
      >
        <Outlet />
      </Flex>
    </>
  );
};

export default ProfileSideBar;
