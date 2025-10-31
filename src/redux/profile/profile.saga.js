import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} from "./profile.slice";
import {
  fetchUserProfile,
  updateUserProfile,
} from "./profile.service";

function* handleFetchProfile(action) {
  try {
    const token = action.payload;
    const response = yield call(fetchUserProfile, token);
    yield put(fetchProfileSuccess(response));
  } catch (error) {
    yield put(fetchProfileFailure(error.message));
  }
}

function* handleUpdateProfile(action) {
  try {
    const { token, updatedData } = action.payload;
    const response = yield call(updateUserProfile, token, updatedData);
    yield put(updateProfileSuccess(response));
  } catch (error) {
    yield put(updateProfileFailure(error.message));
  }
}

export default function* profileSaga() {
  yield takeLatest(fetchProfileRequest.type, handleFetchProfile);
  yield takeLatest(updateProfileRequest.type, handleUpdateProfile);
}
