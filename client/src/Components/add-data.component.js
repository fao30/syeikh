import "../App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  fetchAllDoctor,
  fetchAllPatients,
  addNewVisit,
  fetchAllAdmins,
} from "../store/actionCreator/itemAction";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function AddDataComponent({ setTabActive }) {
  const dispatch = useDispatch();
  const { doctorLists, patientLists, adminLists } = useSelector(
    (state) => state.clinic
  );
  const [selectValue, setSelectValue] = useState({});
  const [value, setValue] = React.useState(new Date());

  const handleChangeTime = (newValue, params) => {
    const timeVisit = newValue;
    setValue(timeVisit);
    setSelectValue({ ...selectValue, timeVisit });
  };

  useEffect(() => {
    dispatch(fetchAllDoctor());
    dispatch(fetchAllPatients());
    dispatch(fetchAllAdmins());
  }, []);

  function handleChange(event, params) {
    if (params.props.label === "doctor") {
      const doctor = event.target.value;
      setSelectValue({ ...selectValue, doctor });
    } else if (params.props.label === "patient") {
      const patient = event.target.value;
      setSelectValue({ ...selectValue, patient });
    } else if (params.props.label === "admin") {
      const admin = event.target.value;
      setSelectValue({ ...selectValue, admin });
    }
  }

  const addNewData = (e) => {
    e.preventDefault();
    const createdAt = new Date();
    setSelectValue({ ...selectValue, createdAt });
    dispatch(addNewVisit(selectValue, setTabActive));
  };

  return (
    <>
      <h5>PLEASE ADD NEW VISIT</h5>
      <Box sx={{ minWidth: 120 }} style={{ marginLeft: 50, width: 1350 }}>
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
        <div className="mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Admin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectValue.admin}
              label="admin"
              onChange={handleChange}
            >
              {adminLists.map((e) => {
                return (
                  <MenuItem label="admin" value={e.id}>
                    {e.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="mt-4">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={1}>
              <DateTimePicker
                label="DateTimeVisit"
                value={value}
                onChange={handleChangeTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
      </Box>
      <Button onClick={addNewData} variant="outlined" className="mt-4">
        ADD NEW SERVICE
      </Button>
    </>
  );
}

export default AddDataComponent;
