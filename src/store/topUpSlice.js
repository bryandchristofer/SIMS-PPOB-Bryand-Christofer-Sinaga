import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

export const topUpUser = createAsyncThunk(
  "topUp/topUpUser",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = localStorage.getItem("token");
    const top_up_amount = parseInt(state.topUp.nominal);

    if (isNaN(top_up_amount) || top_up_amount <= 0) {
      return rejectWithValue(
        "Invalid amount: Must be a positive number greater than zero."
      );
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/topup`,
        { top_up_amount, transaction_type: "TOPUP" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 0) {
        return response.data.data.balance;
      } else {
        return rejectWithValue(response.data.message || "Top Up failed");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Top Up request failed"
      );
    }
  }
);

const topUpSlice = createSlice({
  name: "topUp",
  initialState: {
    nominal: "",
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    setNominal: (state, action) => {
      state.nominal = action.payload;
    },
    resetTopUpState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.nominal = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(topUpUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(topUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.nominal = "";
      })
      .addCase(topUpUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { setNominal, resetTopUpState } = topUpSlice.actions;

export const selectNominal = (state) => state.topUp.nominal;

export default topUpSlice.reducer;
