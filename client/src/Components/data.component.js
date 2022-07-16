import "../App.css";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { setIsLogin } from "../store/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../store/helper/url";
import { useNavigate } from "react-router";
import { fetchData } from "../store/actionCreator/itemAction";

function DataComponent() {
  const dispatch = useDispatch();
  const { dataVisits } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchData());
  },[]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "timeVisit", headerName: "Time Visit", width: 130 },
    { field: "doctorAssigned", headerName: "Doctor Assigned", width: 130 },
    {
      field: "visitorAssigned",
      headerName: "visitor Assigned",
      // type: "number",
      width: 90,
    },
    {
      field: "admin",
      headerName: "Admin",
      // type: "number",
      width: 90,
    },
    {
      field: "createdBy",
      headerName: "created By",
      // type: "number",
      width: 90,
    },
    {
      field: "updateBy",
      headerName: "update By",
      // type: "number",
      width: 90,
    },
    {
      field: "isFirst",
      headerName: "is First",
      // type: "number",
      width: 90,
    },
    {
      field: "totalSpend",
      headerName: "totalSpend",
      type: "number",
      width: 90,
    },
    {
      field: "status",
      headerName: "status",
      width: 90,
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      // type: "number",
      width: 90,
    },
    {
      field: "updatedAt",
      headerName: "updatedAt",
      // type: "number",
      width: 90,
    },
  ];

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={dataVisits}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellClick={(params, event) => {
            event.defaultMuiPrevented = true;
            console.log(params);
          }}
        />
      </div>
    </>
  );
}

export default DataComponent;
