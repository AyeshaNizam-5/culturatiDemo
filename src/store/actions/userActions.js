import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUser,
  updateUser,
  deleteUser
} from '../slices/userSlice';
import userService from '../../services/userService';

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(fetchUsersStart());
    const response = await userService.getAll();
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};

export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await userService.create(userData);
    dispatch(addUser(response.data));
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUserData = (id, userData) => async (dispatch) => {
  try {
    const response = await userService.update(id, userData);
    dispatch(updateUser(response.data));
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUserById = (id) => async (dispatch) => {
  try {
    await userService.delete(id);
    dispatch(deleteUser(id));
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}; 