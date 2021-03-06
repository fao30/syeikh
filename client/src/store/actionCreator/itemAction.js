import {
  ITEMS_LOADING,
  DATA_VISITOR,
  DATA_VISITOR_BY_ID,
  ALL_DOCTORS,
  ALL_PATIENTS,
  ALL_USERS,
  ALL_ADMINS,
  ISLOGIN,
  DELETEMOVIE,
  ALL_PATIENT_COUNT,
  ALL_PATIENT_FIRST,
  ALL_ADMINS_COUNT,
  ALL_DOCTORS_COUNT,
  ADD_MOVIE,
} from "../actionType/itemActionType";
import swal from "sweetalert";

import { baseUrl } from "../helper/url";
import { formatDateWithZone } from "../helper/timeHelper";

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

function setDataById(payload) {
  return {
    type: DATA_VISITOR_BY_ID,
    payload,
  };
}

function setAllDoctors(payload) {
  return {
    type: ALL_DOCTORS,
    payload,
  };
}

function setAllDoctorsCount(payload) {
  return {
    type: ALL_DOCTORS_COUNT,
    payload,
  };
}

function setAllAdminCount(payload) {
  return {
    type: ALL_ADMINS_COUNT,
    payload,
  };
}

function setAllPatientCount(payload) {
  return {
    type: ALL_PATIENT_COUNT,
    payload,
  };
}

function setAllPatientFirst(payload) {
  return {
    type: ALL_PATIENT_FIRST,
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

function setAllAdmins(payload) {
  return {
    type: ALL_ADMINS,
    payload,
  };
}

function itemsLoading(payload) {
  return {
    type: ITEMS_LOADING,
    payload,
  };
}

// function formatDateWithZone(date, tz) {
//   let s = date.toLocaleString("en-GB", { timeZone: tz });
//   let a = s.split(/\D/);
//   return a[2] + "-" + a[1] + "-" + a[0] + " " + a[4] + ":" + a[5];
// }

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
          const creatorName = e.creatorFkId.name || "-";
          let updatorName = "-";
          if (e.updatorFkId) {
            updatorName = e.updatorFkId.name;
          }
          const timeVisit = formatDateWithZone(e.timeVisit, "Europe/Moscow");
          const createdAt = formatDateWithZone(e.createdAt, "Europe/Moscow");
          const updatedAt = formatDateWithZone(e.updatedAt, "Europe/Moscow");
          const visitorName = e.Visitor.name;
          const adminName = e.adminFkId.name;
          const doctorName = e.doctorFkId.name;
          responseModified.push({
            ...e,
            timeVisit,
            createdAt,
            updatedAt,
            visitorName,
            adminName,
            doctorName,
            creatorName,
            updatorName,
          });
        });
        dispatch(setDataVisitor(responseModified));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

//GET ALL OF DATA
export function fetchDataById(params) {
  return function (dispatch, getState) {
    dispatch(itemsLoading());
    fetch(`${baseUrl}/data/${params}`, {
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
        dispatch(setDataById(response1));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

//GET ALL OF DATA
export function editData(params, paramsBody) {
  console.log(params, paramsBody);
  return function (dispatch, getState) {
    dispatch(itemsLoading());
    fetch(`${baseUrl}/edit-visit/${params}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(paramsBody),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((response1) => {
        dispatch(setDataById(response1));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

//GET ALL OF DATA
export function fetchDataWithParams(params) {
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
          responseModified.push({ ...e, visitorName, adminName, doctorName });
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

//GET ALL COUNT DOCTOR
export function fetchAllDoctorCount() {
  return function (dispatch, getState) {
    dispatch(itemsLoading());
    fetch(`${baseUrl}/count-doctor`, {
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
        dispatch(setAllDoctorsCount(response1));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

//GET ALL COUNT ADMINS
export function fetchAllAdminCount() {
  return function (dispatch, getState) {
    dispatch(itemsLoading());
    fetch(`${baseUrl}/count-admin`, {
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
        dispatch(setAllAdminCount(response1));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

//GET ALL COUNT PATIENTS
export function fetchAllPatientCount() {
  return function (dispatch, getState) {
    dispatch(itemsLoading());
    fetch(`${baseUrl}/count-patient`, {
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
        dispatch(setAllPatientCount(response1));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

//GET ALL COUNT PATIENTS
export function fetchAllPatientFirst() {
  return function (dispatch, getState) {
    dispatch(itemsLoading());
    fetch(`${baseUrl}/count-first-patient`, {
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
        dispatch(setAllPatientFirst(response1));
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
      // body: JSON.stringify({ payload }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((response1) => {
        dispatch(setAllPatients(response1));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

//GET ALL PATIENTS BY NAME
export function fetchAllPatientsByName(payload) {
  console.log(payload);
  return function (dispatch, getState) {
    dispatch(itemsLoading());
    fetch(`${baseUrl}/all-visitor?name=${payload}`, {
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

//GET ALL USERS
export function fetchAllAdmins() {
  return function (dispatch, getState) {
    dispatch(itemsLoading());
    fetch(`${baseUrl}/user/admins`, {
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
        dispatch(setAllAdmins(response1));
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

export function addNewVisit(payload, setTabActive) {
  return function (dispatch, getState) {
    // dispatch(categoriesLoading());
    console.log(payload);
    fetch(`${baseUrl}/register-new-visit`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((response1) => {
        dispatch(setAddMovie(response1));
        setTabActive("allData");
      })
      .catch((error) => {
        console.log(error, "INI ERRORRNYAAAA");
      });
  };
}

export function addNewPatient(payload, payload1) {
  return function (dispatch, getState) {
    // dispatch(categoriesLoading());
    console.log(payload);
    fetch(`${baseUrl}/register-visitor`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((response1) => {
        console.log(payload1);
        console.log(response1);
        dispatch(setAllPatients([response1, ...payload1]));
      })
      .catch((error) => {
        console.log(error, "INI ERRORRNYAAAA");
      });
  };
}
