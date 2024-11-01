// src/store/transactionSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    history: [],
    loading: false,
    error: null,
    offset: 0,
    limit: 5, // Number of items to fetch per request
    hasMore: true, // To control if there are more transactions to fetch
  },
  reducers: {
    fetchTransactionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTransactionSuccess: (state, action) => {
      state.history = [...state.history, ...action.payload.records];
      state.offset += state.limit; // Increase offset for the next fetch
      state.hasMore = action.payload.records.length === state.limit; // Check if there are more records
      state.loading = false;
    },
    fetchTransactionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTransactionStart,
  fetchTransactionSuccess,
  fetchTransactionFail,
} = transactionSlice.actions;

// Async thunk to fetch transactions
export const fetchTransactionHistory = () => async (dispatch, getState) => {
  dispatch(fetchTransactionStart());

  const { offset, limit } = getState().transaction;
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await axios.get(`${API_BASE_URL}/transaction/history`, {
      headers,
      params: {
        offset,
        limit,
      },
    });

    const { records } = response.data.data;
    dispatch(fetchTransactionSuccess({ records }));
  } catch (error) {
    dispatch(
      fetchTransactionFail(
        error.response?.data?.message || "Failed to load transaction history"
      )
    );
  }
};

export default transactionSlice.reducer;
