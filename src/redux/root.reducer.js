import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import profileReducer from "./profile/profile.slice";
import HomeLoanReducer from "./loan/homeLoan/home.loan.slice";
import CarLoanReducer from "./loan/carLoan/car.loan.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  homeLoan: HomeLoanReducer,
  carLoan: CarLoanReducer,
});

export default rootReducer;
