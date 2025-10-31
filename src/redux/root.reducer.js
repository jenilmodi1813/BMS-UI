import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import accountReducer from "./account/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
});

export default rootReducer;
