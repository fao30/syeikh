import "../App.css";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@mui/material";
import swal from "sweetalert";
import { setIsLogin } from "../store/actionCreator";
import { useDispatch } from "react-redux";
import { baseUrl } from "../store/helper/url";
import { useNavigate } from "react-router";

function LoginComponent() {
  const [loginPassword, setLoginPassword] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const loginFormHandler = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginPassword.email,
        password: loginPassword.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response1) => {
        localStorage.setItem("access_token", response1.access_token);
        if (localStorage.access_token) {
          dispatch(setIsLogin(true));
          Navigate("/");
        }
      })
      .catch((error) => {
        swal(`${error.message}`, "Email or Password is Incorrect!", "error");
      });
  };
  return (
    <>
      <div className="" style={{ flexDirection: "row" }}>
        <TextField
          required
          id="outlined-required"
          label="Email"
          onChange={(e) => {
            const email = e.target.value;
            setLoginPassword({ ...loginPassword, email });
          }}
        />
        <TextField
          id="outlined-password-input"
          label="Password*"
          type="password"
          autoComplete="current-password"
          onChange={(e) => {
            const password = e.target.value;
            setLoginPassword({ ...loginPassword, password });
          }}
        />{" "}
      </div>
      <div className="mt-3"></div>
      <Button onClick={loginFormHandler} variant="outlined" className="mt-2">
        Login
      </Button>
    </>
  );
}

export default LoginComponent;
