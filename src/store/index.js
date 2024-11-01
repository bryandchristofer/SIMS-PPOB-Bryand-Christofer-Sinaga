// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./registrationSlice";
import loginReducer from "./loginSlice";
import homeReducer from "./homeSlice";
import topUpReducer from "./topUpSlice";
import transactionReducer from "./transactionSlice";
import accountReducer from "./accountSlice";

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    login: loginReducer,
    home: homeReducer,
    topUp: topUpReducer,
    transaction: transactionReducer,
    account: accountReducer,
  },
});
