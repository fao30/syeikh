import "../App.css";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { setIsLogin } from "../store/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../store/helper/url";
import { useNavigate } from "react-router";
import { fetchData } from "../store/actionCreator/itemAction";

import DataComponent from "../Components/data.component";
import UserComponent from "../Components/user.component";
import DoctorComponent from "../Components/doctor.component";
import PatientComponent from "../Components/patient.component";
import AddDataComponent from "../Components/add-data.component";

function ShowTabComponent({ tabActive }) {
  if (tabActive === "allData") {
    return (
      <div className="mt-3 center">
        <DataComponent />
      </div>
    );
  } else if (tabActive === "addVisit") {
    return (
      <div className="mt-3 center">
        <AddDataComponent />
      </div>
    );
  } else if (tabActive === "allUsers") {
    return (
      <div className="mt-3 center">
        <UserComponent />
      </div>
    );
  } else if (tabActive === "allDoctors") {
    return (
      <div className="mt-3 center">
        <DoctorComponent />
      </div>
    );
  } else if (tabActive === "allPatients") {
    return (
      <div className="mt-3 center">
        <PatientComponent />
      </div>
    );
  } else {
    return <h5>UNDER CONSTRUCTION</h5>;
  }
}

export default ShowTabComponent;
