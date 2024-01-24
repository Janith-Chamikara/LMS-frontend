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
    name: "Analytics",
    url: "",
    icon: MdOutlineDashboard,
  },
  {
    name: "Manage courses",
    url: "manageCourses",
    icon: FaBookOpenReader,
  },
  {
    name: "Mange users",
    url: "manageUsers",
    icon: FaUsersGear,
  },
  {
    name: "Mange Orders",
    url: "admin/manageOrders",
    icon: FaUsersGear,
  },
  {
    name: "Create course",
    url: "uploadACourse",
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
