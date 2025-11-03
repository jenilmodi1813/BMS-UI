import { all } from "redux-saga/effects";
import authSaga from "./auth/auth.saga";
import accountSaga from "./account/saga";
import profileSaga from "./profile/profile.saga";
import homeLoanSaga from "./loan/homeLoan/home.loan.saga";
import carLoanSaga from "./loan/carLoan/car.loan.saga";

export default function* rootSaga() {
  yield all([authSaga(), profileSaga(), homeLoanSaga(), carLoanSaga() ,accountSaga()]);

}
