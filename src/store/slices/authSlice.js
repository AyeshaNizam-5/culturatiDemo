// src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!storedToken,
  token: storedToken || null,
  role: storedUser ? JSON.parse(storedUser).role.toLowerCase() : null,
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      state.loading = false;
      state.isAuthenticated = true;
      state.token = token;
      state.role = user.role.toLowerCase();
      state.user = user;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      state.user = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
