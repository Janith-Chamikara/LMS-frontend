import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import useProfileContext from "../hooks/useProfileContext";
import NavbarMobile from "../layouts/nav/NavbarMobile";
import { profileOptions } from "../layouts/nav/navItems";
import ProfileCard from "./ProfileCard";
import { Flex, Skeleton } from "@chakra-ui/react";
import CourseCard from "./CourseCard";
import useFetchData from "../hooks/useFetchData";

const DashBoard: FC = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const axiosPrivate = useAxiosPrivate();
  const { profile } = useProfileContext();
  // const [user, setUser] = useState<object>({});
  // console.log(user);
  const [activeLink , setActiveLink] = useState(`/auth/${profile.id}`)
  console.log(activeLink);
  const { id } = useParams();
  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosPrivate.get(`/auth/${profile.id}`, {
  //         signal: controller.signal,
  //       });
  //       isMounted && setUser(response.data.user);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log(error.message);
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, []);
  const { data, isLoading } = useFetchData(activeLink);
  return (
    <>
      <NavbarMobile
        setActiveLink = {setActiveLink}
        navItems={profileOptions}
        title="Dashboard"
        isNavbar={false}
      />
      <Flex
        direction={"column"}
        width={{ base: "90vw", md: "80vw" }}
        justifyContent={"center"}
        mx={"auto"}
        gap={{ base: "20px", md: "50px" }}
      >
        <Skeleton isLoaded={!isLoading}>
          {
            <ProfileCard
              name={data?.user?.name}
              url={data?.user?.avatar?.url}
              id={data?.user?._id}
              email={data?.user?.email}
            />
          }
        </Skeleton>
        <Flex
          direction={"row"}
          flexWrap={"wrap"}
          mx={"auto"}
          justify={"center"}
          gap={"20px"}
          width={"100%"}
        >
          {data?.user?.courses?.map((course, index) => (
            <Skeleton key={index} isLoaded={!isLoading}>
              <CourseCard isLoading={isLoading} course={course} />
            </Skeleton>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default DashBoard;
