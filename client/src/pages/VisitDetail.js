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
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

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
    setDataById(dataVisitById);
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
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">
            Total Spend
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={dataById?.totalSpend || ""}
            onChange={(e) => {}}
            startAdornment={<InputAdornment position="start">₽</InputAdornment>}
          />
        </FormControl>
        <TextField
          id="outlined-required"
          label="Status"
          value={dataById?.status || ""}
        />
      </div>
    </div>
  );
}
