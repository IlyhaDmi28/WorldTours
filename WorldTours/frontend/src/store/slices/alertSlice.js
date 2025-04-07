import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    open: false,
    message: '',
    severity: 'info', // 'success' | 'error' | 'warning' | 'info'
  },
  reducers: {
    showAlert: (state, action) => {
        state.open = true;
        console.log(state.open);
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'info';
    },
    hideAlert: (state) => {
      state.open = false;
      state.message = '';
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
