import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    uploadSuccess: false,
};

const loanSlice = createSlice({
    name: "loan",
    initialState,
    reducers: {
        uploadDocumentRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.uploadSuccess = false;
        },
        uploadDocumentSuccess: (state) => {
            state.loading = false;
            state.uploadSuccess = true;
            state.error = null;
        },
        uploadDocumentFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.uploadSuccess = false;
        },
        resetUploadState: (state) => {
            state.loading = false;
            state.error = null;
            state.uploadSuccess = false;
        },
    },
});

export const {
    uploadDocumentRequest,
    uploadDocumentSuccess,
    uploadDocumentFailure,
    resetUploadState,
} = loanSlice.actions;

export default loanSlice.reducer;
