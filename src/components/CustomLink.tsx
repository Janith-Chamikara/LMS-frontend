import { FC } from "react";
import { Link, To } from "react-router-dom";

type LinkProps = {
  text: string;
  to:To
  className?: string;
};

const CustomLink: FC<LinkProps> = ({text, className, to}) => {
  return <Link to={to} className={className} >{text}</Link>;
};
export default CustomLink;
