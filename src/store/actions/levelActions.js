import {
    fetchLevelsStart,
    fetchLevelsSuccess,
    fetchLevelsFailure,
    addLevel,
    updateLevel,
    deleteLevel
  } from '../slices/levelSlice';
  import levelService from '../../services/levelService';
  
  export const fetchLevels = () => async (dispatch) => {
    try {
      dispatch(fetchLevelsStart());
      const response = await levelService.getAll();
      dispatch(fetchLevelsSuccess(response.data));
    } catch (error) {
      dispatch(fetchLevelsFailure(error.message));
    }
  };
  
  export const createLevel = (levelData) => async (dispatch) => {
    try {
      const response = await levelService.create(levelData);
      dispatch(addLevel(response.data));
      return response.data;
    } catch (error) {
      console.error('Error creating level:', error);
      throw error;
    }
  };
  
  export const updateLevelData = (id, levelData) => async (dispatch) => {
    try {
      const response = await levelService.update(id, levelData);
      dispatch(updateLevel(response.data));
      return response.data;
    } catch (error) {
      console.error('Error updating level:', error);
      throw error;
    }
  };
  
  export const deleteLevelById = (id) => async (dispatch) => {
    try {
      await levelService.delete(id);
      dispatch(deleteLevel(id));
    } catch (error) {
      console.error('Error deleting level:', error);
      throw error;
    }
  };
  