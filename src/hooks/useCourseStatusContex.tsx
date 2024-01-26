import { useContext } from "react";
import { CourseStatus } from "../context/CourseStatusProvider";

const useCourseStatusContext = () => {
  const value = useContext(CourseStatus);
  return { ...value };
};

export default useCourseStatusContext;
