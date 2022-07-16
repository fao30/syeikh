import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { tabOptions } from "../store/helper/tabLists";
import ShowTabComponent from "../Components/showComponentTab.component";

export default function Login() {
  const [tabActive, setTabActive] = useState("allData");

  function handleChange(e, value) {
    setTabActive(value);
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
        {tabOptions.map((e) => {
          return <Tab value={e.value} label={e.label} />;
        })}
      </Tabs>
      <ShowTabComponent tabActive={tabActive} />
    </div>
  );
}
