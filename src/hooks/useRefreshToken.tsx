import axios from "../axios/axios";
import useAuthContext from "./useAuthContext";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuthContext();
  //mention refresh endpoint
  const refresh = async () => {
    console.log("refreshing");
    const response = await axios.get("/auth/updateaccess", {
      withCredentials: true,
    });
    console.log(response);
    const newAccessToken = response?.data?.accessToken;
    setAuth({ ...auth, accessToken: newAccessToken });
    return newAccessToken;
  };
  return refresh;
};

export default useRefreshToken;
