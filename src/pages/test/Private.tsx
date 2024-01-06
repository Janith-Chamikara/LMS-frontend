import { FC, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
type props = {
  children: ReactNode;
};
const Private: FC<props> = ({ children }) => {
 const [token , setToken ] = useState<string | undefined>(undefined);
 const location = useLocation();
 useEffect(()=>{
  location.state.token && setToken(token);
 },[location])
  
  
  return <>{token ? children : "not authenticated"}</>;
};

export default Private;
