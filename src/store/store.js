import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import institutionReducer from './slices/institutionSlice';
import userReducer from './slices/userSlice';
import categorySlice from './slices/categorySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    institutions: institutionReducer,
    users: userReducer,
    categories : categorySlice,
  },
}); 