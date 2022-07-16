import {
  ITEMS_LOADING,
  DATA_VISITOR,
  ISLOGIN,
  DELETEMOVIE,
  ADD_MOVIE,
} from "../actionType/itemActionType";

const initialState = {
  dataVisits: [],
  singleData: {},
  isLoading: true,
  isLogin: false,
  error: null,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    //INI DATA VISIT
    case DATA_VISITOR:
      return {
        ...state,
        isLoading: false,
        dataVisits: action.payload,
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
