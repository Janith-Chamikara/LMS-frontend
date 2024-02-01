import { FC, useEffect, useMemo, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./Style.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useToastHook from "../../hooks/useToast";
const Notifiactions: FC = () => {
  const [colDefs, setColDefs] = useState([
    {
      field: "title",
      headerName: "Notification title",
    },
    {
      field: "_id",
      hide: true,
    },
    {
      field: "message",
      headerName: "Notification",
    },
    {
      field: "date",
    },
    {
      field: "status",
      headerName: "Notification status",
    },
  ]);
  const autoSizeStrategy = {
    type: "fitCellContents",
  };
  const rowClassRules = useMemo(
    () => ({
      "status-unread": (params) => params.data.status === "unread",
      "status-read": (params) => params.data.status === "read",
    }),
    []
  );
  const color = useColorModeValue("ag-theme-quartz", "ag-theme-quartz-dark");
  const [data, dataIsLoading] = useFetchData(
    "/auth/notifications/getallnotifications"
  );
  const [rowData, setRowData] = useState<Array>();
  useEffect(() => {
    if (data) {
      setRowData(data.notifications);
    }
  }, [data]);

  const axiosPrivate = useAxiosPrivate();
  const [newToast] = useToastHook();
  const onRowSelected = async (params: object) => {
    const controller = new AbortController();
    controller.abort();
    if (params.data.status === "read") {
      // newToast({message:"Status has been already updated ",condition:'warning'})
      return;
    }
    try {
      const notificationId = params.data._id;
      const response = await axiosPrivate.put(
        `/auth/notifications/update/status/${notificationId}`,
        { signal: controller.signal }
      );

      newToast({ message: response.data.message, condition: "success" });
      setRowData([
        ...rowData.slice(0, params.rowIndex),
        response.data.updatedNotification,
        ...rowData.slice(params.rowIndex + 1),
      ]);
    } catch (error) {
      newToast({ message: error.response.data.message, condition: "error" });
    }
  };

  return (
    <Box
      paddingX={"20px"}
      mb={"20px"}
      className={color}
      width={"99vw"}
      height={"90vh"}
    >
      <Heading fontSize={"4xl"} mb={"2"}>
        Notifications
      </Heading>
      <AgGridReact
        pagination={true}
        rowClassRules={rowClassRules}
        autoSizeStrategy={autoSizeStrategy}
        rowData={rowData}
        onRowSelected={onRowSelected}
        columnDefs={colDefs}
        rowSelection={"single"}
      />
    </Box>
  );
};

export default Notifiactions;
