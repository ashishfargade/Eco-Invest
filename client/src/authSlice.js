// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem('x-auth-token', action.payload); // Save token to local storage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('x-auth-token'); // Remove token from local storage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
