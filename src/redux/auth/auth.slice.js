import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  tokenType: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  registrationSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // --- LOGIN FLOW ---
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { customer, tokens } = action.payload;
      state.loading = false;
      state.user = customer;
      state.accessToken = tokens?.accessToken || null;
      state.refreshToken = tokens?.refreshToken || null;
      state.tokenType = tokens?.tokenType || "Bearer";
      state.error = null;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // --- REGISTER FLOW ---
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.registrationSuccess = false;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.registrationSuccess = true;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.registrationSuccess = false;
    },

    // --- LOGOUT ---
    logout: () => initialState, // clean reset (Redux Persist will rehydrate empty)

    // --- UTILITY ---
    clearError: (state) => {
      state.error = null;
    },
    resetRegistrationState: (state) => {
      state.registrationSuccess = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
  clearError,
  resetRegistrationState,
} = authSlice.actions;

export default authSlice.reducer;
