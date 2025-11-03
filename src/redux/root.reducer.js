import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import profileReducer from "./profile/profile.slice";
import HomeLoanReducer from "./loan/homeLoan/home.loan.slice";
import CarLoanReducer from "./loan/carLoan/car.loan.slice";
import accountReducer from "./account/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  homeLoan: HomeLoanReducer,
  carLoan: CarLoanReducer,
  account: accountReducer,
});

export default rootReducer;
