import { FC, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import AvatarRenderer from "../AvatarRenderer";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";

const OrderGrid: FC = () => {
  const [colDefs, setColDefs] = useState([
    { field: "paymentInfo", headerName: "Order ID", filter: true },
    { field: "courseName", headerName: "Ordered Course", filter: true },
    { field: "courseId", headerName: "Course ID", filter: true },
    { field: "date", headerName: "Purchased date", filter: true },
    {
      field: "price",
      headerName: "Paid amount",
      filter: true,
      valueFormatter: (params) => `$${params.value}`,
    },
    {
      field: "thumbnail",
      headerName: "Course Thumbnail",
      cellRenderer: AvatarRenderer,
    },
    { field: "userName", headerName: "Client Name", filter: true },
    { field: "userId", headerName: "Client ID", filter: true },
    {
      field: "avatar",
      headerName: "Client avatar",
      cellRenderer: AvatarRenderer,
    },
  ]);
  const [data, dataIsLoading] = useFetchData("/auth/admin/get-all-orders");
  const rowData = data?.orders;
  const color = useColorModeValue("ag-theme-quartz", "ag-theme-quartz-dark");
  return (
    <Box
      paddingX={"20px"}
      mb={"20px"}
      className={color}
      width={"99vw"}
      height={"90vh"}
    >
      <AgGridReact
        pagination={true}
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection={"single"}
      />
    </Box>
  );
};
export default OrderGrid;
