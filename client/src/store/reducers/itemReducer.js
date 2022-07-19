import {
  ITEMS_LOADING,
  DATA_VISITOR,DATA_VISITOR_BY_ID,
  ALL_DOCTORS,
  ALL_PATIENTS,
  ALL_ADMINS,
  ALL_USERS,
  ISLOGIN,
  DELETEMOVIE,
  ADD_MOVIE,ALL_PATIENT_COUNT,
  ALL_DOCTORS_COUNT,
  ALL_ADMINS_COUNT,
  ALL_PATIENT_FIRST
} from "../actionType/itemActionType";

const initialState = {
  dataVisits: [],
  dataVisitById: {},
  userLists: [],
  doctorLists: [],
  adminLists: [],
  doctorCounts: [],
  adminCounts: [],
  patientCounts: [],
  patientLists: [],
  singleData: {},
  patientFirst: {},
  isLoading: true,
  isLogin: false,
  error: null,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    //INI ADATA VISITOR BY ID
    case DATA_VISITOR_BY_ID:
      return {
        ...state,
        isLoading: false,
        dataVisitById: action.payload,
      };
    //INI PATIENT COUNT
    case ALL_PATIENT_FIRST:
      return {
        ...state,
        isLoading: false,
        patientFirst: action.payload,
      };
    //INI PATIENT COUNT
    case ALL_PATIENT_COUNT:
      return {
        ...state,
        isLoading: false,
        patientCounts: action.payload,
      };
    //INI ADMIN COUNT
    case ALL_ADMINS_COUNT:
      return {
        ...state,
        isLoading: false,
        adminCounts: action.payload,
      };
    //INI DOCTOR COUNT
    case ALL_DOCTORS_COUNT:
      return {
        ...state,
        isLoading: false,
        doctorCounts: action.payload,
      };
    //INI DATA ADMINS
    case ALL_ADMINS:
      return {
        ...state,
        isLoading: false,
        adminLists: action.payload,
      };
    //INI DATA USERS
    case ALL_USERS:
      return {
        ...state,
        isLoading: false,
        userLists: action.payload,
      };
    //INI DATA VISIT
    case DATA_VISITOR:
      return {
        ...state,
        isLoading: false,
        dataVisits: action.payload,
      };
    //INI DATA VISIT
    case ALL_DOCTORS:
      return {
        ...state,
        isLoading: false,
        doctorLists: action.payload,
      };
    //INI DATA VISIT
    case ALL_PATIENTS:
      return {
        ...state,
        isLoading: false,
        patientLists: action.payload,
      };
    case ITEMS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ISLOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case DELETEMOVIE:
      const result = state.movies.filter((e) => e.id != action.payload);
      return {
        ...state,
        isLoading: false,
        movies: result,
      };
    case ADD_MOVIE:
      return {
        ...state,
        isLoading: false,
        movies: action.payload,
      };
    default:
      return state;
  }
}
