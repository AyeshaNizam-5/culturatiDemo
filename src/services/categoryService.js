import api from './api';
import { ENDPOINTS } from '../config/apiConfig';

const mockCategories = [
  { id: 1, name: 'History', description: 'Cultural and historical content' },
  { id: 2, name: 'Art', description: 'All about art and creativity' }
];

const categoryService = {
  getAll: async () => {
    try {
      const response = await api.get(ENDPOINTS.CATEGORIES.GET_ALL);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
  create: async (categoryData) => {
    try {
      const newCategory = { id: mockCategories.length + 1, ...categoryData };
      mockCategories.push(newCategory);
      return Promise.resolve({ data: newCategory });
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },
  update: async (id, categoryData) => {
    try {
      const index = mockCategories.findIndex(c => c.id === id);
      if (index !== -1) {
        mockCategories[index] = { ...mockCategories[index], ...categoryData };
        return Promise.resolve({ data: mockCategories[index] });
      }
      throw new Error('Category not found');
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const index = mockCategories.findIndex(c => c.id === id);
      if (index !== -1) {
        mockCategories.splice(index, 1);
        return Promise.resolve({ success: true });
      }
      throw new Error('Category not found');
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};

export default categoryService;