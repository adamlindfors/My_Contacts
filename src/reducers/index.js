import { combineReducers } from "redux";
import contactReducer from "./contactReducer";
import authReducer from "./authReducer";
import labelReducer from "./labelReducer";

export default combineReducers({
  contactReducer,
  authReducer,
  labelReducer,
});
