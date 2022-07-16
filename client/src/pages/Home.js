import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import DataComponent from "../Components/data.component";
import UserComponent from "../Components/user.component";
import DoctorComponent from "../Components/doctor.component";
import PatientComponent from "../Components/patient.component";
import AddDataComponent from "../Components/add-data.component";
import { tabOptions } from "../store/helper/tabLists";
import ShowTabComponent from "../Components/showComponentTab.component";

export default function Login() {
  const [tabActive, setTabActive] = useState("allData");

  function handleChange(e, value) {
    setTabActive(value);
  }

  // function ShowTabComponent() {
  //   if (tabActive === "allData") {
  //     return (
  //       <div className="mt-3 center">
  //         <DataComponent />
  //       </div>
  //     );
  //   } else if (tabActive === "addVisit") {
  //     return (
  //       <div className="mt-3 center">
  //         <AddDataComponent />
  //       </div>
  //     );
  //   } else if (tabActive === "allUsers") {
  //     return (
  //       <div className="mt-3 center">
  //         <UserComponent />
  //       </div>
  //     );
  //   } else if (tabActive === "allDoctors") {
  //     return (
  //       <div className="mt-3 center">
  //         <DoctorComponent />
  //       </div>
  //     );
  //   } else if (tabActive === "allPatients") {
  //     return (
  //       <div className="mt-3 center">
  //         <PatientComponent />
  //       </div>
  //     );
  //   } else {
  //     return <h5>UNDER CONSTRUCTION</h5>;
  //   }
  // }

  return (
    <div className="container">
      <Tabs
        value={tabActive}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        {/* <Tab value="allData" label="All Data" />
        <Tab value="addVisit" label="Add Visit" />
        <Tab value="analytic" label="analytic" />
        <Tab value="allUsers" label="All Users" />
        <Tab value="allPatients" label="All Patients" />
      <Tab value="allDoctor" label="All Doctor" /> */}
        {tabOptions.map((e) => {
          return <Tab value={e.value} label={e.label} />;
        })}
      </Tabs>
      <ShowTabComponent tabActive={tabActive} />
    </div>
  );
}
