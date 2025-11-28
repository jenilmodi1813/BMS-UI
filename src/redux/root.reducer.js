import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import profileReducer from "./profile/profile.slice";
import HomeLoanReducer from "./loan/homeLoan/home.loan.slice";
import CarLoanReducer from "./loan/carLoan/car.loan.slice";
import loanReducer from "./loan/loan.slice";
import accountReducer from "./account/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  homeLoan: HomeLoanReducer,
  carLoan: CarLoanReducer,
  loan: loanReducer,
  account: accountReducer,
});

export default rootReducer;
