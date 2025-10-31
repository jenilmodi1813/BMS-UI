import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  loanResponse: null,
  loanHistory: [],
  loanList: [],
  error: null,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    applyLoanRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.loanResponse = null;
    },
    applyLoanSuccess: (state, action) => {
      state.loading = false;
      state.loanResponse = action.payload;
    },
    applyLoanFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchLoanListRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLoanListSuccess: (state, action) => {
      state.loading = false;
      state.loanList = action.payload;
    },
    fetchLoanListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchLoanHistoryRequest: (state) => { state.loading = true; },
    fetchLoanHistorySuccess: (state, action) => {
      state.loading = false;
      state.loanHistory = action.payload;
    },
    fetchLoanHistoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  applyLoanRequest,
  applyLoanSuccess,
  applyLoanFailure,
  fetchLoanListRequest,
  fetchLoanListSuccess,
  fetchLoanListFailure,
  fetchLoanHistoryRequest,
  fetchLoanHistorySuccess,
  fetchLoanHistoryFailure,
} = loanSlice.actions;

export default loanSlice.reducer;
