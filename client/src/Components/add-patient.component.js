import "../App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  fetchAllDoctor,
  fetchAllPatients,
  addNewVisit,
  fetchAllAdmins,
  addNewPatient,
} from "../store/actionCreator/itemAction";
import MuiPhoneNumber from "material-ui-phone-number";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function AddPatient() {
  const dispatch = useDispatch();
  const { doctorLists, patientLists, adminLists } = useSelector(
    (state) => state.clinic
  );
  const [selectValue, setSelectValue] = useState({});

  useEffect(() => {
    dispatch(fetchAllDoctor());
    dispatch(fetchAllPatients());
    dispatch(fetchAllAdmins());
  }, []);

  function handleChangePhone(event, params) {
    const phone = event;
    setSelectValue({ ...selectValue, phone });
  }
  function handleChange(event, params) {
    const name = event.target.value;
    setSelectValue({ ...selectValue, name });
  }

  const addNewData = (e) => {
    e.preventDefault();
    dispatch(addNewPatient(selectValue, patientLists));
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }} style={{ marginLeft: 50 }}>
        <h5>YOU CAN ADD NEW PATIENT</h5>
        <div className="mt-4">
          <TextField
            id="outlined-basic"
            label="name"
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <MuiPhoneNumber
            defaultCountry={"ru"}
            onChange={handleChangePhone}
            value={selectValue.phone}
          />
        </div>
        <div className="mt-4">
          <Button onClick={addNewData} variant="outlined" className="mt-4">
            ADD NEW PATIENT
          </Button>
        </div>
      </Box>
    </>
  );
}

export default AddPatient;
