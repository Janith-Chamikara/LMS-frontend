import axios from "axios";
import useAuthContext from "./useAuthContext";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuthContext();
  //mention refresh endpoint
  const refresh = async () => {
    const response = await axios.get("", {
      withCredentials: true,
    });
    const newAccessToken = response?.data?.accessToken;
    setAuth({ ...auth, accessToken: newAccessToken });
    return newAccessToken;
  };
  return refresh;
};

export default useRefreshToken;
