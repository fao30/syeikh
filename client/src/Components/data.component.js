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
  const { dataVisits } = useSelector((state) => state.clinic);

  useEffect(() => {
    dispatch(fetchData());
  },[]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "timeVisit", headerName: "Time Visit", width: 130 },
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
      field: "createdBy",
      headerName: "created By",
      // type: "number",
      width: 130,
    },
    {
      field: "updateBy",
      headerName: "update By",
      // type: "number",
      width: 130,
    },
    {
      field: "isFirst",
      headerName: "is First",
      // type: "number",
      width: 130,
    },
    {
      field: "totalSpend",
      headerName: "totalSpend",
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
      headerName: "createdAt",
      // type: "number",
      width: 130,
    },
    {
      field: "updatedAt",
      headerName: "updatedAt",
      // type: "number",
      width: 130,
    },
  ];

  return (
    <>
      <div style={{ marginLeft:50, height: 400, width: "100%" }}>
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
