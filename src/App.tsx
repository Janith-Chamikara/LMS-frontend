import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./layouts/nav/Navbar";
import Hero from "./hero/Hero";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import VerifyOTP from "./pages/verifyOTP/VerifyOTP";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
    ],
  },
  {
    path: "/signUp",
    element: <SignUp/>,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  
  {
    path: "/verify",
    element: <VerifyOTP />,
  },
]);

const App: FC = () => {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
};

export default App;
