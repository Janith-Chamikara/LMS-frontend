import { IconType } from "react-icons";
import { MdOutlineDashboard } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaUsersGear } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { RiImageEditFill } from "react-icons/ri";

export type itemsType = {
 name: string;
 url: string;
 icon: IconType;
};
export const panalItems: itemsType[] = [
 {
   name: "Dashboard",
   url: "",
   icon: MdOutlineDashboard,
 },
 {
   name: "Courses",
   url: "courses",
   icon: FaBookOpenReader,
 },
 {
   name: "Mange users",
   url: "users",
   icon: FaUsersGear,
 },
 {
   name: "Edit course",
   url: "editCourse",
   icon: FaRegEdit,
 },
 {
   name: "Update Hero",
   url: "upadateHeroImage",
   icon: RiImageEditFill,
 },
 {
   name: "Notifications",
   url: "notifications",
   icon: MdOutlineNotificationsActive,
 },
];