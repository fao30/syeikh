import "../App.css";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { setIsLogin } from "../store/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../store/helper/url";
import { useNavigate } from "react-router";
import { fetchData } from "../store/actionCreator/itemAction";
import { Button } from "@mui/material";
import SearchComponent from "./search.component";

function DataComponent() {
  const dispatch = useDispatch();
  const { dataVisits } = useSelector((state) => state.clinic);
  const Navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "timeVisit", headerName: "Time Visit", width: 150 },
    { field: "doctorName", headerName: "Doctor Name", width: 130 },
    {
      field: "visitorName",
      headerName: "visitor Name",
      // type: "number",
      width: 130,
    },
    {
      field: "adminName",
      headerName: "Admin",
      // type: "number",
      width: 130,
    },
    {
      field: "creatorName",
      headerName: "created By",
      // type: "number",
      width: 130,
    },
    {
      field: "updatorName",
      headerName: "update By",
      // type: "number",
      width: 130,
    },
    {
      field: "isFirst",
      headerName: "First Timer",
      // type: "number",
      width: 130,
    },
    {
      field: "totalSpend",
      headerName: "Total Spent",
      type: "number",
      width: 130,
    },
    {
      field: "status",
      headerName: "status",
      width: 130,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      // type: "number",
      width: 150,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      // type: "number",
      width: 150,
    },
  ];

  return (
    <>
      <div style={{ marginLeft: 50, height: 400, width: 1350 }}>
        <DataGrid
          rows={dataVisits}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={(params, event) => {
            event.defaultMuiPrevented = true;
            Navigate(`/visit/${params.id}`);
          }}
        />
      </div>
    </>
  );
}

export default DataComponent;
