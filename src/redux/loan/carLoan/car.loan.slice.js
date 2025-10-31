import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carLoan: null,
  loading: false,
  error: null,
  success: false,
};

const carLoanSlice = createSlice({
  name: "carLoan",
  initialState,
  reducers: {
    fetchCarLoanRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCarLoanSuccess: (state, action) => {
      state.loading = false;
      state.carLoan = action.payload;
    },
    fetchCarLoanFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    submitCarLoanRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    submitCarLoanSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.carLoan = action.payload;
    },
    submitCarLoanFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {
  fetchCarLoanRequest,
  fetchCarLoanSuccess,
  fetchCarLoanFailure,
  submitCarLoanRequest,
  submitCarLoanSuccess,
  submitCarLoanFailure,
} = carLoanSlice.actions;

export default carLoanSlice.reducer;
