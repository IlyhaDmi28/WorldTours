import { createSlice } from "@reduxjs/toolkit";

const authUserSlice = createSlice({
  name: "authUser",
  initialState: { value: false },
  reducers: {
    setAuthUser: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { setAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;