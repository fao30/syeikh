import { combineReducers } from "redux";
import categoryReducer from "./catReducer";
import itemReducer from "./itemReducer";

export default combineReducers({
  movie: itemReducer,
  genre: categoryReducer,
});
