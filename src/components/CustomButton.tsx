import { As, Button, ResponsiveValue } from "@chakra-ui/react";

import { FC, ReactNode } from "react";
import {  To } from "react-router-dom";
type ButtonProps = {
  isLoading?: boolean;
  text?: string;
  loadingText?: string;
  colorSheme?: string;
  width?: ResponsiveValue<string>;
  height?: ResponsiveValue<string>;
  variant?: string;
  className?: string;
  children?:ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  to?: To;
  as: As | undefined;
};

const CustomButton: FC<ButtonProps> = ({
  text,
  loadingText,
  colorSheme,
  width,
  children,
  height,
  isLoading,
  variant,
  className,
  type,
  to,
  as,
}) => {
  return (
    <>
      <Button
        as={as}
        to={to}
        type={type}
        isLoading={isLoading}
        loadingText={loadingText}
        colorScheme={colorSheme}
        variant={variant}
        width={width}
        height={height}
        className={className}
      >
        {text}{children}
      </Button>
    </>
  );
};
export default CustomButton;
