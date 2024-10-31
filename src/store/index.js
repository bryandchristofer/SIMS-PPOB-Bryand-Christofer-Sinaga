// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./registrationSlice";
import loginReducer from "./loginSlice";
import homeReducer from "./homeSlice";

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    login: loginReducer,
    home: homeReducer,
  },
});
