import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { registerStart, registerSuccess, registerFail } =
  registrationSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const response = await axios.post(
      "https://take-home-test-api.nutech-integrasi.com/registration",
      {
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        password: userData.password,
      }
    );
    dispatch(registerSuccess());
  } catch (error) {
    dispatch(
      registerFail(error.response?.data?.message || "Registration failed")
    );
  }
};

export default registrationSlice.reducer;
