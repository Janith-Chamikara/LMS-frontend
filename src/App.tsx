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
import UsersGrid from "./components/UsersGrid";
import Success from "./components/paymentStatus/Success";
import Failed from "./components/paymentStatus/Failed";
import CourseInfoWithParams from "./pages/courseInfo/CourseInfoWithParams";
import CourseStatusProvider from "./context/CourseStatusProvider";
import MyCart from "./pages/MyCart";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import OrderGrid from "./components/datagrids/OrderGrid";
import Notifiactions from "./components/datagrids/Notifications";

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
        path: "/success",
        element: <Success />,
      },
      {
        path: "/failed",
        element: <Failed />,
      },
      {
        path: "/courses",
        element: <CoursesPage />,
      },

      {
        path: "courses/courseInfo/:id",
        element: (
          <CourseStatusProvider>
            <CourseInfoWithParams />
          </CourseStatusProvider>
        ),
      },
      {
        path: "/courseInfo",
        element: (
          <CourseStatusProvider>
            <CourseInfo />
          </CourseStatusProvider>
        ),
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
          {
            path: "manageUsers",
            element: <UsersGrid />,
          },
          {
            path: "manageOrders",
            element: <OrderGrid />,
          },
          {
            path: "notifications",
            element: <Notifiactions />,
          },
          {
            path: "uploadACourse",
            element: <UploadCoursePage />,
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
            path: "myCart",
            element: <MyCart />,
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
  {
    path: "/resetPassword",
    element: <ResetPassword />,
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
