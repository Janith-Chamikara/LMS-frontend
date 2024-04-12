import { isAxiosError } from "axios";
import axios from "../axios/axios";
import { Auth } from "../context/AuthContext";
import useAuthContext from "./useAuthContext";
import useToastHook from "./useToast";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuthContext();
  console.log(auth);
  const [newToast] = useToastHook();
  //mention refresh endpoint
  const refresh = async () => {
    try {
      console.log("refreshing");
      const response = await axios.get("/auth/updateaccess", {
        withCredentials: true,
      });
      console.log(response);
      const newAccessToken = response?.data?.newAccessToken;
      const newRefreshToken = response?.data?.newRefreshToken;
      (setAuth as React.Dispatch<React.SetStateAction<Auth | null>>)({ ...auth as Auth, accessToken: newAccessToken as string,refreshToken:newRefreshToken as string });
      
      if(newAccessToken)return newAccessToken;
    } catch (error) {
      console.error(error);
      if(isAxiosError(error))newToast({ message: error?.response?.data?.message, condition: "error" });
    }
  };
  return refresh;
};

export default useRefreshToken;
