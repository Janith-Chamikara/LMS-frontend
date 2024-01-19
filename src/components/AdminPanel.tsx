import { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navigation from "./Navigation";
import { panalItems } from "../assests/panelItems";

import { Outlet } from "react-router-dom";

const AdminPanel: FC = () => {
  
  return (
    <Flex
      direction={"row"}
      marginTop={"10px"}
      maxWidth={"97vw"}
      mx={"auto"}
      gap={"10px"}
      height={"max-content"}
    >
      <Box
        width={"max-content"}
        height={"63vh"}
        borderRight={"1px"}
        borderRightColor={"gray.500"}
      >
        <Navigation items={panalItems} />
      </Box>
      <Outlet/>
    </Flex>
  );
};

export default AdminPanel;
