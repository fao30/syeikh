import "../App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDoctor,
  fetchAllPatients,
} from "../store/actionCreator/itemAction";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function AddDataComponent() {
  const dispatch = useDispatch();
  const { doctorLists, patientLists } = useSelector((state) => state.clinic);
  const [selectValue, setSelectValue] = useState({});

  useEffect(() => {
    dispatch(fetchAllDoctor());
    dispatch(fetchAllPatients());
  }, []);

  function handleChange(event, params) {
    if (params.props.label === "doctor") {
      const doctor = event.target.value;
      setSelectValue({ ...selectValue, doctor });
    } else if (params.props.label === "patient") {
      const patient = event.target.value;
      setSelectValue({ ...selectValue, patient });
    }
  }

  return (
    <>
      <h5>PLEASE ADD NEW VISIT</h5>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Doctor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectValue.doctor}
            label="doctor"
            onChange={handleChange}
          >
            {doctorLists.map((e) => {
              return (
                <MenuItem label="doctor" value={e.id}>
                  {e.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div className="mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Patient</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectValue.patient}
              label="doctor"
              onChange={handleChange}
            >
              {patientLists.map((e) => {
                return (
                  <MenuItem label="patient" value={e.id}>
                    {e.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </Box>
    </>
  );
}

export default AddDataComponent;
