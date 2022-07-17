import "../App.css";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { setIsLogin } from "../store/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../store/helper/url";
import { useNavigate } from "react-router";
import { fetchAllUsers } from "../store/actionCreator/itemAction";

function UserComponent() {
  const dispatch = useDispatch();
  const { userLists } = useSelector((state) => state.clinic);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "role",
      headerName: "Role",
      // type: "number",
      width: 130,
    },
  ];

  return (
    <>
      <div style={{ marginLeft: 350, height: 400, width: "50%" }}>
        <DataGrid
          rows={userLists}
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

export default UserComponent;
