import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
 const value = useContext(AuthContext)
 return {...value}

}
export default useAuthContext;