import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./slice";
import { loginUser, registerUser } from "./service";

// 🔹 Worker Saga — Login
function* handleLogin(action) {
  const { loginId, password, onSuccess, onError } = action.payload;
  try {
    const data = yield call(loginUser, { loginId, password });

    // Save token and user info in localStorage
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("accessToken", data.tokens?.accessToken || "");
    localStorage.setItem("refreshToken", data.tokens?.refreshToken || "");

    yield put(loginSuccess(data));

    if (onSuccess) onSuccess(data); // callback to UI
  } catch (error) {
    yield put(loginFailure(error));
    if (onError) onError(error);
  }
}

// 🔹 Worker Saga — Register
function* handleRegister(action) {
  const { payload, onSuccess, onError } = action.payload;
  try {
    const data = yield call(registerUser, payload);

    yield put(registerSuccess(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    yield put(registerFailure(error));
    if (onError) onError(error);
  }
}

// 🔹 Watcher Saga
export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
}
