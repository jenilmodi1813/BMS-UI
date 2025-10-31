import { call, put, takeLatest } from "redux-saga/effects";
import { applyLoan, getLoansByCif, getLoanHistoryById } from "./home.loan.service";
import {
  applyLoanRequest,
  applyLoanSuccess,
  applyLoanFailure,
  fetchLoanListRequest,
  fetchLoanListSuccess,
  fetchLoanListFailure,
   fetchLoanHistoryRequest,
  fetchLoanHistorySuccess,
  fetchLoanHistoryFailure,
} from "./home.loan.slice";

function* handleApplyLoan(action) {
  try {
    const response = yield call(applyLoan, action.payload);
    yield put(applyLoanSuccess(response));
  } catch (error) {
    yield put(applyLoanFailure(error.message || "Loan application failed"));
  }
}

function* handleFetchLoanList(action) {
  try {
    const response = yield call(getLoansByCif, action.payload);
    yield put(fetchLoanListSuccess(response));
  } catch (error) {
    yield put(fetchLoanListFailure(error));
  }
}

function* fetchLoanHistory(action) {
  try {
    const data = yield call(getLoanHistoryById, action.payload);
    yield put(fetchLoanHistorySuccess(data));
  } catch (error) {
    yield put(fetchLoanHistoryFailure(error.response?.data || error.message));
  }
}

export default function* loanSaga() {
  yield takeLatest(applyLoanRequest.type, handleApplyLoan);
  yield takeLatest(fetchLoanListRequest.type, handleFetchLoanList);
  yield takeLatest(fetchLoanHistoryRequest.type, fetchLoanHistory);
}
