import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchAccountsRequest: (state) => {
      state.loading = true;
    },
    fetchAccountsSuccess: (state, action) => {
      state.loading = false;
      state.accounts = action.payload;
    },
    fetchAccountsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createAccountRequest: (state) => {
      state.loading = true;
    },
    createAccountSuccess: (state, action) => {
      state.loading = false;
      state.accounts.push(action.payload);
    },
    createAccountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAccountsRequest,
  fetchAccountsSuccess,
  fetchAccountsFailure,
  createAccountRequest,
  createAccountSuccess,
  createAccountFailure,
} = accountSlice.actions;

export default accountSlice.reducer;
