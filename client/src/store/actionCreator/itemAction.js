import {
  ITEMS_LOADING,
  DATA_VISITOR,
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
        dispatch(setDataVisitor(response1));
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
