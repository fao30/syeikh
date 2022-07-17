import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { tabOptions } from "../store/helper/tabLists";
import ShowTabComponent from "../Components/showComponentTab.component";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useNavigate } from "react-router";

export default function Login() {
  const [tabActive, setTabActive] = useState("allData");
  const Navigate = useNavigate();

  function handleChange(e, value) {
    if (value === "logout") {
      localStorage.clear();
      Navigate("/login");
    } else {
      setTabActive(value);
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
        {tabOptions.map((e) => {
          return <Tab value={e.value} label={e.label} />;
        })}
        <Tab icon={<PersonPinIcon />} aria-label="person" value="logout" />
      </Tabs>
      <ShowTabComponent tabActive={tabActive} setTabActive={setTabActive} />
    </div>
  );
}
