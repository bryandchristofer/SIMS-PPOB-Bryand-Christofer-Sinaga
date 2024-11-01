import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: null,
    isAuthenticated: false,
    token: null,
    message: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.message = "Login Sukses";
      localStorage.setItem("token", action.payload.token);
      const expirationTime = new Date().getTime() + 12 * 60 * 60 * 1000;
      localStorage.setItem("tokenExpiration", expirationTime);
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout } =
  loginSlice.actions;

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(loginStart());
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        dispatch(loginFail("Invalid email format"));
        return;
      }
      if (password.length < 8) {
        dispatch(loginFail("Password must be at least 8 characters"));
        return;
      }

      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/login",
        { email, password }
      );
      if (response.data.status === 0) {
        dispatch(loginSuccess({ token: response.data.data.token }));
      } else {
        dispatch(loginFail(response.data.message));
      }
    } catch (error) {
      dispatch(loginFail(error.response?.data?.message || "Login failed"));
    }
  };

export const selectIsAuthenticated = (state) => state.login.isAuthenticated;

export default loginSlice.reducer;
