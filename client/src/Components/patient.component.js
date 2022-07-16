import "../App.css";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { setIsLogin } from "../store/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../store/helper/url";
import { useNavigate } from "react-router";
import { fetchAllPatients } from "../store/actionCreator/itemAction";

function PatientComponent() {
  const dispatch = useDispatch();
  const { patientLists } = useSelector((state) => state.clinic);

  useEffect(() => {
    dispatch(fetchAllPatients());
  }, []);
  
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "phone", headerName: "Phone Number", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
  ];

  return (
    <>
      <div style={{ marginLeft: 350, height: 400, width: "50%" }}>
        <DataGrid
          rows={patientLists}
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

export default PatientComponent;
