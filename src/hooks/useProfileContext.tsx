import { useContext } from "react";
import { ProfileContext } from "../context/ProfileImageProvider"

const useProfileContext = () => {
 const value= useContext(ProfileContext);
 return {...value}
}
export default useProfileContext;