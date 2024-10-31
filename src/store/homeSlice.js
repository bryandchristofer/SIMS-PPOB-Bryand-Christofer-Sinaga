// src/store/homeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    profile: null,
    balance: null,
    services: [],
    banners: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    fetchBalanceSuccess: (state, action) => {
      state.balance = action.payload;
      state.loading = false;
    },
    fetchServicesSuccess: (state, action) => {
      state.services = action.payload;
      state.loading = false;
    },
    fetchBannersSuccess: (state, action) => {
      state.banners = action.payload;
      state.loading = false;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStart,
  fetchProfileSuccess,
  fetchBalanceSuccess,
  fetchServicesSuccess,
  fetchBannersSuccess,
  fetchFail,
} = homeSlice.actions;

// Async thunk to fetch profile, balance, services, and banners
export const fetchHomeData = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const profileResponse = await axios.get(
      "https://api-doc-tht.nutech-integrasi.com/profile"
    );
    dispatch(fetchProfileSuccess(profileResponse.data));

    const balanceResponse = await axios.get(
      "https://api-doc-tht.nutech-integrasi.com/balance"
    );
    dispatch(fetchBalanceSuccess(balanceResponse.data));

    const servicesResponse = await axios.get(
      "https://api-doc-tht.nutech-integrasi.com/services"
    );
    dispatch(fetchServicesSuccess(servicesResponse.data));

    const bannersResponse = await axios.get(
      "https://api-doc-tht.nutech-integrasi.com/banner"
    );
    dispatch(fetchBannersSuccess(bannersResponse.data));
  } catch (error) {
    dispatch(fetchFail(error.response?.data?.message || "Failed to load data"));
  }
};

export default homeSlice.reducer;
