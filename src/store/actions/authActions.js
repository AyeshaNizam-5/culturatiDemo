import { loginStart, loginSuccess, loginFailure, logout } from '../slices/authSlice';
import authService from '../../services/authService';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await authService.login(credentials);
    dispatch(loginSuccess(response));
  } catch (error) {
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