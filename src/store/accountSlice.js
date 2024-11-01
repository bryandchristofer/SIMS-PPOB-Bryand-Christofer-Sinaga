// src/store/accountSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

// Thunk to fetch profile data
export const fetchProfile = createAsyncThunk(
  "account/fetchProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile data"
      );
    }
  }
);

// Thunk to update profile picture
export const updateProfileImage = createAsyncThunk(
  "account/updateProfileImage",
  async (formData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/profile/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === 0) {
        return response.data.data; // Return updated profile data including profile_image
      } else {
        return rejectWithValue(
          response.data.message || "Failed to update profile image"
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile image upload failed"
      );
    }
  }
);

export const updateProfileData = createAsyncThunk(
  "account/updateProfileData",
  async (updatedProfile, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/profile/update`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 0) {
        return response.data.data; // Successfully updated profile
      } else {
        // API returned a non-success status
        console.error("API error:", response.data.message);
        return rejectWithValue(
          response.data.message || "Failed to update profile"
        );
      }
    } catch (error) {
      // Log full error response for troubleshooting
      console.error("Profile update error:", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Update profile request failed"
      );
    }
  }
);

// Thunk to handle logout
export const logout = createAsyncThunk("account/logout", async () => {
  localStorage.removeItem("token");
  return null;
});

const accountSlice = createSlice({
  name: "account",
  initialState: { profile: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.profile = null;
      });
  },
});

export default accountSlice.reducer;
