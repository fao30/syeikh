import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState, useEffect } from "react";
import { tabOptions } from "../store/helper/tabLists";
import ShowTabComponent from "../Components/showComponentTab.component";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import { fetchDataById } from "../store/actionCreator/itemAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function VisitDetail() {
  const [tabActive, setTabActive] = useState("allData");
  const [dataById, setDataById] = useState({});
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataVisitById } = useSelector((state) => state.clinic);
  const params = useParams();

  useEffect(() => {
    dispatch(fetchDataById(params.id));
  }, [params.id]);

  useEffect(() => {
    console.log("EHEHEHEHE", dataVisitById);
    setDataById(dataVisitById);
    console.log("AFERTRTTT", dataById);
  }, [dataVisitById]);

  function handleChange(e, value) {
    if (value === "logout") {
      localStorage.clear();
      Navigate("/login");
    } else {
      Navigate("/");
    }
  }

  return (
    <div className="">
      <Tabs
        value={tabActive}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="back" label="Back To Home" />;
        <Tab icon={<PersonPinIcon />} aria-label="person" value="logout" />
      </Tabs>
      <div className="">
        <TextField
          id="outlined-read-only-input"
          label="ID"
          value={dataById.id}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-required"
          label="Patient"
          value={dataById?.Visitor?.name || ""}
          onChange={(e) => {}}
        />
        <TextField
          id="outlined-required"
          label="Admin"
          value={dataById?.adminFkId?.name || ""}
        />
        <TextField
          id="outlined-required"
          label="Doctor"
          value={dataById?.doctorFkId?.name || ""}
        />
      </div>
    </div>
  );
}
