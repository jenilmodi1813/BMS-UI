import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./auth.slice";
import { loginUserApi, registerUserApi } from "./auth.service";
import toast from "react-hot-toast";

// 🔹 Worker Saga — Login
function* handleLogin(action) {
  try {
    const { loginId, password } = action.payload;

    // Call API
    const data = yield call(loginUserApi, { loginId, password });
    console.log("Login API Response:", data);

    const { customer, tokens, message } = data;

    // ✅ Save structured auth info
    localStorage.setItem(
      "auth",
      JSON.stringify({
        customer,
        tokens,
      })
    );

    // ✅ Update Redux state (match slice structure)
    yield put(
      loginSuccess({
        customer,
        tokens,
      })
    );

    toast.success(message || "Login successful!");
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Login failed. Please try again.";
    yield put(loginFailure(message));
    toast.error(message);
  }
}

// 🔹 Worker Saga — Register
function* handleRegister(action) {
  try {
    const formData = action.payload;
    const data = yield call(registerUserApi, formData);
    yield put(registerSuccess(data));
    toast.success("Registration successful!");
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Registration failed.";
    yield put(registerFailure(message)); 
    toast.error(message);
  }
}

// 🔹 Watcher Saga
export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
}
