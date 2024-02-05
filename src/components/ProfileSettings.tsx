import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProfileContext from "../hooks/useProfileContext";
import ProfileCard from "./ProfileCard";
import { Flex, Skeleton } from "@chakra-ui/react";
import useFetchData from "../hooks/useFetchData";

const ProfileSettings: FC = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const axiosPrivate = useAxiosPrivate();
  const { profile } = useProfileContext();
  // const [user, setUser] = useState<object>({});
  // console.log(user);
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
  const [data, isLoading] = useFetchData(`/auth/${profile.id}`);
  // const sectionRefs = useRef<HTMLDivElement[]>(Array(3).fill(null));
  // console.log(sectionRefs.current);
  const [name, setName] = useState();
  const [img , setImg] = useState()
  useEffect(()=>{
    if(data?.user?.name){
      setName(data.user.name)
    }
    if(data?.user?.avatar?.url){
      setImg(data.user.avatar.url)
    }
  },[data])
  const handleNavItemClick = (index: number) => {
    console.log(index);
    const targetSection = sectionRefs.current[index];
    console.log(targetSection);
    // console.log(targetSection);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  // console.log(sectionRefs.current);
  return (
    <>
      <Skeleton isLoaded={!isLoading}>
        {
          <Flex height={isLoading ? "60vh" : {base:"max-content",md:"60vh"}} justifyContent={"center"} alignItems={"center"} mt="50px">
            <ProfileCard
              setName={setName}
              setImg={setImg}
              name={name}
              url={img}
              id={data?.user?._id}
              email={data?.user?.email}
            />
          </Flex>
        }
      </Skeleton>
    </>
  );
};

export default ProfileSettings;
