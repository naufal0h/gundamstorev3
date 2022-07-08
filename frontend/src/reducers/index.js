import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cmsReducer from "./cmsReducer";
import shoppingReducer from "./shoppingReducer";

export default combineReducers({ userReducer, cmsReducer, shoppingReducer });