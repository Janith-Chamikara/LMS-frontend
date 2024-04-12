import { ReactNode, createContext, useEffect, useState } from "react";

export type Profile = {
  name: string;
  roles:string;
  url: string;
  id:string;
};

type contextValue = {
  profile:Profile | null;
  setProfile:React.Dispatch<React.SetStateAction<Profile | null>>;
}

export const ProfileContext = createContext<contextValue | null>(null);
const ProfileImageProvider = ({ children }:{
 children:ReactNode
}) => {
  const [profile, setProfile] = useState<Profile | null>(() => {
    try {
      return JSON.parse(localStorage.getItem("profile") as string);
    } catch (error) {
      console.error("Profile is not available at local storage.To fix try log in again");
      return null
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("profile", JSON.stringify(profile));
    } catch (error) {
      console.error("Error storing auth in local storage:", error);
    }
  }, [profile]);

  return (
    <ProfileContext.Provider value={{profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileImageProvider;
