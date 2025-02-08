import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  institutions: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    type: ''
  },
  currentPage: 1
};

const institutionSlice = createSlice({
  name: 'institutions',
  initialState,
  reducers: {
    fetchInstitutionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchInstitutionsSuccess: (state, action) => {
      state.loading = false;
      state.institutions = action.payload;
    },
    fetchInstitutionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset page when filters change
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addInstitution: (state, action) => {
      state.institutions.push(action.payload);
    },
    updateInstitution: (state, action) => {
      const index = state.institutions.findIndex(inst => inst.id === action.payload.id);
      if (index !== -1) {
        state.institutions[index] = action.payload;
      }
    },
    deleteInstitution: (state, action) => {
      state.institutions = state.institutions.filter(inst => inst.id !== action.payload);
    }
  }
});

export const {
  fetchInstitutionsStart,
  fetchInstitutionsSuccess,
  fetchInstitutionsFailure,
  setFilters,
  setCurrentPage,
  addInstitution,
  updateInstitution,
  deleteInstitution
} = institutionSlice.actions;

export default institutionSlice.reducer; 