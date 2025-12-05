import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCarLoanRequest,
  fetchCarLoanSuccess,
  fetchCarLoanFailure,
  submitCarLoanRequest,
  submitCarLoanSuccess,
  submitCarLoanFailure,
} from "./car.loan.slice";
import { carLoanService } from "./car.loan.service";

function* fetchCarLoanSaga(action) {
  try {
    const response = yield call(carLoanService.getCarLoansByCif, action.payload);
    yield put(fetchCarLoanSuccess(response.data));
  } catch (error) {
    yield put(fetchCarLoanFailure(error.response?.data || "Failed to load car loan data"));
  }
}

function* submitCarLoanSaga(action) {
  try {
    console.log("Saga: submitCarLoanSaga triggered");
    const response = yield call(carLoanService.applyCarLoan, action.payload);
    yield put(submitCarLoanSuccess(response));
  } catch (error) {
    yield put(submitCarLoanFailure(error.response?.data || "Failed to submit car loan"));
  }
}

export default function* carLoanSaga() {
  yield takeLatest(fetchCarLoanRequest.type, fetchCarLoanSaga);
  yield takeLatest(submitCarLoanRequest.type, submitCarLoanSaga);
}
