import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  levels: [],
  loading: false,
  error: null,
  search: '',
  currentPage: 1
};

const levelSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    fetchLevelsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLevelsSuccess: (state, action) => {
      state.loading = false;
      state.levels = action.payload;
    },
    fetchLevelsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addLevel: (state, action) => {
      state.levels.push(action.payload);
    },
    updateLevel: (state, action) => {
      const index = state.levels.findIndex(level => level.id === action.payload.id);
      if (index !== -1) {
        state.levels[index] = action.payload;
      }
    },
    deleteLevel: (state, action) => {
      state.levels = state.levels.filter(level => level.id !== action.payload);
    }
  }
});

export const {
  fetchLevelsStart,
  fetchLevelsSuccess,
  fetchLevelsFailure,
  setSearch,
  setCurrentPage,
  addLevel,
  updateLevel,
  deleteLevel
} = levelSlice.actions;

export default levelSlice.reducer;
