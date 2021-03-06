import "../App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDoctor,
  fetchAllPatients,
  addNewVisit,
  fetchAllAdmins,
} from "../store/actionCreator/itemAction";
import ChartDoctor from "./chart.component";
import ChartAdmin from "./chart-admin.component";
import ChartPatient from "./chart-patient.component";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function AnalyticComponent() {
  const dispatch = useDispatch();
  const { doctorLists, patientLists, adminLists } = useSelector(
    (state) => state.clinic
  );
  const [radioButton, setRadioButton] = useState("doctor");

  return (
    <>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">ANALYTIC</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) => {
            setRadioButton(e.target.value);
          }}
          value={radioButton}
        >
          <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          <FormControlLabel
            value="patient"
            control={<Radio />}
            label="Patient"
          />
        </RadioGroup>
      </FormControl>
      {radioButton === "doctor" ? (
        <>
          <center>
            <h5>DOCTER ANALYTIC</h5>
            <ChartDoctor />
          </center>
        </>
      ) : (
        <></>
      )}
      {radioButton === "admin" ? (
        <>
          <center>
            <h5>ADMIN ANALYTIC</h5>
            <ChartAdmin />
          </center>
        </>
      ) : (
        <></>
      )}
      {radioButton === "patient" ? (
        <>
          <center>
            <h5>PATIENT ANALYTIC</h5>
            <ChartPatient />
          </center>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default AnalyticComponent;
