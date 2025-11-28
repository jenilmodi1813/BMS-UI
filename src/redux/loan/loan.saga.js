import { call, put, takeLatest } from "redux-saga/effects";
import { uploadLoanDocument } from "./loan.service";
import {
    uploadDocumentRequest,
    uploadDocumentSuccess,
    uploadDocumentFailure,
} from "./loan.slice";
import toast from "react-hot-toast";

function* handleUploadDocument(action) {
    try {
        yield call(uploadLoanDocument, action.payload);
        yield put(uploadDocumentSuccess());
        toast.success("Document uploaded successfully!");
    } catch (error) {
        const message = error.message || (typeof error === "string" ? error : "Upload failed");
        yield put(uploadDocumentFailure(message));
        toast.error(message);
    }
}

export default function* loanSaga() {
    yield takeLatest(uploadDocumentRequest.type, handleUploadDocument);
}
