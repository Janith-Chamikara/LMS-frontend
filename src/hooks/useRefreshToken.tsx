import axios from "../axios/axios";
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
      console.log(newAccessToken,newRefreshToken)
      console.log(auth)
      setAuth({ ...auth, accessToken: newAccessToken,refreshToken:newRefreshToken });
      
      if(newAccessToken)return newAccessToken;
    } catch (error) {

      newToast({ message: error.message, condition: "error" });
    }
  };
  return refresh;
};

export default useRefreshToken;
