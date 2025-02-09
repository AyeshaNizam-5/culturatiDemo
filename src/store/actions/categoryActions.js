import {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    addCategory,
    updateCategory,
    deleteCategory
  } from '../slices/categorySlice';
  import categoryService from '../../services/categoryService';
  
  export const fetchCategories = () => async (dispatch) => {
    try {
      dispatch(fetchCategoriesStart());
      const response = await categoryService.getAll();
      dispatch(fetchCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error.message));
    }
  };
  
  export const createCategory = (categoryData) => async (dispatch) => {
    try {
      const response = await categoryService.create(categoryData);
      dispatch(addCategory(response.data));
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  };
  
  export const updateCategoryData = (id, categoryData) => async (dispatch) => {
    try {
      const response = await categoryService.update(id, categoryData);
      dispatch(updateCategory(response.data));
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };
  
  export const deleteCategoryById = (id) => async (dispatch) => {
    try {
      await categoryService.delete(id);
      dispatch(deleteCategory(id));
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };
  