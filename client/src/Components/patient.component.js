import "../App.css";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { setIsLogin } from "../store/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../store/helper/url";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { fetchAllPatients } from "../store/actionCreator/itemAction";
import AddPatient from "./add-patient.component";
import TextField from "@mui/material/TextField";
import SearchComponent from "./search.component";

function PatientComponent() {
  const Navigate = useNavigate();

  const dispatch = useDispatch();
  const { patientLists } = useSelector((state) => state.clinic);
  const [addForm, setAddForm] = useState(false);
  const [searchButton, setSearchButton] = useState(false);

  const addNewData = (e) => {
    if (e.target.textContent === "SEARCH BUTTON") {
      setSearchButton(searchButton ? false : true);
    } else {
      setAddForm(addForm ? false : true);
    }
  };

  useEffect(() => {
    dispatch(fetchAllPatients());
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "familyName", headerName: "Last Name", width: 130 },
    { field: "phone", headerName: "Phone Number", width: 130 },
    { field: "platform", headerName: "Platform", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
  ];  

  return (
    <>
      <div className="mt-4">
        <Button label="search" onClick={addNewData} variant="outlined">
          SEARCH BUTTON
        </Button>
      </div>
      <div className="mt-4 mb-4">
        {searchButton ? <SearchComponent tabName="patient" /> : <></>}
      </div>

      <div style={{ marginLeft: 350, height: 400, width: "50%" }}>
        <DataGrid
          rows={patientLists}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellClick={(params, event) => {
            event.defaultMuiPrevented = true;
            Navigate(`/medcard/${params.id}`);
          }}
        />
      </div>
      <div className="mt-4">
        <Button onClick={addNewData} variant="outlined">
          NEW PATIENT
        </Button>
      </div>
      <div className="mt-4">{addForm ? <AddPatient /> : <></>}</div>
    </>
  );
}

export default PatientComponent;
