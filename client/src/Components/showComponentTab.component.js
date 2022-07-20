import "../App.css";
import React from "react";

import DataComponent from "../Components/data.component";
import UserComponent from "../Components/user.component";
import DoctorComponent from "../Components/doctor.component";
import PatientComponent from "../Components/patient.component";
import AnalyticComponent from "../Components/analytic.component";
import AddDataComponent from "../Components/add-data.component";

function ShowTabComponent({ tabActive, setTabActive }) {
  if (tabActive === "allData") {
    return (
      <div className="mt-3 center">
        <DataComponent />
      </div>
    );
  } else if (tabActive === "addVisit") {
    return (
      <div className="mt-3 center">
        <AddDataComponent setTabActive={setTabActive} />
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
    return (
      <div className="mt-3 center">
        <AnalyticComponent />
      </div>
    );
  }
}

export default ShowTabComponent;
