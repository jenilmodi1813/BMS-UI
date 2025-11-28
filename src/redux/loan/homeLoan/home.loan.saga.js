import { call, put, takeLatest } from "redux-saga/effects";
import {
  applyHomeLoan,
  getHomeLoansByCif,
  getHomeLoanHistoryById,
} from "./home.loan.service";

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
    const data = yield call(applyHomeLoan, action.payload);
    yield put(applyLoanSuccess(data));
  } catch (error) {
    yield put(applyLoanFailure(error.message));
  }
}

function* handleFetchLoanList(action) {
  try {
    const data = yield call(getHomeLoansByCif, action.payload);
    yield put(fetchLoanListSuccess(data));
  } catch (error) {
    yield put(fetchLoanListFailure(error.message));
  }
}

function* fetchLoanHistory(action) {
  try {
    const data = yield call(getHomeLoanHistoryById, action.payload);
    yield put(fetchLoanHistorySuccess(data));
  } catch (error) {
    yield put(fetchLoanHistoryFailure(error.message));
  }
}

export default function* loanSaga() {
  yield takeLatest(applyLoanRequest.type, handleApplyLoan);
  yield takeLatest(fetchLoanListRequest.type, handleFetchLoanList);
  yield takeLatest(fetchLoanHistoryRequest.type, fetchLoanHistory);
}
