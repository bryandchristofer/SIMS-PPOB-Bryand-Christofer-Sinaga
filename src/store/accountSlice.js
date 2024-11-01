import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

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

export const updateProfileImage = createAsyncThunk(
  "account/updateProfileImage",
  async (formData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
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
        return response.data.data;
      } else {
        return rejectWithValue(
          response.data.message || "Failed to update profile image"
        );
      }
    } catch (error) {
      console.error("Profile image upload error:", error.response);
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
      const response = await axios.put(
        `${API_BASE_URL}/profile/update`,
        {
          first_name: updatedProfile.first_name,
          last_name: updatedProfile.last_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 0) {
        return response.data.data;
      } else {
        return rejectWithValue(
          response.data.message || "Failed to update profile"
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Update profile request failed"
      );
    }
  }
);

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
