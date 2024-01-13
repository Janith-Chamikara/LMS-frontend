import { ReactNode, createContext, useEffect, useState } from "react";

type Profile = {
  name: string;
  url: string;
  id:string;
};

export const ProfileContext = createContext<Profile | null>(null);
const ProfileImageProvider = ({ children }:{
 children:ReactNode
}) => {
  const [profile, setProfile] = useState<Profile>(() => {
    try {
      return JSON.parse(localStorage.getItem("profile")) as Profile;
    } catch (error) {
      console.log("Item not available at local storage");
      return null
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("profile", JSON.stringify(profile));
    } catch (error) {
      console.log("Error storing auth in local storage:", error);
    }
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileImageProvider;
