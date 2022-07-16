import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import DataComponent from "../Components/data.component";

export default function Login() {
  const [tabActive, setTabActive] = useState("allData");

  function handleChange(e, value) {
    setTabActive(value);
  }
  

  function ShowComponent(params) {
    if (tabActive === "allData") {
      return <DataComponent />;
    } else {
      <h1>ehehehhe</h1>;
    }
  }

  return (
    <div className="container">
      <Tabs
        value={tabActive}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="allData" label="All Data" />
        <Tab value="addVisit" label="Add Visit" />
        <Tab value="three" label="Item Three" />
      </Tabs>
      <ShowComponent />
    </div>
  );
}
