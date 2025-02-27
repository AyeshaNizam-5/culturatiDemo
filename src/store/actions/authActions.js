// src/store/actions/authActions.js
import { loginStart, loginSuccess, loginFailure, logout } from '../slices/authSlice';
import authService from '../../services/authService';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await authService.login(credentials);

    // Debugging: Check the response from authService
    console.log('Login Response:', response);

    // Normalize role to lowercase before dispatching
    const normalizedUser = {
      ...response.user,
      role: response.user.role.toLowerCase()
    };

    // Debugging: Check the normalized user
    console.log('Normalized User:', normalizedUser);

    dispatch(loginSuccess({ user: normalizedUser, token: response.token }));
  } catch (error) {
    console.error('Login Error:', error);
    dispatch(loginFailure(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await authService.logout();
    dispatch(logout());
  } catch (error) {
    console.error('Logout error:', error);
  }
};
