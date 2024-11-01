import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    profile: null,
    balance: { amount: 0 },
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
      state.balance = action.payload || { amount: 0 };
      state.loading = false;
    },
    fetchServicesSuccess: (state, action) => {
      state.services = Array.isArray(action.payload) ? action.payload : [];
      state.loading = false;
    },
    fetchBannersSuccess: (state, action) => {
      state.banners = Array.isArray(action.payload) ? action.payload : [];
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

const getToken = () => localStorage.getItem("token");

export const fetchHomeData = () => async (dispatch) => {
  dispatch(fetchStart());
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const profileResponse = await axios.get(`${API_BASE_URL}/profile`, {
      headers,
    });
    dispatch(fetchProfileSuccess(profileResponse.data.data));

    const balanceResponse = await axios.get(`${API_BASE_URL}/balance`, {
      headers,
    });
    dispatch(
      fetchBalanceSuccess({ amount: balanceResponse.data.data.balance })
    );

    const servicesResponse = await axios.get(`${API_BASE_URL}/services`, {
      headers,
    });
    dispatch(fetchServicesSuccess(servicesResponse.data.data || []));

    const bannersResponse = await axios.get(`${API_BASE_URL}/banner`, {
      headers,
    });
    dispatch(fetchBannersSuccess(bannersResponse.data.data || []));
  } catch (error) {
    dispatch(fetchFail(error.response?.data?.message || "Failed to load data"));
  }
};

export default homeSlice.reducer;
