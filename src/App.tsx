import { FC } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./layouts/nav/Navbar";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import VerifyOTP from "./pages/verifyOTP/VerifyOTP";
import CoursesPage from "./pages/courses/CoursesPage";
import LandingPage from "./pages/landingPage/LandingPage";
import CourseInfo from "./pages/courseInfo/CourseInfo";
import UploadCoursePage from "./pages/uploadCourse/UploadCoursePage";
import DashBoard from "./components/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/courses",
        element: <CoursesPage />,
      },
      {
        path: "/courseInfo",
        element: <CourseInfo />,
      },
      {
        path: "/uploadACourse",
        element: <UploadCoursePage />,
      },
      {
        path:"/userProfile/:id",
        element:<DashBoard/>
      }
    ],
  },
  {
    path: "/signUp",
    element: <SignUp />,
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
      <RouterProvider router={router} />
    </>
  );
};

export default App;
