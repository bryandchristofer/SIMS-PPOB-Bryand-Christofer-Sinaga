// src/store/loginSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: null,
    isAuthenticated: false,
    session: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.session = action.payload; // Store session data
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.session = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.session = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout } =
  loginSlice.actions;

// Async thunk for login
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      "https://api-doc-tht.nutech-integrasi.com/login",
      credentials
    );
    const sessionData = response.data; // Assuming the session token comes in the response data
    dispatch(loginSuccess(sessionData));
    localStorage.setItem("session", JSON.stringify(sessionData)); // Store session in local storage
  } catch (error) {
    dispatch(loginFail(error.response?.data?.message || "Login failed"));
  }
};

export const selectIsAuthenticated = (state) => state.login.isAuthenticated;

export default loginSlice.reducer;
