import { combineReducers } from "redux";
import categoryReducer from "./catReducer";
import itemReducer from "./itemReducer";

export default combineReducers({
  clinic: itemReducer,
  genre: categoryReducer,
});
