import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./layouts/nav/Navbar";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import VerifyOTP from "./pages/verifyOTP/VerifyOTP";
import CoursesPage from "./pages/courses/CoursesPage";
import LandingPage from "./pages/landingPage/LandingPage";
import CourseInfo from "./pages/courseInfo/CourseInfo";
import UploadCoursePage from "./pages/uploadCourse/UploadCoursePage";
import ProfileSideBar from "./components/ProfileSideBar";
import MyCourses from "./pages/MyCourses";
import ProfileSettings from "./components/ProfileSettings";
import AdminPanel from "./components/AdminPanel";
import CoursesGrid from "./components/CoursesGrid";
import Analytics from "./components/Analytics";

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
        path: "/admin",
        element: <AdminPanel />,
        children: [
          {
            path: "",
            element: <Analytics />,
          },
          {
            path: "manageCourses",
            element: <CoursesGrid />,
          },
        ],
      },

      {
        path: "/userProfile",
        element: <ProfileSideBar />,
        children: [
          {
            path: "",
            element: <ProfileSettings />,
          },
          {
            path: "myCourses",
            element: <MyCourses />,
          },
          {
            path: "uploadACourse",
            element: <UploadCoursePage />,
          },
        ],
      },
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
