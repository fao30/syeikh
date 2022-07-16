import {
  ITEMS_LOADING,
  DATA_VISITOR,
  ALL_DOCTORS,
  ALL_PATIENTS,
  ALL_USERS,
  ISLOGIN,
  DELETEMOVIE,
  ADD_MOVIE,
} from "../actionType/itemActionType";
import swal from "sweetalert";

import { baseUrl } from "../helper/url";

export function setIsLogin(payload) {
  return {
    type: ISLOGIN,
    payload,
  };
}

export function setAddMovie(payload) {
  return {
    type: ADD_MOVIE,
    payload,
  };
}

function setDataVisitor(payload) {
  return {
    type: DATA_VISITOR,
    payload,
  };
}

function setAllDoctors(payload) {
  return {
    type: ALL_DOCTORS,
    payload,
  };
}

function setAllPatients(payload) {
  return {
    type: ALL_PATIENTS,
    payload,
  };
}

function setAllUsers(payload) {
  return {
    type: ALL_USERS,
    payload,
  };
}

function setDeleteMovie(payload) {
  return {
    type: DELETEMOVIE,
    payload,
  };
}

function itemsLoading(payload) {
  return {
    type: ITEMS_LOADING,
    payload,
  };
}

//GET ALL OF DATA
export function fetchData() {
  return function (dispatch, getState) {
    dispatch(itemsLoading());
    fetch(`${baseUrl}/data-all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((response1) => {
        let responseModified = [];
        response1.forEach((e) => {
          const visitorName = e.Visitor.name;
          const adminName = e.adminFkId.name;
          const doctorName = e.doctorFkId.name;
          responseModified.push({ ...e, visitorName, adminName, doctorName});
        });
        dispatch(setDataVisitor(responseModified));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

//GET ALL DOCOT
export function fetchAllDoctor() {
  return function (dispatch, getState) {
    dispatch(itemsLoading());
    fetch(`${baseUrl}/user/doctors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((response1) => {
        dispatch(setAllDoctors(response1));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

//GET ALL PATIENTS
export function fetchAllPatients() {
  return function (dispatch, getState) {
    dispatch(itemsLoading());
    fetch(`${baseUrl}/all-visitor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((response1) => {
        console.log(response1);
        dispatch(setAllPatients(response1));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

//GET ALL USERS
export function fetchAllUsers() {
  return function (dispatch, getState) {
    dispatch(itemsLoading());
    fetch(`${baseUrl}/all-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((response1) => {
        console.log(response1);
        dispatch(setAllUsers(response1));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

export function addMovie(payload, payload2) {
  return function (dispatch, getState) {
    // dispatch(categoriesLoading());
    fetch(`${baseUrl}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: payload,
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((response1) => {
        dispatch(setAddMovie(response1));
        swal(
          "Movie Added!",
          `movie named ${payload2.title} has been added`,
          "success"
        );
      })
      .catch((error) => {
        console.log(error, "INI ERRORRNYAAAA");
      });
  };
}

export function removeMovie(payload) {
  return function (dispatch, getState) {
    // dispatch(categoriesLoading());
    fetch(`${baseUrl}/data/${payload}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((response1) => {
        console.log(response1, "INI HAPUSSS");
        dispatch(setDeleteMovie(payload));
        // swal(
        //   "Movie Added!",
        //   `movie with id ${payload} has been deleted`,
        //   "success"
        // );
      })
      .catch((error) => {
        console.log(error, "INI ERRORRNYAAAA");
      });
  };
}

export function registerAccount(payload) {
  return function (dispatch, getState) {
    fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((response1) => {
        console.log(response1, "INI JAWABAN");
      })
      .catch((error) => {
        console.log(error, "INI ERRORRNYAAAA");
      });
  };
}
