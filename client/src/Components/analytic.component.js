import "../App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDoctor,
  fetchAllPatients,
  addNewVisit,
  fetchAllAdmins,
} from "../store/actionCreator/itemAction";
import Chart from "./chart.component";

function AnalyticComponent() {
  const dispatch = useDispatch();
  const { doctorLists, patientLists, adminLists } = useSelector(
    (state) => state.clinic
  );
  const [selectValue, setSelectValue] = useState({});

  return (
    <>
      <h5>ANALYTICS</h5>
      <Chart />
    </>
  );
}

export default AnalyticComponent;
