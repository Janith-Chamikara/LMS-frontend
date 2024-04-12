import { createContext, useState, ReactNode, FC } from "react";
type Props = {
  children: ReactNode;
};


export type Auth = {
  id: string;
  roles: string;
  courses: string[];
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};
type value = {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
};
export const AuthContext = createContext<value | null>(null);

const AuthContextProvider: FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<Auth | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
