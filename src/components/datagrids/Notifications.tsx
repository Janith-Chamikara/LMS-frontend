import { FC, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";

const Notifiactions: FC = () => {
  const [colDefs, setColDefs] = useState([
    {
      field: "title",
    },
    {
      field: "message",
    },
    {
      field: "date",
    },
  ]);
  const color = useColorModeValue("ag-theme-quartz", "ag-theme-quartz-dark");
  const [data, dataIsLoading] = useFetchData("/auth/getallnotifications");
  const rowData = data?.notifications;
  console.log(Notification);
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

export default Notifiactions;
