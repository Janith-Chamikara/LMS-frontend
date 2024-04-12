// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck 
import { FC, useEffect, useMemo, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { ColDef, ColGroupDef } from "@ag-grid-community/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./Style.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useToastHook from "../../hooks/useToast";
import { isAxiosError } from "axios";

interface Notification {
  title: string;
  _id: string;
  message: string;
  date: string; // Assuming date is a string representation
  status: string;
}
type Params = {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
[key:string]:any;
}
const Notifiactions: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [colDefs, _] = useState<(ColDef<Notification, any> | ColGroupDef<Notification>)[]>([
    {
      field: "title",
      headerName: "Notification title",
      filter: true
    },
    {
      field: "_id",
      hide: true,
    },
    {
      field: "message",
      headerName: "Notification",
      filter: true
    },
    {
      field: "date",
      filter: true,
    },
    {
      field: "status",
      headerName: "Notification status",
      filter: true
    },
  ]);
  const autoSizeStrategy = {
    type: "fitCellContents",
  };
  const rowClassRules = useMemo(
    () => ({
      "status-unread": (params:Params ) => params.data.status === "unread",
      "status-read": (params:Params) => params.data.status === "read",
    }),
    []
  );
  const color = useColorModeValue("ag-theme-quartz", "ag-theme-quartz-dark");
  const [data] = useFetchData(
    "/auth/notifications/getallnotifications"
  );
  const [rowData, setRowData] = useState<Array<Notification>>();
  useEffect(() => {
    if (data) {
      setRowData((data as Params).notifications);
    }
  }, [data]);

  const axiosPrivate = useAxiosPrivate();
  const [newToast] = useToastHook();
  const onRowSelected = async (params: object) => {
    const controller = new AbortController();
    controller.abort();
    if ((params as Params).data.status === "read") {
      // newToast({message:"Status has been already updated ",condition:'warning'})
      return;
    }
    try {
      const notificationId = (params as Params).data._id;
      const response = await axiosPrivate.put(
        `/auth/notifications/update/status/${notificationId}`,
        { signal: controller.signal }
      );

      newToast({ message: response.data.message, condition: "success" });
      setRowData([
        ...(rowData as Notification[]).slice(0, (params as Params).rowIndex),
        response.data.updatedNotification,
        ...(rowData as Notification[]).slice((params as Params).rowIndex + 1),
      ]);
    } catch (error) {
      if(isAxiosError(error))newToast({ message: error?.response?.data?.message, condition: "error" });
    }
  };

  return (
    <Box
      paddingX={"20px"}
      mb={"20px"}
      className={color}
      width={"100%"}
      height={"90vh"}
    >
      <Heading fontSize={"4xl"} mb={"2"}>
        Notifications
      </Heading>
      <AgGridReact
        pagination={true}
        autoSizeStrategy={autoSizeStrategy}
        rowClassRules={rowClassRules}
        rowData={rowData}
        onRowSelected={onRowSelected}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        columnDefs={colDefs as (ColDef<Notification, any> | ColGroupDef<Notification>)[]}
        rowSelection={"single"}
      />
    </Box>
  );
};

export default Notifiactions;
