import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./slices/authUserSlice";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
});