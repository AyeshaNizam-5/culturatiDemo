import {
  fetchInstitutionsStart,
  fetchInstitutionsSuccess,
  fetchInstitutionsFailure,
  addInstitution,
  updateInstitution,
  deleteInstitution
} from '../slices/institutionSlice';
import institutionService from '../../services/institutionService';

export const fetchInstitutions = () => async (dispatch) => {
  try {
    dispatch(fetchInstitutionsStart());
    const response = await institutionService.getAll();
    dispatch(fetchInstitutionsSuccess(response.data));
  } catch (error) {
    dispatch(fetchInstitutionsFailure(error.message));
  }
};

export const createInstitution = (institutionData) => async (dispatch) => {
  try {
    const response = await institutionService.create(institutionData);
    dispatch(addInstitution(response.data));
    return response.data;
  } catch (error) {
    console.error('Error creating institution:', error);
    throw error;
  }
};

export const updateInstitutionData = (id, institutionData) => async (dispatch) => {
  try {
    const response = await institutionService.update(id, institutionData);
    dispatch(updateInstitution(response.data));
    return response.data;
  } catch (error) {
    console.error('Error updating institution:', error);
    throw error;
  }
};

export const deleteInstitutionById = (id) => async (dispatch) => {
  try {
    await institutionService.delete(id);
    dispatch(deleteInstitution(id));
  } catch (error) {
    console.error('Error deleting institution:', error);
    throw error;
  }
}; 