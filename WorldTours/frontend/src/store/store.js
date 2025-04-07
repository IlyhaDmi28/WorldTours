import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./slices/authUserSlice";
import alertReducer from "./slices/alertSlice";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    alert: alertReducer,
  },
});