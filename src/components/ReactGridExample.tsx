import { FC, useEffect, useMemo, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";

const CustomCell = ({ value }) => {
  return (
    <span>
      {value ? (
        <img
          src="https://www.ag-grid.com/example-assets/icons/tick-in-circle.png"
          style={{
            display: "block",
            width: "25px",
            height: "auto",
            maxHeight: "50%",
            marginRight: "12px",
            filter: "brightness(1.1)",
          }}
        />
      ) : (
        <img
          src="https://www.ag-grid.com/example-assets/icons/cross-in-circle.png"
          style={{
            display: "block",
            width: "25px",
            height: "auto",
            maxHeight: "50%",
            marginRight: "12px",
            filter: "brightness(1.1)",
          }}
        />
      )}
    </span>
  );
};

const ReactGridExample: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "mission", filter: true, checkboxSelection: true },
    { field: "company" },
    { field: "location" },
    {
      field: "date",
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
    {
      field: "price",
      valueFormatter: (params) => "$" + params.value.toLocaleString(),
    },
    { field: "successful", cellRenderer: CustomCell },
    { field: "rocket" },
  ]);

  const defaultColref = useMemo(() => ({
    editable: true,
    filter: true,
  }));

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/space-mission-data.json") // Fetch data from server
      .then((result) => result.json()) // Convert to JSON
      .then((rowData) => setRowData(rowData)); // Update state of `rowData`
  }, []);
  console.log(rowData);
  return (
    <>
      <div
        className={"ag-theme-quartz"}
        style={{ width: "80vw", height: "80vh" }}
      >
        <AgGridReact
          onSelectionChanged={(e) => console.log("changed row selection")}
          rowSelection="multiple"
          defaultColDef={defaultColref}
          pagination={true}
          rowData={rowData}
          columnDefs={colDefs}
        />
      </div>
    </>
  );
};

export default ReactGridExample;
