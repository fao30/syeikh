import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState, useEffect } from "react";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import { fetchDataById, editData } from "../store/actionCreator/itemAction";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

export default function VisitDetail() {
  const [tabActive, setTabActive] = useState("allData");
  const [value, setValue] = React.useState(new Date());
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

  function handleChangeForm(event, label) {
    if (label === "totalSpend") {
      const totalSpend = event.target.value;
      setDataById({ ...dataById, totalSpend });
    } else if (label === "status") {
      const status = event.target.value;
      setDataById({ ...dataById, status });
    } else if (label === "timeVisit") {
      const timeVisit = event;
      setValue(timeVisit);
      setDataById({ ...dataById, timeVisit });
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
      <div className="container-detail">
        <TextField
          id="outlined-read-only-input"
          label="ID"
          value={dataById.id}
          disabled
        />
        <TextField
          id="outlined-required"
          label="Patient"
          value={dataById?.Visitor?.name || ""}
          onChange={(e) => {}}
          disabled
        />
        <TextField
          id="outlined-required"
          label="Admin"
          value={dataById?.adminFkId?.name || ""}
          disabled
        />
        <TextField
          id="outlined-required"
          label="Doctor"
          value={dataById?.doctorFkId?.name || ""}
          disabled
        />
      </div>
      <p className="mt-3">PLEASE EDIT HERE</p>
      <div className="mt-3">
        <TextField
          id="outlined-required"
          label="Status"
          value={dataById?.status || ""}
          onChange={(e) => {
            handleChangeForm(e, "status");
          }}
        />
        <div className="updateData">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={1}>
              <DateTimePicker
                label="timeVisit"
                value={dataById?.timeVisit || ""}
                onChange={(e) => {
                  handleChangeForm(e, "timeVisit");
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <div>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">
              Total Spend
            </InputLabel>
            <Input
              onChange={(e) => {
                handleChangeForm(e, "totalSpend");
              }}
              id="standard-adornment-amount"
              value={dataById?.totalSpend || ""}
              startAdornment={
                <InputAdornment position="start">₽</InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
      <Button
        onClick={() => {
          dispatch(
            editData(params.id, {
              status: dataById.status,
              totalSpend: dataById.totalSpend,
              timeVisit: dataById.timeVisit,
              updatedAt: new Date(),
            })
          );
          Navigate("/");
        }}
        variant="outlined"
        className="mt-2"
      >
        Update Data
      </Button>
    </div>
  );
}
