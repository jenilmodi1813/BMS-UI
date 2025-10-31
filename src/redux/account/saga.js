import { call, put, takeLatest } from "redux-saga/effects";
// import {
//   fetchAccountsRequest,
//   fetchAccountsSuccess,
//   fetchAccountsFailure,
//   createAccountRequest,
//   createAccountSuccess,
//   createAccountFailure,
// } from "./slice";
// import { accountService } from "../../services/accountService";
import { createAccountFailure, createAccountRequest, createAccountSuccess, fetchAccountsFailure, fetchAccountsRequest, fetchAccountsSuccess } from "./slice";

// Fetch accounts by CIF
function* fetchAccountsSaga(action) {
  try {
    const accounts = yield call(accountService.getAccountsByCif, action.payload);
    yield put(fetchAccountsSuccess(accounts));
  } catch (error) {
    yield put(fetchAccountsFailure(error.message));
  }
}

// Create new account
function* createAccountSaga(action) {
  try {
    const { accountType, data } = action.payload;
    const response =
      accountType === "SAVINGS"
        ? yield call(accountService.createSavingsAccount, data)
        : yield call(accountService.createCurrentAccount, data);
    yield put(createAccountSuccess(response));
  } catch (error) {
    yield put(createAccountFailure(error.message));
  }
}

export default function* accountSaga() {
  yield takeLatest(fetchAccountsRequest.type, fetchAccountsSaga);
  yield takeLatest(createAccountRequest.type, createAccountSaga);
}
