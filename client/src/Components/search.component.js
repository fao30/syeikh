import "../App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  fetchAllDoctor,
  fetchAllPatientsByName,
  fetchAllPatients,
  addNewVisit,
  fetchDataWithParams,
  fetchAllAdmins,
  addNewPatient,
} from "../store/actionCreator/itemAction";
import MuiPhoneNumber from "material-ui-phone-number";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function SearchComponent({ tabName }) {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");

  const { doctorLists, patientLists, adminLists } = useSelector(
    (state) => state.clinic
  );

  function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
  }

  const debouncedSearchName = useDebounce(searchName, 700);

  useEffect(() => {
    dispatch(fetchAllPatientsByName(debouncedSearchName));
  }, [debouncedSearchName]);

  useEffect(() => {
    dispatch(fetchAllPatients());
  }, []);

  function handleChange(event, label) {
    const value = event.target.value;
    if (label === "name") {
      setSearchName(value);
    }
  }

  return (
    <>
      <TextField
        onChange={(e) => {
          handleChange(e, "name");
        }}
        id="outlined-search"
        label="Name"
        type="search"
      />
    </>
  );
}

export default SearchComponent;
