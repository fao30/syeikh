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
import MenuItem from '@mui/material/MenuItem';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";

function AddPatient() {
  const dispatch = useDispatch();
  const { patientLists } = useSelector(
    (state) => state.clinic
  );
  const [selectValue, setSelectValue] = useState({});

  const platformList = [{
    id: "2gis",
    label:"2 Gis"
  },{
    id: "prodoktor",
    label:"ProDoktor"
  },{
    id: "vk",
    label:"VK"
  },
  {
    id: "vk",
    label:"VK"
  },{
    id: "yandex_map",
    label:"Yandex Map"
  }]

  useEffect(() => {
    dispatch(fetchAllDoctor());
    dispatch(fetchAllPatients());
    dispatch(fetchAllAdmins());
  }, []);
  
  useEffect(() => {
    console.log(selectValue);
  }, [selectValue]);

  function handleChangePhone(event) {
    const phone = event;
    setSelectValue({ ...selectValue, phone });
  }
  function handleChange(event,param) {
    const val = event.target.value;
    setSelectValue({ ...selectValue, [param]:val });
  }

  const addNewData = (e) => {
    e.preventDefault();
    dispatch(addNewPatient(selectValue, patientLists));
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }} style={{ marginLeft: 50 }}>
        <h5>YOU CAN ADD NEW PATIENT</h5>
        <div className="">
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            onChange={(e)=>handleChange(e,"name")}
          />
        </div>
        <div className="mt-3">
          <TextField
            id="outlined-basic"
            label="Family Name"
            variant="outlined"
            onChange={(e)=>handleChange(e,"familyName")}
          />
        </div>
        <div className="mt-3">
        <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Platform</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectValue?.platform}
              label="admin"
              onChange={(e)=>handleChange(e,"platform")}
              >
              {platformList.map((e) => {
                return (
                  <MenuItem label="admin" value={e?.id}>
                    {e?.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="mt-4">
          <MuiPhoneNumber
            defaultCountry={"ru"}
            onChange={handleChangePhone}
            value={selectValue.phone}
          />
        </div>
        <div className="mt-4 pb-3">
          <Button onClick={addNewData} variant="outlined" className="mt-4">
            ADD NEW PATIENT
          </Button>
        </div>
      </Box>
    </>
  );
}

export default AddPatient;
