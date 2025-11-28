import { takeLatest } from "redux-saga/effects";
import { fetchAccountsRequest, createAccountRequest } from "./slice";

// Placeholder sagas until accountService is implemented
function* fetchAccountsSaga() {
  // yield call(accountService.getAccountsByCif, action.payload);
  yield null;
}

function* createAccountSaga() {
  // yield call(accountService.createSavingsAccount, data);
  yield null;
}

export default function* accountSaga() {
  yield takeLatest(fetchAccountsRequest.type, fetchAccountsSaga);
  yield takeLatest(createAccountRequest.type, createAccountSaga);
}
