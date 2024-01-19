import { FC, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Link } from "react-router-dom";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

const AvatarRenderer = ({ value }: { value: string }) => (
  <Flex
    height={"100%"}
    width={"100%"}
    justifyContent={"center"}
    alignItems={"center"}
  >
    <Link to={value}>
      <img
        alt={`${value} Flag`}
        src={value}
        style={{
          display: "block",
          width: "50px",
          filter: "brightness(1.1)",
        }}
      />
    </Link>
  </Flex>
);

const DataGrid: FC = () => {
  const [colDefs, setColDefs] = useState([
    { field: "avatar", cellRenderer: AvatarRenderer },
    { field: "name" },
    { field: "_id" },
    { field: "email" },
    { field: "createdAt" },
    { field: "updatedAt" },
    { field: "courses" },
  ]);
  const [data] = useFetchData("/auth/admin/get-all-users");
  console.log(data);
  const rowData = data?.users?.map((item) => ({
    name: item.name,
    _id: item._id,
    email: item.email,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    avatar: item.avatar.url,
    courses: item.courses.map((course) => course.course_id),
  }));
  const color = useColorModeValue("ag-theme-quartz","ag-theme-quartz-dark")
  console.log(rowData);
  return (
    <Box padding={"20px"} className={color} width={"100vw"} height={'100vh'}>
      <AgGridReact
        onSelectionChanged={(e) => console.log("changed row selection")}
        rowSelection="multiple"
        pagination={true}
        rowData={rowData}
        columnDefs={colDefs}
      />
    </Box>
  );
};

export default DataGrid;
