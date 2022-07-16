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

const initialState = {
  dataVisits: [],
  userLists: [],
  doctorLists: [],
  patientLists: [],
  singleData: {},
  isLoading: true,
  isLogin: false,
  error: null,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    //INI DATA USERS
    case ALL_USERS:
      console.log(action);
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
